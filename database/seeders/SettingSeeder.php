<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        /* Setting seeder
          const { data, setData, post, processing } = useForm({
    site_name: settings.site_name || 'Sistem Informasi Pesantren',
    site_tagline: settings.site_tagline || '',
    contact_email: settings.contact_email || '',
    contact_phone: settings.contact_phone || '',
    address: settings.address || '',
    dark_mode: settings.dark_mode === 'true',
    theme_name: settings.theme_name || 'defaultTheme',
    show_announcements: settings.show_announcements === 'true',
    show_gallery: settings.show_gallery === 'true',
    show_blog: settings.show_blog === 'true',
    maintenance_mode: settings.maintenance_mode === 'true',
    maintenance_message:
      settings.maintenance_message ||
      'Situs sedang dalam pemeliharaan. Silakan kembali lagi nanti.',
  });
        */
        $settings = [
            ['key' => 'site_name', 'value' => 'Sistem Informasi Pesantren Darul Amin'],
            ['key' => 'site_tagline', 'value' => 'Pesantren Digital'],
            ['key' => 'contact_email', 'value' => 'darulamin@example.com'],
            ['key' => 'contact_phone', 'value' => '08123456789'],
            ['key' => 'address', 'value' => 'Jl. Raya Pesantren No. 1, Ponorogo, Jawa Timur'],
            ['key' => 'dark_mode', 'value' => 'false'],
            ['key' => 'theme_name', 'value' => 'defaultTheme'],
            ['key' => 'show_announcements', 'value' => 'true'],
            ['key' => 'show_gallery', 'value' => 'true'],
            ['key' => 'show_blog', 'value' => 'true'],
            ['key' => 'maintenance_mode', 'value' => 'true'],
            ['key' => 'maintenance_message', 'value' => 'Situs sedang dalam pemeliharaan. Silakan kembali lagi nanti.'],
            ['key' => 'falsafah_panca_jiwa', 'value' => 'Keikhlasan, Kesederhanaan, Kemandirian, Ukhuwah Islamiyah, Kebebasan'],
            ['key' => 'falsafah_moto', 'value' => 'Berbudi tinggi, berbadan sehat, berpengetahuan luas, berpikiran bebas'],
            ['key' => 'falsafah_panca_jangka', 'value' => 'Pendidikan, Kaderisasi, Sarana, Dana, Kesejahteraan'],
        ];

        foreach ($settings as $setting) {
            Setting::create([
                'key' => $setting['key'],
                'value' => $setting['value']
            ]);
        }
    }
}
