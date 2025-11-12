<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use App\Models\Post;
use App\Models\Announcement;
use App\Models\Setting;
use Inertia\Inertia;

class FrontendController extends Controller
{
    public function home()
{
    $posts = \App\Models\Post::where('is_published', true)->orderByDesc('published_at')->take(6)->get();
    $programs = \App\Models\Program::orderBy('order')->get();
    $galleries = \App\Models\Gallery::latest()->take(10)->where('is_published', true)->orderByDesc('created_at')->get();
    $infoLinks = \App\Models\Page::where('is_info_link', true)
    ->select('id', 'title', 'slug', 'thumbnail', 'excerpt')
    ->get();

    return Inertia::render('frontend/Home', [
        'posts' => $posts,
        'programs' => $programs,
        'galleries' => $galleries,
        'infoLinks' => $infoLinks,
    ]);
}

}
