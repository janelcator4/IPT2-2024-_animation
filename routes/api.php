<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserController;

// Register and login routes
Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);


// Protected routes that require authentication
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Logout route
    Route::post('/logout', [LogoutController::class, 'logout']);
});
Route::middleware('auth:sanctum')->get('/users', [UserController::class, 'index']);

// Admin protected routes that require 'admin' ability
Route::middleware(['auth:sanctum', 'can:admin'])->group(function () {
    Route::post('/admindashboard', [AdminController::class, 'dashboard']);
    
    Route::get('/users/{id}', [UserController::class, 'show']); // Fetch single user by ID
    // Other admin routes...
});



