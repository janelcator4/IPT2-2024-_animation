<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    // Fetch all users
    public function index()
    {
        // Check if the user is authenticated
        $user = auth()->user();

        // Check for admin role using numeric value
        if (!$user || $user->role !== 1) { // 1 for admin
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized access',
            ], 403);
        }

        try {
            \Log::info('Authenticated User:', ['user' => $user]);

            // Fetch all users with specific fields
            $users = User::select('id', 'name', 'email', 'role', 'created_at', 'updated_at')->get();

            // Return users in JSON format
            return response()->json([
                'success' => true,
                'data' => $users,
            ], 200);
        } catch (\Exception $e) {
            \Log::error('Failed to fetch users: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch users: ' . $e->getMessage(),
            ], 500);
        }
    }

    // Fetch a single user by ID
    public function show($id)
    {
        // Check if the user is authenticated
        $user = auth()->user();

        // Check for admin role or if the user is accessing their own profile
        if (!$user || ($user->role !== 1 && $user->id !== $id)) { // 1 for admin
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized access',
            ], 403);
        }

        try {
            // Find user by ID
            $user = User::select('id', 'name', 'email', 'role', 'created_at', 'updated_at')->findOrFail($id);

            // Return user in JSON format
            return response()->json([
                'success' => true,
                'data' => $user,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'User not found',
            ], 404);
        }
    }

    // Optionally, add other methods (store, update, delete) if needed
}
