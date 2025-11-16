<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class MessageSeeder extends Seeder
{
    /**
     * Jalankan seeder database.
     */
    public function run(): void
    {
        $now = Carbon::now();

        DB::table('messages')->insert([
            [
                'name' => 'Ahmad Fauzi',
                'email' => 'ahmad@example.com',
                'subject' => 'Informasi pendaftaran santri',
                'message' => 'Assalamualaikum, saya ingin menanyakan syarat pendaftaran santri baru tahun ini.',
                'is_read' => false,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Siti Rahma',
                'email' => 'rahma@example.com',
                'subject' => 'Kerjasama kegiatan sosial',
                'message' => 'Kami dari komunitas Pemuda Hijrah ingin menawarkan kerja sama kegiatan sosial di pondok.',
                'is_read' => true,
                'created_at' => $now->copy()->subDays(1),
                'updated_at' => $now->copy()->subDays(1),
            ],
            [
                'name' => 'Muhammad Rizki',
                'email' => 'rizki@example.com',
                'subject' => 'Kunjungan ke pondok',
                'message' => 'Apakah pondok menerima kunjungan dari sekolah lain untuk studi banding?',
                'is_read' => false,
                'created_at' => $now->copy()->subDays(2),
                'updated_at' => $now->copy()->subDays(2),
            ],
        ]);
    }
}
