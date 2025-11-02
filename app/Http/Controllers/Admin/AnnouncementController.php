<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnnouncementController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/announcements/index', [
            'announcements' => Announcement::orderByDesc('created_at')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/announcements/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'is_active' => 'boolean',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        Announcement::create($validated);

        return redirect()->route('admin.announcements.index')->with([
            'message' => 'Pengumuman berhasil ditambahkan.',
            'type' => 'success',
        ]);
    }

    public function toggle(Announcement $announcement)
    {
        $announcement->update([
            'is_active' => !$announcement->is_active,
        ]);

        return back()->with([
            'message' => 'Status pengumuman "' . $announcement->title . '" diperbarui.',
            'type' => $announcement->is_active ? 'info' : 'warning',
        ]);
    }


    public function edit(Announcement $announcement)
    {
        return Inertia::render('admin/announcements/edit', [
            'announcement' => $announcement,
        ]);
    }

    public function update(Request $request, Announcement $announcement)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'is_active' => 'boolean',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        $announcement->update($validated);

        return redirect()->route('admin.announcements.index')->with([
            'message' => 'Pengumuman berhasil diperbarui.',
            'type' => 'info',
        ]);
    }

    public function destroy(Announcement $announcement)
    {
        $announcement->delete();

        return redirect()->route('admin.announcements.index')->with([
            'message' => 'Pengumuman dihapus.',
            'type' => 'delete',
        ]);
    }
}
