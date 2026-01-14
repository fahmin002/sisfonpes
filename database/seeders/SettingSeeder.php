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
            ['key' => 'site_tagline', 'value' => 'Islamic Modern Boarding School Berdiri di Atas dan Untuk Semua Golongan'],
            ['key' => 'site_logo', 'value' => null],

            // 📞 Contact
            ['key' => 'contact_email', 'value' => 'darulamin@example.com'],
            ['key' => 'contact_phone', 'value' => '08123456789'],
            ['key' => 'contact_address', 'value' => 'Jln. Medan - Kutacane Km 31, Desa Tanoh Alas, Kecamatan Babul Makmur Aceh Tenggara'],

            // 🌐 Social Media
            ['key' => 'social_facebook', 'value' => 'darulaminfb'],
            ['key' => 'social_instagram', 'value' => 'darulaminig'],
            ['key' => 'social_twitter', 'value' => 'darulamintw'],
            ['key' => 'social_youtube', 'value' => '@darulaminyt'],

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
            [
                "key" => "registration_note",
                'value' => "<p><strong>Prosedur Pendaftaran Santri</strong></p><ol><li><p>Calon santri melakukan transfer biaya pendaftaran sebesar <strong>Rp200.000</strong>.</p></li><li><p>Transfer dilakukan ke rekening berikut:<br><strong>Bank</strong>: BRI<br><strong>No. Rekening</strong>: 1234 5678 9012 345<br><strong>Atas Nama</strong>: Dayah Perbatasan Darul Amin</p></li><li><p>Simpan bukti transfer dalam bentuk <strong>foto atau PDF</strong>.</p></li><li><p>Isi formulir pendaftaran dan <strong>unggah bukti transfer</strong> yang telah disimpan.</p></li><li><p>Pihak pesantren akan melakukan <strong>verifikasi pendaftaran</strong>, dan statusnya dapat dicek melalui website.</p></li><li><p>Saat datang ke pondok, harap membawa <strong>fotokopi Kartu Keluarga (KK), Akta Kelahiran, dan rapor terakhir</strong>.</p></li></ol><p></p>"
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
                'key' => 'profile_history',
                'value' =>
                    '<p><strong>Profil Singkat</strong><br>Dayah Perbatasan Darul Amin adalah lembaga pendidikan Islam (pesantren) yang didirikan pada tahun <strong>1998</strong> atas inisiatif Pemerintah Aceh Tenggara sebagai benteng pendidikan dari pengaruh negatif luar daerah. (<a target="_blank" rel="noopener noreferrer nofollow" href="https://dayah.my.id/d/dayah-perbatasan-darul-amin/?utm_source=chatgpt.com">Dayah</a>)</p><p>Awalnya dayah beroperasi tidak optimal sampai <strong>2007</strong>, karena santri hanya tinggal sampai siang dan pulang, sehingga fungsi pesantren belum berjalan maksimal. (<a target="_blank" rel="noopener noreferrer nofollow" href="https://dayah.my.id/d/dayah-perbatasan-darul-amin/?utm_source=chatgpt.com">Dayah</a>)</p><p>Pada <strong>tahun 2007</strong> dipimpin oleh <strong>Ustaz Drs. H. Muchlisin Desky, MM</strong>, alumni <em>Dayah Darul Iman Aceh Tenggara</em> dan <em>Pondok Modern Darussalam Gontor Ponorogo</em>. Di bawah kepemimpinannya, sistem pendidikan diperbaiki dengan menggabungkan metode pesantren tradisional dan <strong>kurikulum nasional</strong>, membuat dayah berkembang pesat. </p>'
            ],
            [
                'key' => 'profile_vision',
                'value' =>
                    '<p>Menjadi lembaga pendidikan pencetak kader umat, tempat ibadah <em>thalab-ilmi</em>, dan sumber ilmu pengetahuan Islam serta bahasa Al-Qur’an yang berjiwa pesantren.</p>'
            ],
            [
                'key' => 'profile_mission',
                'value' =>
                    "<ul><li><p>Mendidik generasi unggul menuju terbentuknya <em>khairu ummah</em>.</p></li><li><p>Mendidik generasi mukmin muslim yang berbudi pekerti tinggi, berpengetahuan luas, sehat, berpikiran bebas, dan berkhidmat kepada masyarakat.</p></li></ul><p></p>"
            ],
            [
                'key' => 'profile_excellence',
                'value' =>
                    "<p>✔️ Binaan Dinas Pendidikan Dayah Provinsi Aceh<br>✔️ Sistem <em>boarding school</em> (santri tinggal penuh waktu)<br>✔️ Kurikulum integratif agama dan umum<br>✔️ Semua pendidik tinggal di pesantren<br>✔️ Fasilitas lengkap seperti olahraga dan bangunan permanen<br>✔️ Pengajaran bahasa dengan metode langsung (<em>direct method</em>)<br>✔️ Meraih penghargaan kebersihan terbaik di Aceh (2016)</p>"
            ],
            [
                'key' => 'profile_facilities',
                'value' =>
                    "<p>Masjid, asrama putra-putri, ruang kelas, perpustakaan, laboratorium komputer, laboratorium IPA &amp; Matematika, aula, kantor, koperasi pesantren, sarana olahraga (futsal, voli, takraw), ruang organisasi pelajar, dan fasilitas air minum RO.</p>"
            ],
            [
                'key' => 'profile_extracurricular',
                'value' =>
                    "<p>● Kepramukaan<br>● Jurnalistik<br>● Pidato 3 bahasa<br>● Seni tari<br>● Manasik haji<br>● Pencak silat<br>● Gymnastik<br>● <em>Conversation</em> &amp; <em>Teaching Practice</em><br>● <em>Paskibra</em><br>● Jum’iyyatul Qurro</p>"
            ],
            [
                'key' => 'profile_leader1',
                'value' => 'Drs. H. Muhammad Nur Ali, M.Pd.I',
            ],
            [
                'key' => 'profile_leader2',
                'value' => 'Ust. Ahmad Fauzi, S.Ag., M.Ag',
            ],
            [
                'key' => 'profile_leader3',
                'value' => 'Ust. Sulaiman, Lc., M.H.I',
            ],
        ];

        Setting::upsert(
            $settings,
            ['key'],     // unique by key
            ['value']    // update value if exists
        );
    }
}
