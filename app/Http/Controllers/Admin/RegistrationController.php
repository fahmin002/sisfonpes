<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Registration;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class RegistrationController extends Controller
{
    /**
     * Tampilkan daftar pendaftar.
     */
    public function index(Request $request)
    {
        $query = Registration::query();
        if ($search = $request->get('search')) {
            $query->where('registration_code', "%{$search}%")
                ->orWhere('full_name', 'like', "%{$search}%")
                ->orWhere('nik', 'like', "%{$search}%")
                ->orWhere('registration_code', 'like', "%{$search}%")
                ->orWhere('parent_name', 'like', "%{$search}%");
        }


        $registrations = $query->orderByDesc('created_at')->paginate(10)->withQueryString();

        return Inertia::render('admin/registrations/index', [
            'registrations' => $registrations,
            'filters' => $request->only('search')
        ]);
    }

    /**
     * Tampilkan form tambah pendaftar baru.
     */
    public function create()
    {
        return Inertia::render('admin/registrations/create');
    }

    /**
     * Simpan data pendaftaran baru.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'nik' => 'required|string|max:16|unique:registrations,nik',
            'gender' => 'required|in:male,female',
            'birth_place' => 'required|string|max:255',
            'birth_date' => 'required|date',
            'address' => 'required|string',
            'previous_school' => 'nullable|string|max:255',
            'parent_name' => 'required|string|max:255',
            'parent_contact' => 'required|string|max:20',
            'payment_proof' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        if ($request->hasFile('payment_proof')) {
            $validated['payment_proof'] = $request->file('payment_proof')->store('payments', 'public');
        }

        $registration = Registration::create($validated);

        return redirect()
            ->route('admin.registrations.index')
            ->with([
                'message' => 'Pendaftar "' . $registration->full_name . '" berhasil ditambahkan.',
                'type' => 'success',
            ]);
    }

    /**
     * Tampilkan form edit pendaftar.
     */
    public function edit(Registration $registration)
    {
        return Inertia::render('admin/registrations/edit', [
            'registration' => $registration,
        ]);
    }

    public function show(Registration $registration)
    {
        return Inertia::render('admin/registrations/show', [
            'registration' => $registration,
        ]);
    }
    /**
     * Update data pendaftar.
     */
    public function update(Request $request, Registration $registration)
    {
        $validated = $request->validate([
            'nik'              => 'sometimes|required|string|max:16|unique:registrations,nik,' . $registration->id,
            'full_name'        => 'sometimes|required|string|max:255',
            'gender'           => 'sometimes|required|in:male,female',
            'birth_place'      => 'sometimes|required|string|max:255',
            'birth_date'       => 'sometimes|required|date',
            'address'          => 'sometimes|required|string',
            'previous_school'  => 'sometimes|nullable|string|max:255',
            'parent_name'      => 'sometimes|required|string|max:255',
            'parent_contact'   => 'sometimes|required|string|max:20',
            'payment_proof'    => 'sometimes|nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        if ($request->hasFile('payment_proof')) {

            if ($registration->payment_proof) {
                Storage::disk('public')->delete($registration->payment_proof);
            }

            $validated['payment_proof'] = $request->file('payment_proof')->store('payments', 'public');
        } else {
            $validated['payment_proof'] = $registration->payment_proof;
        }

        $registration->update($validated);

        return redirect()
            ->route('admin.registrations.index')
            ->with([
                'message' => 'Data pendaftar "' . $registration->full_name . '" berhasil diperbarui.',
                'type' => 'info',
            ]);
    }


    public function updateStatus(Registration $registration, Request $request)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,accepted,rejected',
        ]);

        $registration->update(['status' => $validated['status']]);

        return redirect()
            ->back()
            ->with([
                'message' => 'Status pendaftaran ' . $registration->full_name . ' diubah menjadi ' . strtoupper($validated['status']),
                'type' => match ($validated['status']) {
                    'accepted' => 'success',
                    'rejected' => 'warning',
                    default => 'info',
                },
            ]);
    }

    /**
     * Hapus data pendaftaran.
     */
    public function destroy(Registration $registration)
    {
        $name = $registration->full_name;
        $registration->delete();

        return redirect()
            ->route('admin.registrations.index')
            ->with([
                'message' => 'Pendaftaran "' . $name . '" berhasil dihapus.',
                'type' => 'delete',
            ]);
    }
}
