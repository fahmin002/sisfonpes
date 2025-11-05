<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

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
        // Loop semua input dan update satu-satu
        foreach ($request->except('_token') as $key => $value) {
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
