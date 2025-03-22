<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateTaskRequest;
use App\Services\TaskService;
use Illuminate\Http\Request;
use App\Http\Requests\StoreTaskRequest; // Custom validation request

class TaskController extends Controller
{
    protected TaskService $taskService;

    // Dependency injection of TaskService
    public function __construct(TaskService $taskService)
    {
        $this->taskService = $taskService;
    }

    // Get all tasks
    public function index(Request $request)
    {

        $filters = $request->only(['search', 'status', 'due_date_from', 'due_date_to', 'sort_by', 'sort_order', 'per_page']);
        $tasks = $this->taskService->getTasks($filters);
        return response()->json($tasks, 200);
    }

    // Get a single task by ID
    public function show($id)
    {
        $task = $this->taskService->getTaskById($id);
        return response()->json($task, 200);
    }

    // Create a new task
    public function store(StoreTaskRequest $request)
    {
        $task = $this->taskService->createTask($request->validated());
        return response()->json($task, 201);
    }

    // Update an existing task
    public function update(UpdateTaskRequest $request, $id)
    {
        $task = $this->taskService->updateTask($id, $request->validated());
        return response()->json($task, 200);
    }

    // Delete a task
    public function destroy($id)
    {
        $this->taskService->deleteTask($id);
        return response()->json(['message' => 'Task deleted successfully'], 200);
    }
}

