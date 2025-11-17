<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\Menu;
use App\Models\Page;

class HandleInertiaRequests extends Middleware
{
    /**
     * Root template yang dipakai pertama kali saat load.
     */
    protected $rootView = 'app';

    /**
     * Versi asset (otomatis oleh Laravel Mix/Vite).
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }


    /**
     * Data yang dibagikan ke semua halaman Inertia.
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        return [
            ...parent::share($request),

            // 🔹 Informasi dasar aplikasi
            'app' => [
                'name' => config('app.name'),
                'quote' => [
                    'message' => trim($message),
                    'author' => trim($author),
                ],
            ],

            // 🔹 Data user login
            'auth' => [
                'user' => $request->user(),
            ],

            'flash' => fn() => [
                'type' => session('type'),
                'message' => session('message'),
            ],
            'flash_messages' => fn() => session('flash_messages') ?? [],

            'menus' => fn() => Menu::select('id', 'name', 'slug', 'url', 'parent_id', 'order', 'is_active')
                ->orderBy('order')
                ->get(),

            'pages' => fn() => Page::select('id', 'title', 'slug', 'is_published', 'published_at')
                ->orderByDesc('created_at')
                ->get(),


            // 🔹 Sidebar state (misal disimpan di cookie)
            'sidebarOpen' => ! $request->hasCookie('sidebar_state')
                || $request->cookie('sidebar_state') === 'true',

            'announcements' => fn() => \App\Models\Announcement::where('is_active', true)
                ->when(true, function ($q) {
                    $now = now();
                    $q->where(function ($q) use ($now) {
                        $q->whereNull('start_date')->orWhere('start_date', '<=', $now);
                    })->where(function ($q) use ($now) {
                        $q->whereNull('end_date')->orWhere('end_date', '>=', $now);
                    });
                })
                ->orderByDesc('start_date')
                ->paginate(3),

            'settings' => fn() => \App\Models\Setting::pluck('value', 'key')->toArray(),
        ];
    }
}
