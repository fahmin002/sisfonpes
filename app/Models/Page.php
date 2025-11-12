<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Page extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'content',
        'is_published',
        'published_at',
        'is_info_link',
        'thumbnail',
        'excerpt',
    ];

    protected static function boot()
    {
        parent::boot(); // ✅ penting

        static::deleting(function ($page) {
            if ($page->menu) {
                $page->menu->delete();
            }
        });
    }

    public function menu()
    {
        return $this->hasOne(Menu::class);
    }

    public function parent()
    {
        return $this->belongsTo(Page::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Page::class, 'parent_id');
    }

    public function getFullSlugAttribute()
    {
        if ($this->parent) {
            return $this->parent->full_slug . '/' . $this->slug;
        }
        return $this->slug;
    }
}
