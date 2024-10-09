<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  array  $guards
     * @return \Illuminate\Http\JsonResponse|null
     */
    protected function unauthenticated($request, array $guards)
    {
        // Return a JSON response for unauthenticated users
        return response()->json(['error' => 'Unauthenticated.'], 401);
    }
}
