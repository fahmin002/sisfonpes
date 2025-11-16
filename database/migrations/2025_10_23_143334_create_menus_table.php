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
Schema::create('menus', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Nama menu, misalnya: "Beranda"
            $table->string('slug')->unique()->nullable(); // Slug URL-friendly, misalnya: "beranda"
            $table->string('url')->nullable(); // Link yang dituju, bisa internal / eksternal
            $table->unsignedBigInteger('parent_id')->nullable(); // untuk submenu
            $table->integer('order')->default(0); // urutan tampil
            $table->boolean('is_active')->default(true); // aktif atau tidak
            // $table->foreignId('page_id')->nullable()->constrained('pages')->onDelete('set null');
            $table->timestamps();

            // Relasi ke parent menu
            // $table->foreign('parent_id')->references('id')->on('menus')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menus');
    }
};
