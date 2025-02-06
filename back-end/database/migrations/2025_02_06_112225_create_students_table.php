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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->foreignId("user_id")->constrained("users")->onDelete("cascade");
            $table->foreignId("class_id")->constrained("classes")->onDelete("cascade");
            $table->string("full_name");
            $table->date("date_of_birth")->nullable();
            $table->enum("gender",["female","male"]);
            $table->string("address")->nullable();
            $table->string("phone")->unique()->nullable();
            $table->string("username")->unique()->nullable();
            $table->string("profile_picture")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
