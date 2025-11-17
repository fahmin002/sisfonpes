<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\Frontend\FrontendController;

Route::get('/', [FrontendController::class, 'home']);
Route::get('/tentang', [FrontendController::class, 'pageAbout']);
Route::get('/program-pendidikan', [FrontendController::class, 'programsIndex']);
Route::get('/program-pendidikan/{id}', [FrontendController::class, 'programShow']);
Route::get('/berita', [FrontendController::class, 'postsIndex']);
Route::get('/berita/{id}', [FrontendController::class, 'postShow']);
Route::get('/galeri', [FrontendController::class, 'galleryIndex']);
Route::get('/pendaftaran', [FrontendController::class, 'registrationForm'])->name('registration.index');
Route::post('/pendaftaran', [FrontendController::class, 'registrationSubmit'])->name('registration.submit');
Route::get('/pendaftaran/sukses/{code}', [FrontendController::class, 'registrationSuccess'])
    ->name('registration.success');
Route::get('/cek-pendaftaran', [FrontendController::class, 'checkRegistrationForm'])->name('registration.check');
Route::get('/cek-pendaftaran/{code}', [FrontendController::class, 'checkRegistrationResult']);
Route::get('/kontak', [FrontendController::class, 'pageContact']);
Route::get('/pengumuman', [FrontendController::class, 'announcementsIndex']);
Route::get('/pengumuman/{id}', [FrontendController::class, 'announcementShow']);
Route::get('/kontak', function () {
    return Inertia::render('frontend/contact/index');
})->name('contact.index');
Route::post('/kontak/kirim-pesan', [FrontendController::class, 'sendMessage']);
Route::get('/info', [FrontendController::class, 'infoLinks'])->name('info.index');
Route::get('/info/{slug}', [FrontendController::class, 'showInfo'])->name('info.show');

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
