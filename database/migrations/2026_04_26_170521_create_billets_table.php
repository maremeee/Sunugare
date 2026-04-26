<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('billets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('voyage_id')->constrained('voyages')->onDelete('cascade');
            $table->foreignId('passager_id')->constrained('passagers')->onDelete('cascade');
            $table->string('numero_billet')->unique();
            $table->decimal('prix_paye', 10, 2);
            $table->string('qr_code')->unique();
            $table->enum('statut', ['reserve', 'confirme', 'annule'])->default('reserve');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('billets');
    }
};