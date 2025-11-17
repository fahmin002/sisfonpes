<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Program;
use App\Models\Gallery;
use App\Models\Announcement;
use App\Models\Message;
use App\Models\Page;
use App\Models\Setting;
use App\Models\Registration;
use Inertia\Inertia;
use Illuminate\Http\Request;

class FrontendController extends Controller
{
    public function home()
    {

        $posts = Post::where('is_published', true)
            ->orderByDesc('published_at')
            ->take(5)
            ->get();

        $programs = Program::orderBy('order')->take(3)->get();

        $galleries = Gallery::where('is_published', true)
            ->orderByDesc('created_at')
            ->take(4)
            ->get();

        $heroImages = Gallery::where('is_hero', true)
            ->where('is_published', true)
            ->orderByDesc('created_at')
            ->take(10)
            ->get();

        $infoLinks = Page::where('is_info_link', true)
            ->select('id', 'title', 'slug', 'thumbnail', 'excerpt')
            ->orderBy('title')
            ->get();

        return Inertia::render('frontend/home', [
            'posts' => $posts,
            'programs' => $programs,
            'galleries' => $galleries,
            'heroImages' => $heroImages,
            'infoLinks' => $infoLinks,
            'meta' => [
                'title' => $settings['site_name'] ?? 'Beranda',
                'description' => $settings['site_tagline'] ?? 'Selamat datang di website resmi pesantren.',
            ],
        ]);
    }

    public function pageAbout()
    {
        $page = Page::where('slug', 'tentang')
            ->where('is_published', true)
            ->firstOrFail();

        return Inertia::render('frontend/about/index', [
            'page' => $page,
            'meta' => [
                'title' => $page->title,
                'description' => $page->excerpt ?? 'Profil dan informasi tentang pesantren.',
            ],
        ]);
    }

    public function programsIndex(Request $request)
    {
        $query = Program::query();

        if ($search = $request->get('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('short_description', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $programs = $query
            ->orderBy('order')
            ->paginate(9)
            ->withQueryString();

        return Inertia::render('frontend/programs/index', [
            'programs' => $programs,
            'filters' => $request->only('search'),
            'meta' => [
                'title' => 'Program Pendidikan',
                'description' => 'Daftar program pendidikan di pesantren.',
            ],
        ]);
    }

    public function programShow($slug)
    {
        $program = Program::where('slug', $slug)->where('is_active', true)->firstOrFail();

        return Inertia::render('frontend/programs/show', [
            'program' => $program,
        ]);
    }

    public function postsIndex(Request $request)
    {
        // $posts = Post::where('is_published', true)
        //     ->orderByDesc('published_at')
        //     ->paginate(10)
        //     ->withQueryString();
        $query = Post::query();

        if ($search = $request->get('search')) {
            $query->where('title', 'like', "%{$search}%")
                ->orWhere('content', 'like', "%{$search}%");
        }

        $query->when(request('status') === 'published', fn($q) => $q->where('is_published', true))
            ->when(request('status') === 'draft', fn($q) => $q->where('is_published', false));

        $posts = $query->orderByDesc('created_at')
            ->paginate(9)->withQueryString();

        return Inertia::render('frontend/posts/index', [
            'posts' => $posts,
            'filters' => $request->only('page', 'search', 'status'),
            'meta' => [
                'title' => 'Berita & Kegiatan',
                'description' => 'Informasi terbaru dari Pondok Pesantren.',
            ],
        ]);
    }

    public function postShow($id)
    {
        $post = Post::where('id', $id)
            ->where('is_published', true)
            ->firstOrFail();

        return Inertia::render('frontend/posts/show', [
            'post' => $post,
            'meta' => [
                'title' => $post->title,
                'description' => $post->excerpt
                    ?? strip_tags(substr($post->content, 0, 150)),
            ],
        ]);
    }

    public function galleryIndex(Request $request)
    {
        $galleries = Gallery::where('is_published', true)
            ->orderByDesc('created_at')
            ->paginate(9)
            ->withQueryString();

        return Inertia::render('frontend/galleries/index', [
            'galleries' => $galleries,
            'meta' => [
                'title' => 'Galeri',
                'description' => 'Dokumentasi kegiatan pesantren.',
            ],
        ]);
    }

    public function registrationForm()
    {
        $settings = Setting::first();

        return Inertia::render('frontend/registration/form', [
            'settings' => $settings,
            'meta' => [
                'title' => 'Formulir Pendaftaran',
                'description' => 'Pendaftaran santri baru tahun ajaran terbaru.',
            ],
        ]);
    }

    public function registrationSubmit(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'gender' => 'required|in:male,female',
            'birth_place' => 'required|string|max:255',
            'birth_date' => 'required|date',
            'address' => 'required|string',
            'previous_school' => 'nullable|string|max:255',
            'parent_name' => 'required|string|max:255',
            'parent_contact' => 'required|string|max:20',
        ]);

        $registration = Registration::create($validated);

        return redirect()->route('registration.success', [
            'code' => $registration->registration_code,
        ]);
    }

    public function registrationSuccess($code)
    {
        return Inertia::render('frontend/registration/registrationSuccess', [
            'code' => $code,
            'meta' => [
                'title' => 'Pendaftaran Berhasil',
                'description' => "Kode pendaftaran: $code",
            ],
        ]);
    }

    public function checkRegistrationForm()
    {
        return Inertia::render('frontend/registration/checkRegistrationForm', [
            'meta' => [
                'title' => 'Cek Pendaftaran',
                'description' => 'Cek status pendaftaran santri baru.',
            ],
        ]);
    }

    public function checkRegistrationResult($code)
    {
        $registration = Registration::where('registration_code', $code)->first();

        return Inertia::render('frontend/registration/checkRegistrationResult', [
            'registration' => $registration,
            'code' => $code,
            'meta' => [
                'title' => 'Hasil Pencarian Pendaftaran',
                'description' => "Hasil pencarian untuk kode: $code",
            ],
        ]);
    }

    public function pageContact()
    {
        $page = Page::where('slug', 'kontak')
            ->where('is_published', true)
            ->first();

        $settings = Setting::first();

        return Inertia::render('frontend/pages/contact', [
            'page' => $page,
            'settings' => $settings,
            'meta' => [
                'title' => 'Kontak',
                'description' => 'Hubungi kami untuk informasi lebih lanjut.',
            ],
        ]);
    }

    public function announcementsIndex(Request $request)
    {

        $query = Announcement::query();

        if ($search = $request->get('search')) {
            $query->where('title', 'like', "%{$search}%")
                ->orWhere('content', 'like', "%{$search}%");
        }

        $announcements = $query->where('is_active', true)
            ->when(true, function ($q) {
                $now = now();
                $q->where(function ($q) use ($now) {
                    $q->whereNull('start_date')->orWhere('start_date', '<=', $now);
                })->where(function ($q) use ($now) {
                    $q->whereNull('end_date')->orWhere('end_date', '>=', $now);
                });
            })
            ->orderByDesc('start_date')
            ->paginate(10)
            ->withQueryString();


        return Inertia::render('frontend/announcements/index', [
            'announcements' => $announcements,
            'meta' => [
                'title' => 'Pengumuman',
                'description' => 'Pengumuman resmi dari pesantren.',
            ],
        ]);
    }

    public function announcementShow($id)
    {
        $announcement = Announcement::where('id', $id)
            ->where('is_active', true)
            ->firstOrFail();

        return Inertia::render('frontend/announcements/show', [
            'announcement' => $announcement,
            'meta' => [
                'title' => $announcement->title,
                'description' => $announcement->excerpt
                    ?? strip_tags(substr($announcement->content, 0, 150)),
            ],
        ]);
    }

    public function sendMessage(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'nullable|max:255',
            'message' => 'required',
        ]);

        Message::create($validated);

        return back()->with('success', 'Pesan berhasil dikirim!');
    }

    public function infoLinks()
    {
        $info = Page::where('is_info_link', true)
            ->where('is_published', true)
            ->orderByDesc('published_at')
            ->get();

        return inertia('frontend/pages/infolinks', [
            'infoLinks' => $info,
            'meta' => [
                'title' => 'Informasi Penting'
            ]
        ]);
    }

    public function showInfo($slug)
    {
        $info = Page::where('slug', $slug)
            ->where('is_published', true)
            ->where('is_info_link', true)
            ->firstOrFail();

        return inertia('frontend/pages/infolinkdetail', [
            'info' => $info
        ]);
    }
}
