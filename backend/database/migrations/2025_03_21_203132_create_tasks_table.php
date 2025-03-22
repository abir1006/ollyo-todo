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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id()->comment("Primary key");
            $table->string('name')->comment("Task title");
            $table->text('description')->comment("Task details");
            $table->enum('status', ['To Do', 'In Progress', 'Done'])->comment("Task progress");
            $table->timestamp('due_date')->nullable()->comment("Task deadline");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
