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

        return redirect()->route('admin.menus.index')->with('success', 'Menu ' . $validated['name'] . ' berhasil ditambahkan.');
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
            'is_active' => 'boolean',
        ]);

        $menu->update($validated);
        $message = ($validated['is_active'] == false ? 'Menu ' . $validated['name'] . ' berhasil dinonaktifkan.' : 'Menu ' . $validated['name'] . ' berhasil diaktifkan.');
        return redirect()->route('admin.menus.index')->with('success', $message);
    }

    public function destroy(Menu $menu)
    {
        $menu->delete();
        return redirect()->route('admin.menus.index')->with('success', 'Menu ' . $menu->name . ' berhasil dihapus.');
    }
}
