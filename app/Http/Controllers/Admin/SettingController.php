<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class SettingController extends Controller
{
    public function index()
    {
        // Ambil semua setting dalam bentuk key-value array
        $settings = Setting::pluck('value', 'key')->toArray();

        return Inertia::render('admin/settings/index', [
            'settings' => $settings,
        ]);
    }

    public function update(Request $request)
    {

        // Ambil setting logo saat ini
        $currentLogo = Setting::where('key', 'logo')->value('value');

        // Handle upload logo baru
        if ($request->hasFile('logo')) {
            // Hapus logo lama jika ada
            if ($currentLogo && Storage::disk('public')->exists($currentLogo)) {
                Storage::disk('public')->delete($currentLogo);
            }

            // Simpan logo baru
            $path = $request->file('logo')->store('settings', 'public');

            // Update atau buat setting baru untuk logo
            Setting::updateOrCreate(
                ['key' => 'logo'],
                ['value' => $path]
            );
        }

        // Update semua field lain selain `_token` dan `logo`
        foreach ($request->except(['_token', 'logo']) as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }

        return back()->with([
            'message' => 'Pengaturan berhasil diperbarui ✅',
            'type' => 'success',
        ]);
    }


    public function apply()
    {
        Cache::flush(); // atau Cache::tags(['settings'])->flush() kalau pakai tags
        return back()->with([
            'message' => 'Pengaturan berhasil diterapkan dan cache dibersihkan.',
            'type' => 'success',
        ]);
    }
}
