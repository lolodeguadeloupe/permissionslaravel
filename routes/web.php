<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\PostController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\PermissionController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    // Gestion du profil
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Gestion des étudiants
    Route::resource('students', StudentController::class);
    // Gestion des rôles
    Route::resource('roles', RoleController::class);
    
    //Gestion de la liste des posts
    Route::resource('posts', PostController::class)->except(['show']);
    Route::get('/posts2', [PostController::class, 'index2'])->name('posts2.index');
    Route::get('/posts3', [PostController::class, 'index3'])->name('posts3.index');
    Route::get('/posts/load-more', [PostController::class, 'loadMore'])->name('posts.loadMore');

    //Gestion des utilisateurs
    Route::resource('users', UserController::class);

    //Gestion des permissions
    Route::resource('permissions', PermissionController::class);
});



require __DIR__.'/auth.php';
