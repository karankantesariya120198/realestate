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
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->string('name', 128);
            $table->string('real_state_type', 128)->comment("house, department, land, commercial_ground");
            $table->string('street', 128);
            $table->string('external_number', 12);
            $table->string('internal_number', 12)->nullable();
            $table->string('neighborhood', 128);
            $table->string('city', 64);
            $table->string('country', 2);
            $table->integer('rooms');
            $table->integer('bathrooms')->default(0);
            $table->string('comments', 128)->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
