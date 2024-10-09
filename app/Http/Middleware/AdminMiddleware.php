<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // Check if the user is authenticated and their role is '1' for admin
        if (!auth()->user() || auth()->user()->role !== 1) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        return $next($request);
    }
}
