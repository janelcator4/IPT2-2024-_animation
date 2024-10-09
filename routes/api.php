<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserController;

// Public routes for registration and login
Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);




// Protected routes that require authentication
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return response()->json($request->user()); // Return authenticated user
    });
    
    // Logout route
    Route::post('/logout', [LogoutController::class, 'logout']);
});

// Admin protected routes that require 'admin' ability
Route::middleware(['auth:sanctum', 'can:admin'])->group(function () {
    // Route to fetch all users, accessible only by admin
    Route::get('/users', [UserController::class, 'index']);

    // Admin dashboard route
    Route::post('/admindashboard', [AdminController::class, 'dashboard']);
});
