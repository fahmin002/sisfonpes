<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Program;
use App\Models\Gallery;
use App\Models\Announcement;
use App\Models\Page;
use App\Models\Setting;
use App\Models\Registration;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class FrontendController extends Controller
{
    public function home()
    {
        // recent posts (paginated partial untuk homepage)
        $posts = Post::where('is_published', true)
            ->orderByDesc('published_at')
            ->take(6)
            ->get();

        // programs (ordered)
        $programs = Program::orderBy('order')->get();

        // galleries (latest published) — create independent queries
        $galleries = Gallery::where('is_published', true)
            ->orderByDesc('created_at')
            ->take(10)
            ->get();

        // hero images (separate query)
        $heroImages = Gallery::where('is_hero', true)
            ->where('is_published', true)
            ->orderByDesc('created_at')
            ->take(10)
            ->get();

        // info links (pages flagged is_info_link)
        $infoLinks = Page::where('is_info_link', true)
            ->select('id', 'title', 'slug', 'thumbnail', 'excerpt')
            ->orderBy('title')
            ->get();

        // global settings (optional)
        $settings = Setting::first();

        return Inertia::render('frontend/home', [
            'posts' => $posts,
            'programs' => $programs,
            'galleries' => $galleries,
            'heroImages' => $heroImages,
            'infoLinks' => $infoLinks,
            'settings' => $settings,
        ]);
    }

    public function pageAbout()
    {
        // Ambil Page dengan slug 'tentang' (atau fallback 404)
        $page = Page::where('slug', 'tentang')->where('is_published', true)->firstOrFail();

        return Inertia::render('frontend/about/index', [
            'page' => $page,
        ]);
    }

    public function programsIndex(Request $request)
    {
        $programs = Program::orderBy('order')->paginate(12);

        return Inertia::render('frontend/programs/index', [
            'programs' => $programs,
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
        $posts = Post::where('is_published', true)
            ->orderByDesc('published_at')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('frontend/posts/ndex', [
            'posts' => $posts,
            'filters' => $request->only('page'),
        ]);
    }

    public function postShow($slug)
    {
        $post = Post::where('slug', $slug)->where('is_published', true)->firstOrFail();

        return Inertia::render('frontend/posts/show', [
            'post' => $post,
        ]);
    }

    public function galleryIndex(Request $request)
    {
        $galleries = Gallery::where('is_published', true)
            ->orderByDesc('created_at')
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('frontend/galleries/index', [
            'galleries' => $galleries,
        ]);
    }

    public function registrationForm()
    {
        $settings = Setting::first();

        return Inertia::render('frontend/registration/form', [
            'settings' => $settings,
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
            'code' => $registration->registration_code
        ]);
    }

    public function registrationSuccess($code)
    {
        return Inertia::render('frontend/registration/registrationSuccess', [
            'code' => $code,
        ]);
    }

    public function checkRegistrationForm()
    {
        return Inertia::render('frontend/registration/checkRegistrationForm');
    }

    public function checkRegistrationResult($code)
    {
        $registration = Registration::where('registration_code', $code)->first();

        return Inertia::render('frontend/registration/checkRegistrationResult', [
            'registration' => $registration,
            'code' => $code
        ]);
    }



    public function pageContact()
    {
        // kontak biasanya disimpan di Settings, kalau ada page 'kontak' bisa pakai Page
        $page = Page::where('slug', 'kontak')->where('is_published', true)->first();

        $settings = Setting::first();

        return Inertia::render('frontend/pages/Contact', [
            'page' => $page,
            'settings' => $settings,
        ]);
    }

    public function announcementsIndex(Request $request)
    {
        $announcements = Announcement::where('is_active', true)
            ->where(function ($q) {
                $q->whereNull('start_date')->orWhere('start_date', '<=', now());
            })
            ->where(function ($q) {
                $q->whereNull('end_date')->orWhere('end_date', '>=', now());
            })
            ->orderByDesc('start_date')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('frontend/announcements/Index', [
            'announcements' => $announcements,
        ]);
    }

    public function announcementShow($slug)
    {
        $announcement = Announcement::where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        return Inertia::render('frontend/announcements/Show', [
            'announcement' => $announcement,
        ]);
    }
}
