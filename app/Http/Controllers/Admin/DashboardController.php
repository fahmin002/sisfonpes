<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Post;
use App\Models\Gallery;
use App\Models\Registration;
use App\Models\Message;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/dashboard', [
            'stats' => [
                'userName' => auth()->user()->name,
                'posts' => Post::count(),
                'galleries' => Gallery::count(),
                'registrations' => Registration::count(),
                'messages' => Message::where('is_read', false)->count(),
            ],
            'recentPosts' => Post::latest()->take(5)->get(['id', 'title', 'created_at']),
        ]);
    }
}
