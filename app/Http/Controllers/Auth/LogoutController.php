<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LogoutController extends Controller
{
    public function logout(Request $request)
    {
        // Get the authenticated user's current token
        $user = $request->user(); // Fetch the authenticated user

        // Check if the user is authenticated
        if ($user) {
            // Revoke/Delete the current token
            $user->currentAccessToken()->delete();

            // Optionally, you can also revoke all tokens if needed
            // $user->tokens()->delete();

            // Return a success message
            return response()->json([
                'message' => 'Successfully logged out',
            ], 200);
        }

        // Return an error if the user is not authenticated
        return response()->json([
            'message' => 'User not authenticated',
        ], 401);
    }
}

