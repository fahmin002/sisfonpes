<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\Menu;
use Illuminate\Support\Facades\View;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        View::composer('partials.navbar', function ($view) {
            $menus = Menu::whereNull('parent_id')
                ->where('is_active', 1)
                ->with('children')
                ->orderBy('order')
                ->get();

            $view->with('menus', $menus);
        });
    }
}
