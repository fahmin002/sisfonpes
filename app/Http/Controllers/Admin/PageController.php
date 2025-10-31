<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function index()
    {
        $pages = Page::query()
            ->when(request('status') === 'published', fn($q) => $q->where('is_published', true))
            ->when(request('status') === 'draft', fn($q) => $q->where('is_published', false))
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('admin/pages/index', [
            'pages' => $pages,
        ]);
    }

    public function create()
    {
        $parents = \App\Models\Menu::whereNull('parent_id')->get(['id', 'name']);
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
        ]);
        $menuMessage = null;
        // Otomatis publish halaman baru
        $validated['is_published'] = true;
        $validated['published_at'] = now();

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
        $parents = \App\Models\Menu::whereNull('parent_id')->get();

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
            'title' => 'required|max:255',
            'slug' => 'required|max:255|unique:pages,slug,' . $page->id,
            'content' => 'required',
            'add_to_menu' => 'boolean',
            'menu_parent_id' => 'nullable|exists:menus,id',
        ]);
        $menuMessage = null;

        // 🔹 Update halaman utama dulu
        $page->update([
            'title' => $validated['title'],
            'slug' => $validated['slug'],
            'content' => $validated['content'],
            'published_at' => $page->is_published ? ($page->published_at ?? now()) : null,
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
        $title = $page->title;
        $page->delete();

        $message = 'Halaman "' . $title . '" berhasil dihapus.';
        return redirect()->route('admin.pages.index')->with([
            'message' => $message,
            'type' => 'delete',
        ]);
    }
}
