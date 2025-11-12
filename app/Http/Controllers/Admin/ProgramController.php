<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProgramController extends Controller
{
    /**
     * Tampilkan semua program.
     */
    public function index(Request $request)
    {
        $query = Program::query();

        if($search = $request->get('search')) {
            $query->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
        }

        $programs = $query->orderBy('order')->paginate(10)->withQueryString();

        return Inertia::render('admin/programs/index', [
            'programs' => $programs,
            'filters' => $request->only('search')
        ]);
    }

    /**
     * Form tambah program.
     */
    public function create()
    {
        return Inertia::render('admin/programs/create');
    }

    /**
     * Simpan program baru.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'order' => 'required|integer|min:0',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('programs', 'public');
        }

        Program::create($validated);

        return redirect()
            ->route('admin.programs.index')
            ->with([
                'message' => 'Program berhasil ditambahkan ✅',
                'type' => 'success',
            ]);
    }

    /**
     * Form edit program.
     */
    public function edit(Program $program)
    {
        return Inertia::render('admin/programs/edit', [
            'program' => $program,
        ]);
    }

    /**
     * Update program.
     */
    public function update(Request $request, Program $program)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'order' => 'sometimes|integer|min:0',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            // Hapus gambar lama
            if ($program->image && Storage::disk('public')->exists($program->image)) {
                Storage::disk('public')->delete($program->image);
            }

            // Simpan gambar baru
            $validated['image'] = $request->file('image')->store('programs', 'public');
        } else {
            $validated['image'] = $program->image;
        }

        $program->update($validated);

        return redirect()
            ->route('admin.programs.index')
            ->with([
                'message' => 'Program berhasil diperbarui ✨',
                'type' => 'success',
            ]);
    }

    /**
     * Hapus program.
     */
    public function destroy(Program $program)
    {
        if ($program->image && Storage::disk('public')->exists($program->image)) {
            Storage::disk('public')->delete($program->image);
        }

        $program->delete();

        return redirect()
            ->route('admin.programs.index')
            ->with([
                'message' => 'Program berhasil dihapus 🗑️',
                'type' => 'warning',
            ]);
    }
}
