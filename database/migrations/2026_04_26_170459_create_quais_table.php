<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('quais', function (Blueprint $table) {
            $table->id();
            $table->string('numero')->unique();
            $table->foreignId('destination_id')->constrained('destinations')->onDelete('cascade');
            $table->enum('statut', ['libre', 'occupe', 'ferme'])->default('libre');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quais');
    }
};