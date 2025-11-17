<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProgramController extends Controller
{
    public function index(Request $request)
    {
        $query = Program::query();

        if ($search = $request->get('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('short_description', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $programs = $query
            ->orderBy('order')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/programs/index', [
            'programs' => $programs,
            'filters' => $request->only('search'),
        ]);
    }


    public function create()
    {
        return Inertia::render('admin/programs/create');
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'short_description' => 'nullable|string|max:255',
            'description' => 'required|string',
            'slug' => 'required|unique:programs,slug',
            'order' => 'nullable|integer|min:0',
            'image' => 'nullable|image|max:2048',
            'icon' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        $validated['description'] = $request->description;
        // dd($validated['description']);

        $validated['slug'] = Str::slug($validated['title']);
        $validated['is_active'] = $request->boolean('is_active', true);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('programs', 'public');
        }

        Program::create($validated);

        return redirect()
            ->route('admin.programs.index')
            ->with(['message' => 'Program berhasil ditambahkan ✅', 'type' => 'success']);
    }


    public function edit(Program $program)
    {
        return Inertia::render('admin/programs/edit', [
            'program' => $program,
        ]);
    }


    public function update(Request $request, Program $program)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'short_description' => 'nullable|string|max:255',
            'description' => 'sometimes|required|string',
            'slug' => 'sometimes|required|unique:programs,slug,' . $program->id,
            'order' => 'nullable|integer|min:0',
            'image' => 'nullable|image|max:2048',
            'icon' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        if ($request->filled('title')) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        // handle image update
        if ($request->hasFile('image')) {
            if ($program->image && Storage::disk('public')->exists($program->image)) {
                Storage::disk('public')->delete($program->image);
            }

            $validated['image'] = $request->file('image')->store('programs', 'public');
        }

        $program->update($validated);

        return redirect()
            ->route('admin.programs.index')
            ->with(['message' => 'Program berhasil diperbarui ✨', 'type' => 'success']);
    }


    public function toggle(Program $program)
    {
        $program->update(['is_active' => !$program->is_active]);

        return redirect()->back()->with([
            'message' => 'Status "' . $program->title . '" berubah.',
            'type' => 'info',
        ]);
    }


    public function destroy(Program $program)
    {
        if ($program->image && Storage::disk('public')->exists($program->image)) {
            Storage::disk('public')->delete($program->image);
        }

        $program->delete();

        return redirect()
            ->route('admin.programs.index')
            ->with(['message' => 'Program berhasil dihapus 🗑️', 'type' => 'warning']);
    }
}
