<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Post;
use App\Models\Gallery;
use App\Models\Registration;
use App\Models\Message;
use App\Models\Announcement;
use App\Models\Page;
use App\Models\Setting;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        // quick stats
        $stats = [
            'userName' => auth()->user()->name,
            'posts' => Post::where('is_published', 1)->count(),
            'activeAnnouncements' => Announcement::where('is_active', 1)->count(),
            'galleries' => Gallery::count(),
            'registrations_week' => Registration::whereBetween('created_at', [now()->subWeek(), now()])->count(),
            'registrations_total' => Registration::count(),
            'registrations_accepted' => Registration::where('status', 'accepted')->count(),
            'unreadMessages' => Message::where('is_read', false)->count(),
            'pages' => Page::where('is_published', 1)->count(),
            'settings' => Setting::pluck('value','key')->toArray(),
        ];

        // recent lists
        $recentPosts = Post::latest()->take(6)->get(['id','title','thumbnail','created_at','is_published']);
        $recentMessages = Message::latest()->take(6)->get(['id','name','subject','created_at']);

        // hero galleries
        $heroGalleries = Gallery::where('is_hero',1)->where('is_published',1)->latest()->take(8)->get(['id','title','image','is_published']);

        // registrations trend (last 30 days)
        $start = Carbon::now()->subDays(29)->startOfDay();
        $dates = [];
        for ($i = 0; $i < 30; $i++) {
            $d = $start->copy()->addDays($i);
            $dates[$d->toDateString()] = 0;
        }
        $registrations = Registration::where('created_at', '>=', $start)
            ->selectRaw('DATE(created_at) as date, count(*) as count')
            ->groupBy('date')
            ->pluck('count', 'date')
            ->toArray();

        foreach ($registrations as $date => $count) {
            if (isset($dates[$date])) $dates[$date] = (int)$count;
        }
        $registrationsTrend = collect($dates)->map(function($count, $date){
            return ['date' => $date, 'count' => $count];
        })->values();

        // registrations status counts
        $statusCounts = Registration::selectRaw('status, count(*) as value')->groupBy('status')->get()->map(function($r){
            return ['name' => ucfirst($r->status), 'value' => (int)$r->value];
        });

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'recentPosts' => $recentPosts,
            'recentMessages' => $recentMessages,
            'heroGalleries' => $heroGalleries,
            'registrationsTrend' => $registrationsTrend,
            'registrationsStatus' => $statusCounts,
            'settings' => $stats['settings'],
        ]);
    }
}