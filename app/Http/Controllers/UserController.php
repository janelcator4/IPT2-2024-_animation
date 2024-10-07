<?php



namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // Fetch all users
    public function index()
    {
        try {
            // Fetch all users with specific fields
            $users = User::select('id', 'name', 'email', 'role', 'created_at', 'updated_at')->get();

            // Return users in JSON format
            return response()->json([
                'success' => true,
                'data' => $users,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch users',
            ], 500);
        }
    }

    // Fetch a single user by ID
    public function show($id)
    {
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

