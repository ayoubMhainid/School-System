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
        Schema::create('announcements', function (Blueprint $table) {
            $table->id();
            $table->foreignId("admin_id")->constrained("admins")->onDelete("cascade");
<<<<<<< HEAD
            $table->enum("receiver", ["students", "teachers"]);
=======
            $table->enum("receiver",["students","teachers"]);
>>>>>>> 9299e8f6d3dc38b5b3a339b4f6ae271a4c413b92
            $table->string("title");
            $table->text("message");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('announcements');
    }
};
