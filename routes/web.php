<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\Frontend\FrontendController;

Route::get('/', [FrontendController::class, 'home']);
Route::get('/berita', [FrontendController::class, 'postsIndex']);
Route::get('/berita/{id}', [FrontendController::class, 'postsShow']);
Route::get('/galeri', [FrontendController::class, 'galleryIndex']);
Route::get('/tentang', [FrontendController::class, 'pageAbout']);
Route::get('/pendaftaran', [FrontendController::class, 'registrationForm']);


Route::get('/welcome', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');


// Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

require __DIR__ . '/settings.php';
