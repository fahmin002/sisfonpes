<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenuController extends Controller
{
    public function index(Request $request)
    {
        $query = Menu::query()->with('parent');

        if ($search = $request->get('search')) {
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('slug', 'like', "%{$search}%");
        }

        $menus = $query->orderBy('order')->paginate(10)->withQueryString();

        return inertia('admin/menus/index', [
            'menus' => $menus,
            'filters' => $request->only('search'),
        ]);
    }

    public function create()
    {
        $parents = Menu::where(function ($query) {
            $query->whereNull('parent_id') // ambil level 0 (induk)
                ->orWhereHas('parent', function ($q) {
                    $q->whereNull('parent_id'); // ambil level 1 (anak dari induk)
                });
        })
            ->get(['id', 'name', 'slug', 'parent_id']);

        return Inertia::render('admin/menus/create', ['parents' => $parents]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:menus,slug',
            'url' => 'required|string',
            'order' => 'nullable|integer',
            'parent_id' => 'nullable|exists:menus,id',
            'is_active' => 'boolean',
        ]);

        Menu::create($validated);
        $message = 'Menu ' . $validated['name'] . ' berhasil ditambahkan.';
        $type = 'success';
        return redirect()->route('admin.menus.index')->with([
            'message' => $message,
            'type' => $type,
        ]);
    }

    public function edit(Menu $menu)
    {
        $parents = Menu::where(function ($query) use ($menu) {
            $query->whereNull('parent_id') // level 0
                ->orWhereHas('parent', function ($q) {
                    $q->whereNull('parent_id'); // level 1 (anak dari level 0)
                });
        })
            ->where('id', '!=', $menu->id) // kecuali dirinya sendiri
            ->orWhere('id', $menu->parent_id) // biar parent yang sudah dipilih tetap muncul
            ->get();

        return Inertia::render('admin/menus/edit', [
            'menu' => $menu,
            'parents' => $parents,
        ]);
    }

    public function update(Request $request, Menu $menu)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:menus,slug,' . $menu->id,
            'url' => 'required|string',
            'order' => 'nullable|integer',
            'parent_id' => 'nullable|exists:menus,id',
            'page_id' => 'nullable|exists:pages,id',
            'is_active' => 'boolean',
        ]);

        $menu->update($validated);

        // ✅ Sinkronisasi status page yang terhubung
        if ($menu->page) {
            $menu->page->update([
                'slug' => $validated['slug'],
                'title' => $validated['name'],
                'published_at' => $validated['is_active'] ? now() : null,
                'is_published' => $validated['is_active'],
            ]);
        }

        $message = $validated['is_active']
            ? 'Menu ' . $validated['name'] . ' berhasil diaktifkan.'
            : 'Menu ' . $validated['name'] . ' berhasil dinonaktifkan.';

        return redirect()->route('admin.menus.index')->with([
            'message' => $message,
            'type' => 'info',
        ]);
    }


    public function destroy(Menu $menu)
    {
        if ($menu->page) {
            $menu->page->delete();
        }
        // Hapus semua child menu (jika nested)
        if ($menu->children()->exists()) {
            foreach ($menu->children as $child) {
                $child->delete();
            }
        }
        $message = 'Menu ' . $menu->name . ' berhasil dihapus.';
        $menu->delete();
        $type = 'delete';
        return redirect()->route('admin.menus.index')->with([
            'message' => $message,
            'type' => $type,
        ]);
    }
}
