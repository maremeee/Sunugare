<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('passagers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('cni')->unique();
            $table->string('prenom');
            $table->string('nom');
            $table->string('telephone');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('passagers');
    }
};