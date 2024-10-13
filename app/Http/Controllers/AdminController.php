<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    
    public function __construct()
    {
        
        $this->middleware('auth:sanctum');
    }

    public function dashboard(Request $request)
    {
        
        $user = Auth::user(); 

        
        if ($user->role !== 1) { 
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized access. Admins only.',
            ], 403);
        }

        
        return response()->json([
            'success' => true,
            'message' => 'Welcome to the admin dashboard!',
        ]);
    }
}
