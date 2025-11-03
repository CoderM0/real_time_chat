<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\ProfileController;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::middleware("auth")->group(function () {
    Route::get("users", [ChatController::class, 'blank_messages'])->name("users");
    // Route::get("users/{user_id}", [ChatController::class, 'chat_with_user'])->name("user.chat");
    Route::get("user/{user_id}/messages", [ChatController::class, 'user_messages'])->name("user.messages");
    Route::post("/send", [ChatController::class, 'send_messsage'])->name("send_message");
    Route::post("/messages/{msg}/read", [ChatController::class, 'mark_as_read'])->name("read_message");
});

require __DIR__ . '/auth.php';
