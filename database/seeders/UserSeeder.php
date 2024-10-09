<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Insert an admin user
        DB::table('users')->insert([
            'name' => 'admin', // Admin name
            'email' => 'admin@gmail.com', // Admin email
            'password' => Hash::make('admin123'), // Hashed password
            'role' => 1 // Set role as admin (1)
        ]);

        // Optionally, add a regular user
        DB::table('users')->insert([
            'name' => 'Regular User', // Regular user's name
            'email' => 'user@example.com', // Regular user email
            'password' => Hash::make('user123'), // Hashed password
            'role' => 0 // Set role as user (0)
        ]);
    }
}
