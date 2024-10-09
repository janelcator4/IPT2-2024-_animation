<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class RegisterController extends Controller
{
    /**
     * Handle the incoming request for registration.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        // Validate the incoming request
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed', // Ensure password confirmation
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 400);
        }

        // Create the user
        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 0, // Set default role to 0 for 'user'
            ]);
        } catch (\Exception $e) {
            \Log::error('User registration failed: ' . $e->getMessage()); // Log the error for debugging
            return response()->json(['message' => 'User registration failed. Please try again.'], 500);
        }

        // Automatically log the user in by generating a token with abilities
        Auth::login($user); // Log the user in

        // Define abilities based on user role
        $abilities = $user->role === 1 ? ['view-dashboard', 'manage-users'] : ['view-dashboard'];

        // Create the token with the defined abilities
        $token = $user->createToken($user->name . "'s Token", $abilities)->plainTextToken;

        // Format created_at and updated_at to desired format (12-hour time format with AM/PM)
        $formattedCreatedAt = Carbon::parse($user->created_at)->format('g:i A');
        $formattedUpdatedAt = Carbon::parse($user->updated_at)->format('g:i A');

        // Return token and user details with formatted time
        return response()->json([
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role, // Include the actual role in the response
                'abilities' => $abilities, // Include abilities in the response
                'created_at' => $formattedCreatedAt, // Formatted time
                'updated_at' => $formattedUpdatedAt, // Formatted time
                'last_used_at' => now()->format('g:i A'), // Include last_used_at in the response
            ],
            'message' => 'Registration successful',
        ], 201);
    }
}
