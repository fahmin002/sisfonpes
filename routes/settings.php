<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\TwoFactorAuthenticationController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\GalleryController;
use App\Http\Controllers\Admin\MenuController;
use App\Http\Controllers\Admin\AnnouncementController;
use App\Http\Controllers\Admin\SettingController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\PageController;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::redirect('settings', '/settings/profile');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/password', [PasswordController::class, 'edit'])->name('user-password.edit');

    Route::put('settings/password', [PasswordController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('user-password.update');

    Route::get('settings/appearance', function () {
        return Inertia::render('settings/appearance');
    })->name('appearance.edit');

    Route::get('settings/two-factor', [TwoFactorAuthenticationController::class, 'show'])
        ->name('two-factor.show');
});

Route::middleware(['auth', 'verified', 'admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
        Route::resource('posts', PostController::class);
        Route::resource('galleries', GalleryController::class);
        Route::resource('menus', MenuController::class);
        Route::resource('pages', PageController::class);
        Route::resource('announcements', AnnouncementController::class);
        Route::resource('registrations', \App\Http\Controllers\Admin\RegistrationController::class);
        Route::resource('messages', \App\Http\Controllers\Admin\MessageController::class)->only([
            'index',
            'show',
            'destroy',
        ]);
        Route::resource('users', \App\Http\Controllers\Admin\UserController::class);
        Route::resource('settings', \App\Http\Controllers\Admin\SettingController::class)->only([
            'index',
            'update',
        ]);

        Route::post('settings/apply', [SettingController::class, 'apply'])->name('settings.apply');
        
        Route::patch('users/{user}/toggle-active', [\App\Http\Controllers\Admin\UserController::class, 'toggleActive'])
        ->name('users.toggleActive');

        Route::patch('registrations/{registration}/updatestatus', [\App\Http\Controllers\Admin\RegistrationController::class, 'updateStatus'])->name('registrations.updateStatus');

        Route::patch('/posts/{post}/unpublish', [PostController::class, 'unpublish'])
            ->name('posts.unpublish');
        Route::patch('/posts/{post}/publish', [PostController::class, 'publish'])
            ->name('posts.publish');

        Route::patch('/announcements/{announcement}/toggle', [AnnouncementController::class, 'toggle'])->name('announcements.toggle');

        Route::patch('/pages/{page}/publish', [\App\Http\Controllers\Admin\PageController::class, 'publish'])->name('pages.publish');
        Route::patch('/pages/{page}/unpublish', [\App\Http\Controllers\Admin\PageController::class, 'unpublish'])->name('pages.unpublish');

        Route::patch('galleries/{gallery}/publish', [GalleryController::class, 'publish'])->name('galleries.publish');
        Route::patch('galleries/{gallery}/unpublish', [GalleryController::class, 'unpublish'])->name('galleries.unpublish');
    });
