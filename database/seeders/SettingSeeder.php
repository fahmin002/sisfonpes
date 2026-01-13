<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            // 🏷️ Site
            ['key' => 'site_name', 'value' => 'Dayah Perbatasan Darul Amin'],
            ['key' => 'site_tagline', 'value' => 'Islamic Modern Boarding School Untuk Semua Golongan'],
            ['key' => 'site_logo', 'value' => null],

            // 📞 Contact
            ['key' => 'contact_email', 'value' => 'darulamin@example.com'],
            ['key' => 'contact_phone', 'value' => '08123456789'],
            ['key' => 'contact_address', 'value' => 'Jln. Medan - Kutacane Km 31, Desa Tanoh Alas, Kecamatan Babul Makmur Aceh Tenggara'],

            // 🌐 Social Media
            ['key' => 'social_facebook', 'value' => 'https://facebook.com/darulaminfb'],
            ['key' => 'social_instagram', 'value' => 'https://instagram.com/darulaminig'],
            ['key' => 'social_twitter', 'value' => 'https://twitter.com/darulamintw'],
            ['key' => 'social_youtube', 'value' => 'https://youtube.com/@darulaminyt'],

            // 🎨 Appearance
            ['key' => 'appearance_dark_mode', 'value' => '0'],
            ['key' => 'appearance_theme_name', 'value' => 'defaultTheme'],

            // 📢 Feature Toggles
            ['key' => 'feature_announcements', 'value' => '1'],
            ['key' => 'feature_gallery', 'value' => '1'],
            ['key' => 'feature_blog', 'value' => '1'],

            // 📝 Registration
            ['key' => 'registration_flyer', 'value' => null],
            ['key' => 'registration_qris', 'value' => null],
            ['key' => 'registration_fee', 'value' => '0'],
            [
                'key' => 'registration_note',
                'value' =>
                    "Calon santri diwajibkan melakukan transfer terlebih dahulu.\n" .
                    "Harap membawa fotokopi KK, Akta Kelahiran, dan Rapor terakhir saat datang ke pondok."
            ],

            // 🛠️ System
            ['key' => 'system_maintenance', 'value' => '0'],
            [
                'key' => 'system_maintenance_message',
                'value' =>
                    'Situs sedang dalam pemeliharaan. Silakan kembali lagi nanti.'
            ],

            // 🎯 Profile
            [
                'key' => 'profile_vision',
                'value' =>
                    'Menjadi lembaga pendidikan pencetak kader umat, pusat thalabul ilmi, dan sumber ilmu Islam berjiwa pesantren.'
            ],
            [
                'key' => 'profile_mission',
                'value' =>
                    "Membentuk generasi mukmin yang unggul.\n" .
                    "Berbudi tinggi, berbadan sehat, berpengetahuan luas, dan berkhidmat kepada masyarakat."
            ],
        ];

        Setting::upsert(
            $settings,
            ['key'],     // unique by key
            ['value']    // update value if exists
        );
    }
}
