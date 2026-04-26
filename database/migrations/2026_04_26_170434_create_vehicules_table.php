<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('vehicules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('chauffeur_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('type_vehicule_id')->constrained('type_vehicules')->onDelete('cascade');
            $table->string('immatriculation')->unique();
            $table->string('marque');
            $table->string('modele');
            $table->integer('annee');
            $table->enum('statut', ['actif', 'en_voyage', 'en_panne'])->default('actif');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vehicules');
    }
};