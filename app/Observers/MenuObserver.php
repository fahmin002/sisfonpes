<?php

namespace App\Observers;

use App\Models\Menu;
use App\Models\Page;

class MenuObserver
{
    public function created(Menu $menu)
    {
        // Kalau menu punya parent_id (berarti dia child) → buat page otomatis
        if ($menu->parent_id && !$menu->page) {
            Page::createQuietly([
                'title' => $menu->name,
                'slug' => $menu->slug,
                'content' => '',
                'is_published' => $menu->is_active ?? true,
                'published_at' => $menu->is_active ? now() : null,
            ]);
        }
    }


    public function updated(Menu $menu)
    {
        // Sinkronisasi ke Page kalau menu terhubung
        if ($menu->page) {
            $menu->page->updateQuietly([
                'title' => $menu->name,
                'slug' => $menu->slug,
                'is_published' => $menu->is_active,
                'published_at' => $menu->is_active ? now() : null,
            ]);
        }
    }

    public function deleted(Menu $menu)
    {
        // Hapus Page jika menu terhubung
        if ($menu->page) {
            $menu->page->deleteQuietly();
        }
    }
}
