<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'image', 'description', 'is_published', 'published_at'];
    protected $casts = [
        'is_published' => 'boolean',
        'published_at' => 'datetime'
    ];
}
