<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        // Define the 'admin' gate using numeric role
        Gate::define('admin', function ($user) {
            return $user->role === 1; // Ensure user has an admin role (1)
        });

        // Define abilities
        Gate::define('view-dashboard', function ($user) {
            return in_array($user->role, [0]); // Allow both admin (1) and user (0) to view dashboard
        });

        Gate::define('manage-users', function ($user) {
            return $user->role === 1; // Only admin (1) can manage users
        });
    }
}
