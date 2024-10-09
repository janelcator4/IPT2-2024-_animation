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
        $user = $request->user();

        // Revoke/Delete the current token
        $user->currentAccessToken()->delete();

        // Return a success message
        return response()->json([
            'message' => 'Successfully logged out',
        ], 200);
    }
}
