<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use \App\Models\Page;

class Menu extends Model
{
    protected $fillable = ['name', 'slug', 'url', 'parent_id', 'page_id', 'order', 'is_active'];

    protected static function boot()
    {
        parent::boot();

        static::saving(function ($menu) {
            if ($menu->parent_id) {
                $parent = Menu::find($menu->parent_id);
                $menu->url = rtrim($parent->url, '/') . '/' . ltrim($menu->slug, '/');
            } else {
                $menu->url = '/' . ltrim($menu->slug, '/');
            }
        });
        static::deleting(function ($menu) {
            // Hapus menu yang terhubung ke page ini
            if ($menu->page) {
                $menu->page->menu()->delete();
            }
        });
    }

    public function children()
    {
        return $this->hasMany(Menu::class, 'parent_id');
    }

    public function parent()
    {
        return $this->belongsTo(Menu::class, 'parent_id');
    }

    public function page()
    {
        return $this->belongsTo(Page::class);
    }

    public function getResolvedUrlAttribute()
    {
        if ($this->page) {
            return '/' . $this->page->slug;
        }

        return $this->url ?? '#';
    }
}
