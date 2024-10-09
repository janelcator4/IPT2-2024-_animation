<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function dashboard(Request $request)
    {
        // Logic for admin dashboard
        return response()->json([
            'success' => true,
            'message' => 'Welcome to the admin dashboard!',
        ]);
    }
}
