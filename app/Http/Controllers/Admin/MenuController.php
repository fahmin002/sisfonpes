<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenuController extends Controller
{
    public function index()
    {
        $menus = Menu::with('parent')->orderBy('order')->get();
        return Inertia::render('admin/menus/index', [
            'menus' => $menus,
        ]);
    }

    public function create()
    {
        $parents = Menu::whereNull('parent_id')->get();
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
        $parents = Menu::whereNull('parent_id')->where('id', '!=', $menu->id)->get();
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
