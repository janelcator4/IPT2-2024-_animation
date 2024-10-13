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
        
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed', 
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 400);
        }

       
        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 0, 
            ]);
        } catch (\Exception $e) {
            \Log::error('User registration failed: ' . $e->getMessage());
            return response()->json(['message' => 'User registration failed. Please try again.'], 500);
        }

        
        Auth::login($user); 

        
        $abilities = $user->role === 1 ? ['view-dashboard', 'manage-users'] : ['view-dashboard'];

        
        $token = $user->createToken($user->name . "'s Token", $abilities)->plainTextToken;

       
        $formattedCreatedAt = Carbon::parse($user->created_at)->format('g:i A');
        $formattedUpdatedAt = Carbon::parse($user->updated_at)->format('g:i A');


        return response()->json([
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role, 
                'abilities' => $abilities, 
                'created_at' => $formattedCreatedAt, 
                'updated_at' => $formattedUpdatedAt, 
                'last_used_at' => now()->format('g:i A'), 
            ],
            'message' => 'Registration successful',
        ], 201);
    }
}
