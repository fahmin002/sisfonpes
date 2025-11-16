<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AnnouncementSeeder extends Seeder
{
    /**
     * Jalankan seeder database.
     */
    public function run(): void
    {
        $now = Carbon::now();

        DB::table('announcements')->insert([
            [
                'title' => 'Pendaftaran Santri Baru 2025 Telah Dibuka!',
                'content' => 'Pondok Pesantren Darul Amin membuka pendaftaran santri baru tahun ajaran 2025/2026. Informasi lebih lanjut dapat dilihat di halaman Pendaftaran.',
                'is_active' => true,
                'start_date' => $now->copy()->subDays(2),
                'end_date' => $now->copy()->addMonths(1),
                'created_at' => $now->copy()->subDays(2),
                'updated_at' => $now->copy()->subDays(1),
            ],
            [
                'title' => 'Libur Semester Genap 1446 H',
                'content' => 'Libur semester genap dimulai tanggal 10–25 Juni 2025. Seluruh santri diharapkan kembali ke pondok pada tanggal 26 Juni 2025.',
                'is_active' => true,
                'start_date' => $now->copy()->addMonths(1),
                'end_date' => $now->copy()->addMonths(2),
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'title' => 'Kajian Umum Bersama KH. Ahmad Zainuddin',
                'content' => 'Akan diadakan kajian umum bertema *Meneladani Akhlak Rasulullah* pada hari Jumat, 15 Mei 2025 pukul 19.30 WIB di Masjid Darul Amin. Terbuka untuk umum.',
                'is_active' => false,
                'start_date' => $now->copy()->subMonths(2),
                'end_date' => $now->copy()->subMonths(2)->addDays(1),
                'created_at' => $now->copy()->subMonths(2),
                'updated_at' => $now->copy()->subMonths(1),
            ],
        ]);
    }
}
