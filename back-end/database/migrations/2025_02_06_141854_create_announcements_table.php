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
<<<<<<< HEAD
            $table->foreignId("admin_id")->constrained("admin")->onDelete("cascade");
            $table->enum("receiver", ["students", "teachers"]);
=======
            $table->foreignId("admin_id")->constrained("admins")->onDelete("cascade");
            $table->enum("receiver",["students","teachers"]);
>>>>>>> 07e4fd3f5cf32d7a57adeca77302c28c1daee1aa
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
