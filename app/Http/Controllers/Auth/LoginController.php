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
      
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

  
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid login credentials'
            ], 401);
        }

      
        $user = Auth::user();

        
        $abilities = $user->role === 1 ? ['view-dashboard', 'manage-users'] : ['view-dashboard'];

     
        $token = $user->createToken($user->name . "'s Token", $abilities)->plainTextToken;

    
        $tokenId = explode('|', $token)[0]; 
        $personalToken = PersonalAccessToken::find($tokenId);

        if ($personalToken) {
            $personalToken->last_used_at = now(); 
            $personalToken->save();
        }

    
        $formattedLastUsedAt = $personalToken && $personalToken->last_used_at
            ? Carbon::parse($personalToken->last_used_at)->format('g:i A') 
            : null;


        $formattedCreatedAt = Carbon::parse($user->created_at)->format('g:i A');
        $formattedUpdatedAt = Carbon::parse($user->updated_at)->format('g:i A');

     
        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'abilities' => $abilities,
                'created_at' => $formattedCreatedAt, 
                'updated_at' => $formattedUpdatedAt, 
                'last_used_at' => $formattedLastUsedAt, 
            ],
            'message' => 'Login successful'
        ]);
    }
}
