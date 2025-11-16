<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class PageSeeder extends Seeder
{
    /**
     * Jalankan seeder database.
     */
    public function run(): void
    {
        $now = Carbon::now();

        DB::table('pages')->insert([
            [
                'title' => 'Tentang Kami',
                'slug' => 'tentang',
                'content' => '<p>Pondok Pesantren Darul Amin berdiri sebagai lembaga pendidikan Islam yang berkomitmen membina generasi Qur’ani dengan semangat keikhlasan, kesederhanaan, dan kemandirian. Berlokasi di lingkungan yang asri dan religius, pondok ini terus berkembang menjadi pusat pembelajaran Islam modern.</p>',
                'excerpt' => 'Profil singkat Pondok Pesantren Darul Amin sebagai lembaga pendidikan Islam modern.',
                'is_published' => true,
                'published_at' => $now->copy()->subDays(10),
                'is_info_link' => false,
                'thumbnail' => 'pages/tentang.jpg',
                'created_at' => $now->copy()->subDays(10),
                'updated_at' => $now->copy()->subDays(10),
            ],
            [
                'title' => 'Visi dan Misi',
                'slug' => 'visi-misi',
                'content' => '<h3>Visi:</h3><p>Menjadi lembaga pendidikan Islam unggulan yang melahirkan generasi berakhlak mulia dan berwawasan global.</p><h3>Misi:</h3><ul><li>Menanamkan nilai-nilai Qur’ani dalam kehidupan santri.</li><li>Mengembangkan sistem pendidikan terpadu antara ilmu agama dan umum.</li><li>Menyiapkan kader umat yang siap berkhidmat di masyarakat.</li></ul>',
                'excerpt' => 'Visi dan misi Pondok Pesantren Darul Amin.',
                'is_published' => true,
                'published_at' => $now->copy()->subDays(8),
                'is_info_link' => true,
                'thumbnail' => 'pages/visi-misi.jpg',
                'created_at' => $now->copy()->subDays(8),
                'updated_at' => $now->copy()->subDays(8),
            ],
            [
                'title' => 'Struktur Organisasi',
                'slug' => 'struktur-organisasi',
                'content' => '<p>Struktur organisasi Pondok Pesantren Darul Amin terdiri atas Pimpinan Pondok, Dewan Asatidz, dan berbagai bidang pendukung pendidikan dan pengasuhan santri.</p>',
                'excerpt' => 'Bagan dan susunan pengurus Pondok Pesantren Darul Amin.',
                'is_published' => true,
                'published_at' => $now->copy()->subDays(6),
                'is_info_link' => true,
                'thumbnail' => null,
                'created_at' => $now->copy()->subDays(6),
                'updated_at' => $now->copy()->subDays(6),
            ],
            [
                'title' => 'Falsafah Pondok',
                'slug' => 'falsafah-pondok',
                'content' => '<p>Panca Jiwa Pondok meliputi: Keikhlasan, Kesederhanaan, Kemandirian, Ukhuwah Islamiyah, dan Kebebasan. Prinsip ini menjadi dasar pendidikan di Pondok Pesantren Darul Amin.</p>',
                'excerpt' => 'Falsafah hidup dan nilai dasar Pondok Pesantren Darul Amin.',
                'is_published' => true,
                'published_at' => $now->copy()->subDays(3),
                'is_info_link' => true,
                'thumbnail' => 'pages/falsafah.jpg',
                'created_at' => $now->copy()->subDays(3),
                'updated_at' => $now->copy()->subDays(3),
            ],
            [
                'title' => 'Kontak Kami',
                'slug' => 'kontak',
                'content' => '<p>Hubungi kami di alamat Pondok Pesantren Darul Amin atau melalui email: info@darulamin.id</p>',
                'excerpt' => 'Informasi kontak resmi Pondok Pesantren Darul Amin.',
                'is_published' => true,
                'published_at' => $now,
                'is_info_link' => false,
                'thumbnail' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);
    }
}
