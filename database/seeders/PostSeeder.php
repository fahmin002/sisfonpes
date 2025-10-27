<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Post;
use Illuminate\Support\Carbon;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // post seeder
        $posts = [
            [
                'title' => 'Kegiatan Haflah Akhirussanah 2025',
                'content' => 'Pondok Pesantren Darul Amin mengadakan Haflah Akhirussanah 2025 sebagai wujud rasa syukur atas berakhirnya tahun ajaran. Acara diisi dengan khataman Al-Qur’an, penampilan santri, serta tausiah dari para asatidz.',
                'thumbnail' => 'images/berita/haflah-akhirussanah.jpg',
                'published_at' => Carbon::now()->subDays(3),
                'is_published' => true
            ],
            [
                'title' => 'Lomba Tahfidz Antar Santri',
                'content' => 'Dalam rangka memperingati Hari Santri Nasional, diadakan lomba tahfidz antar santri dengan tujuan menumbuhkan semangat menghafal Al-Qur’an. Peserta berasal dari berbagai jenjang pendidikan di lingkungan pesantren.',
                'thumbnail' => 'images/berita/lomba-tahfidz.jpg',
                'published_at' => Carbon::now()->subDays(10),
                'is_published' => true
            ],
            [
                'title' => 'Pelatihan Kewirausahaan Santri',
                'content' => 'Santri Darul Amin mengikuti pelatihan kewirausahaan yang diselenggarakan oleh Yayasan. Program ini bertujuan untuk menumbuhkan jiwa mandiri dan kreatif dalam berwirausaha sejak dini.',
                'thumbnail' => 'images/berita/pelatihan-wirausaha.jpg',
                'published_at' => Carbon::now()->subDays(20),
                'is_published' => true
            ],
            [
                'title' => 'Penerimaan Santri Baru Tahun 2025/2026 Dibuka',
                'content' => 'Pondok Pesantren Darul Amin membuka pendaftaran santri baru untuk tahun ajaran 2025/2026. Calon santri dapat mendaftar secara langsung di sekretariat atau melalui laman resmi pesantren.',
                'thumbnail' => 'images/berita/psb-2025.jpg',
                'published_at' => Carbon::now()->subDays(5),
                'is_published' => true
            ],
        ];
        if (Post::count() == 0) {
            foreach ($posts as $post) {
                Post::create($post);
            }
        }
    }
}
