<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Menu;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Menu seeder
        $menus = [
            ['name' => 'Beranda', 'slug' => '/', 'url' => '/', 'order' => 1],
            ['name' => 'Tentang', 'slug' => 'tentang', 'url' => '/tentang', 'order' => 2],
            ['name' => 'Program Pendidikan', 'slug' => 'program-pendidikan', 'url' => '/program-pendidikan', 'order' => 3],
            ['name' => 'Berita dan Kegiatan', 'slug' => 'berita', 'url' => '/berita', 'order' => 4],
            ['name' => 'Galeri', 'slug' => 'galeri', 'url' => '/galeri', 'order' => 5],
            ['name' => 'Pendaftaran', 'slug' => 'pendaftaran', 'url' => '/pendaftaran', 'order' => 6],
            ['name' => 'Cek Pendaftaran', 'slug' => 'cek-pendaftaran', 'url' => '/cek-pendaftaran', 'order' => 6],
            ['name' => 'Kontak & Alamat', 'slug' => 'kontak', 'url' => '/kontak', 'order' => 7],
            ['name' => 'Pengumuman', 'slug' => 'pengumuman', 'url' => '/pengumuman', 'order' => 8],
        ];

        foreach ($menus as $menu) {
            Menu::create($menu);
        }
    }
}
