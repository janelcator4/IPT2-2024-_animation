<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LogoutController extends Controller
{
    public function logout(Request $request)
    {
        
        $user = $request->user(); 

        
        if ($user) {
            
            $user->currentAccessToken()->delete();

            

            
            return response()->json([
                'message' => 'Successfully logged out',
            ], 200);
        }

        
        return response()->json([
            'message' => 'User not authenticated',
        ], 401);
    }
}

