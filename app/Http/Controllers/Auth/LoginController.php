<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;
use Carbon\Carbon;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        // Attempt to log the user in
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid login credentials'
            ], 401);
        }

        // Get the authenticated user
        $user = Auth::user();

        // Define abilities based on user role
        $abilities = $user->role === 1 ? ['view-dashboard', 'manage-users'] : ['view-dashboard'];

        // Create a token for the user with a descriptive name and abilities
        $token = $user->createToken($user->name . "'s Token", $abilities)->plainTextToken;

        // Optional: If you want to update the last used time for the token
        // You can skip this part if you don't need to track when tokens were last used
        $tokenId = explode('|', $token)[0]; 
        $personalToken = PersonalAccessToken::find($tokenId);

        if ($personalToken) {
            $personalToken->last_used_at = now(); 
            $personalToken->save();
        }

        // Format the last used time
        $formattedLastUsedAt = $personalToken && $personalToken->last_used_at
            ? Carbon::parse($personalToken->last_used_at)->format('g:i A') 
            : null;

        // Format created_at and updated_at for user
        $formattedCreatedAt = Carbon::parse($user->created_at)->format('g:i A');
        $formattedUpdatedAt = Carbon::parse($user->updated_at)->format('g:i A');

        // Return the token and user details
        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'abilities' => $abilities,
                'created_at' => $formattedCreatedAt, // Include formatted created_at
                'updated_at' => $formattedUpdatedAt, // Include formatted updated_at
                'last_used_at' => $formattedLastUsedAt, // Include formatted last_used_at
            ],
            'message' => 'Login successful'
        ]);
    }
}
