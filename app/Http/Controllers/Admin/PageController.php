<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PageController extends Controller
{
    public function index(Request $request)
    {
        // 1. Mulai query dasar
        $query = Page::query();

        // 2. Tambahkan logika pencarian jika parameter 'search' ada
        if ($search = $request->get('search')) {
            $query->where('title', 'like', "%{$search}%")
                  ->orWhere('slug', 'like', "%{$search}%");
        }

        // 3. Tambahkan logika filter status (sudah ada)
        $query->when($request->get('status') === 'published', fn($q) => $q->where('is_published', true))
              ->when($request->get('status') === 'draft', fn($q) => $q->where('is_published', false));

        // 4. Ambil data (gunakan paginate() jika ingin pagination)
        // Saya asumsikan Anda ingin tetap menggunakan get() seperti sebelumnya, 
        // tapi paginate() lebih umum untuk halaman daftar yang bisa dicari.
        $pages = $query->orderByDesc('created_at')->paginate(10)->withQueryString(); 
        
        // Jika Anda ingin pagination, ganti ->get() dengan:
        // $pages = $query->orderByDesc('created_at')->paginate(10)->withQueryString();

        // 5. Logika lazy load menu (sudah ada)
        $menus = Menu::whereNotNull('page_id')->get();
        $pages->each(function ($page) use ($menus) {
            $page->menu = $menus->firstWhere('page_id', $page->id);
        });

        // 6. Kembalikan respons Inertia
        return Inertia::render('admin/pages/index', [
            'pages' => $pages,
            // PENTING: Kirim kembali filter yang diterima ke frontend React
            'filters' => $request->only('search', 'status'), 
        ]);
    }

    public function create()
    {
        $parents = \App\Models\Menu::whereNull('parent_id')
            ->whereNull('page_id')
            ->where('is_active', true)
            ->get(['id', 'name', 'slug']);
        return Inertia::render('admin/pages/create', ['parents' => $parents]);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|max:255',
            'slug' => 'required|unique:pages,slug',
            'content' => 'required',
            'add_to_menu' => 'boolean',
            'menu_parent_id' => 'nullable|exists:menus,id',
            'is_info_link' => 'boolean',
            'excerpt' => 'nullable|string',
            'thumbnail' => 'nullable|image|max:2048',
        ]);
        $menuMessage = null;
        // Otomatis publish halaman baru
        $validated['is_published'] = true;
        $validated['published_at'] = now();

        // simpan thumbnail ke file storage jika ada
        if ($request->hasFile('thumbnail')) {
            $validated['thumbnail'] = $request->file('thumbnail')->store('page_thumbnails', 'public');
        }

        $page = Page::create($validated);


        if ($request->add_to_menu) {
            $menu = Menu::where('slug', $validated['slug'])->first();
            if ($menu) {
                $menu->update([
                    'page_id' => $page->id,
                    'parent_id' => $request->menu_parent_id,
                    'is_active' => true
                ]);
                $menuMessage = "Menu diperbarui: " . $validated['title'];
            } else {
                Menu::create([
                    'name' => $validated['title'],
                    'slug' => $validated['slug'], // ← penting!
                    'url' => '/' . ltrim($validated['slug'], '/'),
                    'order' => 1,
                    'parent_id' => $request->menu_parent_id,
                    'is_active' => true,
                    'page_id' => $page->id, // opsional, jika kamu relasikan
                ]);
                $menuMessage = "Menu telah dibuat: " . $validated['title'];
            }
        }

        if ($menuMessage !== null) {
            return redirect()
                ->route('admin.pages.index')
                ->with([
                    'flash_messages' =>
                    [
                        [
                            'message' => "Halaman {$page->title} berhasil dibuat.",
                            'type' => 'success',
                        ],
                        [
                            'message' => $menuMessage,
                            'type' => 'warning'
                        ]
                    ]
                ]);
        } else {
            return redirect()
                ->route('admin.pages.index')
                ->with([
                    'message' => "Halaman {$page->title} berhasil dibuat.",
                    'type' => 'success',
                ]);
        }
    }


    public function edit(Page $page)
    {
        // Ambil daftar menu parent (hanya menu utama)
        $parents = \App\Models\Menu::whereNull('parent_id')
            ->where('id', '!=', $page->menu?->id) // kecuali dirinya sendiri
            ->where('is_active', true)
            ->orWhere('id', $page->menu?->parent_id) // biar parent yang udah kepilih tetep muncul
            ->whereNull('page_id')
            ->get();

        // Pastikan relasi menu dan parent diload (lazy load)
        $page->load(['menu.parent']);

        return Inertia::render('admin/pages/edit', [
            'page' => $page,
            'parents' => $parents,
            // Biarkan frontend yang menentukan default-nya
            'menu_parent_id' => $page->menu?->parent_id,
            'is_in_menu' => (bool) $page->menu, // untuk toggle "Tambah ke menu navigasi"
        ]);
    }


    public function update(Request $request, Page $page)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|max:255',
            'slug' => 'sometimes|required|max:255|unique:pages,slug,' . $page->id,
            'content' => 'sometimes|required',
            'add_to_menu' => 'boolean',
            'menu_parent_id' => 'nullable|exists:menus,id',
            'thumbnail' => 'nullable|image|max:2048',
            'excerpt' => 'nullable|string|max:255',
            'is_info_link' => 'boolean',
        ]);

        $menuMessage = null;
        // Handle upload thumbnail baru
        if ($request->hasFile('thumbnail')) {
            // hapus file lama jika ada
            if ($page->thumbnail) {
                Storage::disk('public')->delete($page->thumbnail);
            }

            // simpan file baru
            $validated['thumbnail'] = $request->file('thumbnail')->store('page_thumbnails', 'public');
        } else {
            // jika tidak ada file baru diupload, jangan ubah field thumbnail
            $validated['thumbnail'] = $page->thumbnail;
        }
        // 🔹 Update halaman utama dulu
        $page->update([
            'title' => $validated['title'] ?? $page->title,
            'slug' => $validated['slug'] ?? $page->slug,
            'content' => $validated['content'] ?? $page->content,
            'published_at' => $page->is_published ? ($page->published_at ?? now()) : null,
            'thumbnail' => $validated['thumbnail'],
            'excerpt' => $validated['excerpt'],
            'is_info_link' => filter_var($request->input('is_info_link', false), FILTER_VALIDATE_BOOLEAN),
        ]);

        // 🔹 Jika user ingin menautkan ke menu navigasi
        if ($request->add_to_menu) {
            // Jika sudah punya menu, update menu-nya
            if ($page->menu) {
                $page->menu->update([
                    'name' => $validated['title'], // 🔁 gunakan 'name', bukan 'title'
                    'slug' => $validated['slug'],
                    'parent_id' => $validated['menu_parent_id'] ?: null,
                    'url' => '/' . ltrim($validated['slug'], '/'),
                    'is_active' => $page->is_published,
                ]);
                $menuMessage = "Menu diperbarui: " . $validated['title'];
            }
            // Jika belum punya menu, buat baru
            else {
                $menu = Menu::where('slug', $validated['slug'])->first();
                if ($menu) {
                    $menu->update([
                        'page_id' => $page->id,
                        'parent_id' => $request->menu_parent_id,
                        'is_active' => true
                    ]);
                    $menuMessage = "Menu dihubungkan dengan halaman: " . $validated['title'];
                } else {
                    \App\Models\Menu::create([
                        'name' => $validated['title'],
                        'slug' => $validated['slug'],
                        'url' => '/' . ltrim($validated['slug'], '/'),
                        'order' => 1,
                        'parent_id' => $validated['menu_parent_id'] ?: null,
                        'is_active' => true,
                        'page_id' => $page->id,
                    ]);
                    $menuMessage = "Menu dibuat dengan judul: " . $validated['title'];
                }
            }
        }
        // 🔹 Jika user tidak ingin menambahkan ke menu
        else {
            // Jika sudah punya menu, tetap sinkronkan nama dan slug, tapi jangan hapus
            if ($page->menu) {
                $page->menu->update([
                    'name' => $validated['title'],
                    'slug' => $validated['slug'],
                    'url' => '/' . ltrim($validated['slug'], '/'),
                    'parent_id' => $validated['menu_parent_id'] ?: null,
                ]);
                $menuMessage = "Menu diperbarui: " . $validated['title'];
            }
        }

        if ($menuMessage !== null) {
            return redirect()
                ->route('admin.pages.index')
                ->with([
                    'flash_messages' =>
                    [
                        [
                            'message' => 'Halaman "' . $validated['title'] . '" berhasil diperbarui.',
                            'type' => 'info',
                        ],
                        [
                            'message' => $menuMessage,
                            'type' => 'warning'
                        ]
                    ]
                ]);
        } else {
            return redirect()
                ->route('admin.pages.index')
                ->with([
                    'message' => 'Halaman "' . $validated['title'] . '" berhasil diperbarui.',
                    'type' => 'info',
                ]);
        }
    }



    public function unpublish(Page $page)
    {
        $page->update([
            'is_published' => false,
            'published_at' => null,
        ]);
        Menu::where('page_id', $page->id)->update(['is_active' => false]);
        $message = 'Halaman "' . $page->title . '" berhasil di-unpublish.';
        return redirect()->back()->with([
            'message' => $message,
            'type' => 'warning',
        ]);
    }

    public function publish(Page $page)
    {
        $page->update([
            'is_published' => true,
            'published_at' => now(),
        ]);
        // update is_active in Menu
        Menu::where('page_id', $page->id)->update(['is_active' => true]);
        $message = 'Halaman "' . $page->title . '" berhasil dipublish.';
        return redirect()->back()->with([
            'message' => $message,
            'type' => 'info',
        ]);
    }

    public function destroy(Page $page)
    {
        if ($page->thumbnail) Storage::disk('public')->delete($page->thumbnail);

        $title = $page->title;
        $page->delete();

        $message = 'Halaman "' . $title . '" berhasil dihapus.';
        return redirect()->route('admin.pages.index')->with([
            'message' => $message,
            'type' => 'delete',
        ]);
    }
}
