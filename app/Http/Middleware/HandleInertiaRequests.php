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

            // ✅ Shared menus (hanya di area admin)
            'menus' => fn() => Menu::with('page', 'parent')
                ->select('id', 'name', 'slug', 'url', 'page_id', 'parent_id', 'order', 'is_active')
                ->orderBy('order')
                ->get(),

            // ✅ Shared pages (hanya di area admin juga)
            'pages' => fn() => $request->is('admin/*')
                ? Page::select('id', 'title', 'slug', 'is_published', 'published_at')
                ->orderByDesc('created_at')
                ->get()
                : [],

            
            // 🔹 Sidebar state (misal disimpan di cookie)
            'sidebarOpen' => ! $request->hasCookie('sidebar_state')
                || $request->cookie('sidebar_state') === 'true',
            
            'announcements' => fn() => \App\Models\Announcement::where('is_active', true)
                ->orderByDesc('created_at')
                ->get(),

            'settings' => fn() => \App\Models\Setting::pluck('value', 'key')->toArray(),
        ];
    }
}
