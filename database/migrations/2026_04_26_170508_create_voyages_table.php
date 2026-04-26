<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('voyages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vehicule_id')->constrained('vehicules')->onDelete('cascade');
            $table->foreignId('quai_id')->constrained('quais')->onDelete('cascade');
            $table->foreignId('destination_id')->constrained('destinations')->onDelete('cascade');
            $table->foreignId('regulateur_id')->constrained('users')->onDelete('cascade');
            $table->dateTime('heure_depart');
            $table->dateTime('heure_arrivee')->nullable();
            $table->integer('places_disponibles');
            $table->enum('statut', ['en_attente', 'en_cours', 'termine', 'annule'])->default('en_attente');
            $table->integer('position_rotation');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('voyages');
    }
};