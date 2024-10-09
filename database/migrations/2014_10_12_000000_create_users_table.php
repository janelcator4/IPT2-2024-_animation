<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // User's name
            $table->string('email')->unique(); // Unique email address
            $table->string('password'); // User's hashed password
            $table->tinyInteger('role')->default(0); // User role, 0 for user, 1 for admin
            $table->timestamps(); // Created at and updated at timestamps
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
}
