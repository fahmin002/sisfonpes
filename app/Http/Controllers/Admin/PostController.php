<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::query()
            ->when(request('status') === 'published', fn($q) => $q->where('is_published', true))
            ->when(request('status') === 'draft', fn($q) => $q->where('is_published', false))
            ->orderByDesc('created_at')
            ->get();
        return Inertia::render('admin/posts/index', [
            'posts' => $posts,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/posts/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|max:255',
            'content' => 'required',
            'thumbnail' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('thumbnail')) {
            $validated['thumbnail'] = $request->file('thumbnail')->store('thumbnails', 'public');
        }

        // Otomatis isi published_at kalau belum ada
        $validated['published_at'] = now();
        $validated['is_published'] = true;

        Post::create($validated);

        $message = 'Berita ' . $validated['title'] . ' berhasil ditambahkan.';
        return redirect()->route('admin.posts.index')->with([
            'message' => $message,
            'type' => 'success',
        ]);
    }

    public function edit(Post $post)
    {
        return Inertia::render('admin/posts/edit', [
            'post' => $post,
        ]);
    }

    public function update(Request $request, Post $post)
    {
        $validated = $request->validate([
            'title' => 'required|max:255',
            'content' => 'required',
            'thumbnail' => 'nullable|image|max:2048',
        ]);

        // Handle upload thumbnail baru
        if ($request->hasFile('thumbnail')) {
            // hapus file lama jika ada
            if ($post->thumbnail) {
                Storage::disk('public')->delete($post->thumbnail);
            }

            // simpan file baru
            $validated['thumbnail'] = $request->file('thumbnail')->store('thumbnails', 'public');
        } else {
            // pertahankan thumbnail lama kalau tidak upload baru
            $validated['thumbnail'] = $post->thumbnail;
        }

        // Jika belum pernah dipublish, isi sekarang
        if (!$post->published_at && ($post->is_published ?? false)) {
            $validated['published_at'] = now();
        }

        $post->update($validated);
        $message = 'Berita ' . $validated['title'] . ' berhasil diperbarui.';
        return redirect()
            ->route('admin.posts.index')
            ->with([
                'message' => $message,
                'type' => 'info',
            ]);
    }


    public function unpublish(Post $post)
    {
        $post->update([
            'is_published' => false,
            'published_at' => null,
        ]);
        $message = 'Berita ' . $post->title . ' berhasil di-unpublish.';
        return redirect()->back()->with([
            'message' => $message,
            'type' => 'warning',
        ]);
    }

    public function publish(Post $post)
    {
        $post->update([
            'is_published' => true,
            'published_at' => now(),
        ]);
        $message = 'Berita ' . $post->title . ' berhasil dipublish.';
        return redirect()->back()->with([
            'message' => $message,
            'type' => 'info',
        ]);
    }

    public function destroy(Post $post)
    {
        $title = $post->title;
        if ($post->thumbnail) {
            Storage::disk('public')->delete($post->thumbnail);
        }

        $post->delete();
        $message = 'Berita ' . $title . ' berhasil dihapus.';
        return redirect()->route('admin.posts.index')->with([
            'message' => $message,
            'type' => 'delete',
        ]);
    }
}
