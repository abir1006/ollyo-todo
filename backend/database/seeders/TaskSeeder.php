<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Task;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $statuses = ['To Do', 'In Progress', 'Done'];

        DB::table('tasks')->truncate(); // Optional: Clears table before seeding

        for ($i = 1; $i <= 1000; $i++) { // Change 100 to any number for bulk data
            Task::create([
                'name' => $faker->sentence(3), // Generates a random task name
                'description' => $faker->paragraph(2), // Generates a random description
                'status' => $statuses[array_rand($statuses)], // Random status
                'due_date' => $faker->dateTimeBetween('now', '+3 months'), // Random future due date
            ]);
        }
    }
}
