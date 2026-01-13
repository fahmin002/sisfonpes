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
        $currentLogo = Setting::where('key', 'site_logo')->value('value');
        $currentQrisImage = Setting::where('key', 'registration_qris')->value('value');
        $currentRegistrationFlyerImage = Setting::where('key', 'registration_flyer')->value('value');

        // Handle upload logo baru
        if ($request->hasFile('site_logo')) {
            // Hapus logo lama jika ada
            if ($currentLogo && Storage::disk('public')->exists($currentLogo)) {
                Storage::disk('public')->delete($currentLogo);
            }

            // Simpan logo baru
            $path = $request->file('site_logo')->store('settings', 'public');

            // Update atau buat setting baru untuk logo
            Setting::updateOrCreate(
                ['key' => 'site_logo'],
                ['value' => $path]
            );
        }

        // Handle upload qris_image baru
        if ($request->hasFile('registration_qris')) {
            // Hapus qris_image lama jika ada
            if ($currentQrisImage && Storage::disk('public')->exists($currentQrisImage)) {
                Storage::disk('public')->delete($currentQrisImage);
            }

            // Simpan qris_image baru
            $path = $request->file('registration_qris')->store('settings', 'public');

            // Update atau buat setting baru untuk qris_image
            Setting::updateOrCreate(
                ['key' => 'registration_qris'],
                ['value' => $path]
            );
        }

        // Handle Upload flyer image
        if ($request->hasFile('registration_flyer')) {
            if ($currentRegistrationFlyerImage && Storage::disk('public')->exists($currentRegistrationFlyerImage)) {
                Storage::disk('public')->delete($currentRegistrationFlyerImage);
            }

            // Simpan flyer image baru
            $path = $request->file('registration_flyer')->store('settings', 'public');

            // Update atau buat setting baru untuk registration_flyer
            Setting::updateOrCreate(
                ['key' => 'registration_flyer'],
                ['value' => $path]
            );
        }

        // Update semua field lain selain `_token` dan `site_logo`
        foreach ($request->except(['_token', 'site_logo', 'registration_qris', 'registration_flyer']) as $key => $value) {
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
