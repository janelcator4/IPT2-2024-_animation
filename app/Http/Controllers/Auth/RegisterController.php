<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;

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
                'role' => 'user', // Set default role to 'user'
            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'User registration failed.'], 500);
        }

        // Automatically log the user in by generating a token with abilities
        Auth::login($user); // Log the user in

        // Define abilities based on user role
        $abilities = $user->role === 'admin' ? ['view-dashboard', 'manage-users'] : ['view-dashboard'];

        // Create the token with the defined abilities
        $token = $user->createToken($user->name . "'s Token", $abilities)->plainTextToken;

        // Get the newly created token to update last_used_at
        $tokenId = explode('|', $token)[0]; 
        $personalToken = PersonalAccessToken::find($tokenId);

        if ($personalToken) {
            $personalToken->last_used_at = now(); // Set last used at to current time
            $personalToken->save(); // Save the updated token
        }

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

