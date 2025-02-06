<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('admins', function (Blueprint $table) {
            $table->id();
            $table->foreignId("user_id")->constrained("users")->onDelete("cascade");
            $table->string("full_name");
            $table->string("phone")->unique()->nullable();
<<<<<<< HEAD
            $table->string("picture")->nullable();
=======
            $table->string("profile_picture")->nullable();
>>>>>>> 07e4fd3f5cf32d7a57adeca77302c28c1daee1aa
            $table->string("username")->unique()->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admins');
    }
};
