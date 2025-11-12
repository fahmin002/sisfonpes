<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{
    public function index(Request $request)
    {
        $query = Gallery::query();

        if ($search = $request->get('search')) {
            $query->where('title', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%");
        }
        
        $galleries = $query->orderByDesc('created_at')->paginate(10)->withQueryString();

        return Inertia::render('admin/galleries/index', [
            'galleries' => $galleries,
            'filters' => $request->only('search')
            
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/galleries/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|max:255',
            'description' => 'nullable|string',
            'image' => 'required|image|max:2048',
            'is_published' => 'boolean',
            'is_hero' => 'boolean'
        ]);

        // Upload file gambar
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('galleries', 'public');
        }

        // Isi published_at otomatis kalau is_published = true
        $validated['published_at'] = !empty($validated['is_published'])
            ? now()
            : null;

        Gallery::create($validated);
        $message = 'Foto ' . $validated['title'] . ' berhasil ditambahkan.';
        return redirect()
            ->route('admin.galleries.index')
            ->with([
                'message' => $message,
                'type' => 'success',
            ]);
    }



    public function edit(Gallery $gallery)
    {
        return Inertia::render('admin/galleries/edit', [
            'gallery' => $gallery,
        ]);
    }

    public function update(Request $request, \App\Models\Gallery $gallery)
    {
        $validated = $request->validate([
            'title' => 'required|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'is_published' => 'boolean',
            'is_hero' => 'boolean'
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            if ($gallery->image) {
                Storage::disk('public')->delete($gallery->image);
            }
            $validated['image'] = $request->file('image')->store('galleries', 'public');
        } else {
            // pertahankan gambar lama kalau tidak upload baru
            $validated['image'] = $gallery->image;
        }

        // Handle publish status
        if (!empty($validated['is_published']) && !$gallery->is_published) {
            $validated['published_at'] = now();
        } elseif (empty($validated['is_published'])) {
            $validated['published_at'] = null;
        }

        $gallery->update($validated);
        $message = 'Foto ' . $gallery->title . ' berhasil diperbarui.';
        $type = 'info';
        return redirect()
            ->route('admin.galleries.index')
            ->with([
                'message' => $message,
                'type' => $type
            ]);
    }



    public function destroy(Gallery $gallery)
    {
        if ($gallery->image) Storage::disk('public')->delete($gallery->image);
        $gallery->delete();
        $message = 'Foto ' . $gallery->title . ' berhasil dihapus.';
        $type = 'delete';
        return redirect()->route('admin.galleries.index')
            ->with([
                'message' => $message,
                'type' => $type
            ]);
    }

    public function publish(Gallery $gallery)
    {
        $gallery->update([
            'is_published' => true,
            'published_at' => now(),
        ]);

        return back()->with([
            'message' => 'Foto ' . $gallery->title . ' berhasil dipublish',
            'type' => 'success'
        ]);
    }

    public function unpublish(Gallery $gallery)
    {
        $gallery->update([
            'is_published' => false,
            'published_at' => null,
        ]);
        $message = 'Foto ' . $gallery->title . ' berhasil diunpublish';
        $type = 'warning';
        return back()->with([
            'message' => $message,
            'type' => $type
        ]);
    }
}
