<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Task;
use Laravel\Sanctum\Sanctum;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskApiTest extends TestCase
{
    use RefreshDatabase;  // Resets the database after each test

    /**
     * Test the API returns tasks for authenticated user.
     */
    public function test_authenticated_user_can_fetch_tasks()
    {
        // Create a user and authenticate via Sanctum
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        // Create a task as logged in user
        $task = Task::factory()->create([
            'name' => 'Sample Task',
            'description' => 'This is a test task.',
            'status' => 'To Do',
            'due_date' => now()->addDays(3),
        ]);

        // Make an API call to fetch tasks
        $response = $this->getJson('/api/tasks');

        // Assert the response is successful and contains the task
        $response->assertStatus(200)
            ->assertJsonFragment([
                'name' => 'Sample Task',
                'description' => 'This is a test task.',
            ]);
    }

    /**
     * Test unauthenticated users cannot fetch tasks.
     */
    public function test_unauthenticated_user_cannot_fetch_tasks()
    {
        // Try to access the API without being authenticated
        $response = $this->getJson('/api/tasks');

        // Assert the response status is 401 (unauthorized)
        $response->assertStatus(401);
    }

    /**
     * Test authenticated user can create a task.
     */
    public function test_authenticated_user_can_create_task()
    {
        // Create a user and authenticate via Sanctum
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        // Create task data
        $taskData = [
            'name' => 'New Task',
            'description' => 'Description of the new task.',
            'status' => 'To Do',
            'due_date' => now()->addDays(5),
        ];

        // Make a POST request to create a task
        $response = $this->postJson('/api/tasks', $taskData);

        // Assert the response is successful and the task is created
        $response->assertStatus(201)
            ->assertJsonFragment([
                'name' => 'New Task',
                'description' => 'Description of the new task.',
            ]);

        // Assert the task is saved in the database
        $this->assertDatabaseHas('tasks', [
            'name' => 'New Task',
            'description' => 'Description of the new task.',
        ]);
    }

    /**
     * Test authenticated user can update a task.
     */
    public function test_authenticated_user_can_update_task()
    {
        // Create a user and authenticate via Sanctum
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        // Create a task for the user
        $task = Task::factory()->create([
            'name' => 'New Task',
            'description' => 'Description of the new task.',
            'status' => 'To Do',
            'due_date' => now()->addDays(5),
        ]);

        // New data for the task
        $updatedData = [
            'status' => 'In Progress',
        ];

        // Make a PUT request to update the task
        $response = $this->putJson("/api/tasks/{$task->id}", $updatedData);

        // Assert the task status is updated
        $response->assertStatus(200)
            ->assertJsonFragment([
                'status' => 'In Progress',
            ]);

        // Assert the task is updated in the database
        $this->assertDatabaseHas('tasks', [
            'id' => $task->id,
            'status' => 'In Progress',
        ]);
    }

    /**
     * Test authenticated user can delete a task.
     */
    public function test_authenticated_user_can_delete_task()
    {
        // Create a user and authenticate via Sanctum
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        // Create a task for the user
        $task = Task::factory()->create([
            'name' => 'New Task',
            'description' => 'Description of the new task.',
            'status' => 'To Do',
            'due_date' => now()->addDays(5),
        ]);

        // Make a DELETE request to delete the task
        $response = $this->deleteJson("/api/tasks/{$task->id}");

        // Assert the task is deleted
        $response->assertStatus(200);

        // Assert the task is no longer in the database
        $this->assertDatabaseMissing('tasks', [
            'id' => $task->id,
        ]);
    }
}
