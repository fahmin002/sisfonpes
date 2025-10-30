<?php

namespace App\Observers;

use App\Models\Page;
use App\Models\Menu;

class PageObserver
{
    public function created(Page $page)
    {
        // Buat menu baru otomatis jika belum ada
        if (!$page->menu) {
            Menu::createQuietly([
                'name' => $page->title,
                'slug' => $page->slug,
                'url' => '/' . ltrim($page->slug, '/'),
                'order' => 1,
                'is_active' => $page->is_published ?? true,
                'page_id' => $page->id,
            ]);
        }
    }

    public function updated(Page $page)
    {
        // Sinkronisasi ke Menu kalau page terhubung
        if ($page->menu) {
            $page->menu->updateQuietly([
                'name' => $page->title,
                'slug' => $page->slug,
                'url' => '/' . ltrim($page->slug, '/'),
                'is_active' => $page->is_published,
            ]);
        }
    }

    public function deleted(Page $page)
    {
        // Hapus menu kalau page dihapus
        if ($page->menu) {
            $page->menu->deleteQuietly();
        }
    }
}
