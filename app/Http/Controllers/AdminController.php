<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    // Constructor to apply middleware
    public function __construct()
    {
        // Apply the auth:sanctum middleware to the entire controller
        $this->middleware('auth:sanctum');
    }

    public function dashboard(Request $request)
    {
        // Check if the authenticated user is an admin
        $user = Auth::user(); // Get the authenticated user

        // Check role against numeric value for admin
        if ($user->role !== 1) { // 1 for admin
            // If the user is not an admin, return a forbidden response
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized access. Admins only.',
            ], 403);
        }

        // Logic for admin dashboard
        return response()->json([
            'success' => true,
            'message' => 'Welcome to the admin dashboard!',
        ]);
    }
}
