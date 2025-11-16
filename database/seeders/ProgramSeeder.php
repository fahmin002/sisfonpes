<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ProgramSeeder extends Seeder
{
    /**
     * Jalankan seeder untuk tabel programs.
     */
    public function run(): void
    {
        $now = Carbon::now();

        DB::table('programs')->insert([
            [
                'title' => 'Madrasah Tsanawiyah (MTs) Darul Amin',
                'description' => 'Program pendidikan jenjang menengah pertama yang menanamkan dasar-dasar ilmu agama dan umum. Fokus pada pembentukan karakter islami, kedisiplinan, dan kemampuan akademik.',
                'slug' => 'madrasah-tsanawiyah-darul-amin',
                'image' => 'programs/mts.jpg',
                'order' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'title' => 'Madrasah Aliyah (MA) Darul Amin',
                'description' => 'Program lanjutan tingkat menengah atas dengan kurikulum terpadu antara ilmu agama dan ilmu pengetahuan umum. Santri didorong untuk berpikir kritis dan berakhlak mulia.',
                'slug' => 'madrasah-aliyah-darul-amin',
                'image' => 'programs/ma.jpg',
                'order' => 2,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'title' => 'Tahfidzul Qur’an',
                'description' => 'Program unggulan bagi santri yang ingin menghafal Al-Qur’an 30 juz dengan bimbingan para hafidz berpengalaman. Mengutamakan hafalan yang mutqin dan pemahaman makna.',
                'image' => 'programs/tahfidz.jpg',
                'slug' => 'tahfidzul-quran',
                'order' => 3,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'title' => 'Diniyah & Kajian Kitab Kuning',
                'description' => 'Program khas pesantren yang menekankan pendalaman ilmu fiqih, tauhid, dan tasawuf melalui kajian kitab kuning serta pembinaan adab santri sehari-hari.',
                'slug' => 'diniyah-kajian',
                'image' => 'programs/diniyah.jpg',
                'order' => 4,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);
    }
}
