<?php

namespace App\Services;

use App\Models\Task;
use Carbon\Carbon;

class TaskService
{
    // Create a new task
    public function createTask(array $data)
    {
        return Task::create([
            'name' => $data['name'],
            'description' => $data['description'],
            'status' => $data['status'],
            'due_date' => Carbon::parse($data['due_date']),
        ]);
    }

    // Get all tasks

    /**
     * Fetch tasks with search and filtering
     *
     * @param array $filters
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function getTasks(array $filters)
    {
        $query = Task::query();

        // Search by name
        if (!empty($filters['search'])) {
            $query->where('name', 'LIKE', '%' . $filters['search'] . '%');
        }

        // Filter by status (To Do, In Progress, Done)
        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        // Filter by due date range
        if (!empty($filters['due_date_from']) && !empty($filters['due_date_to'])) {
            $query->whereBetween('due_date', [$filters['due_date_from'], $filters['due_date_to']]);
        }

        // Sorting (default: created_at DESC)
        $sortBy = $filters['sort_by'] ?? 'created_at';
        $sortOrder = $filters['sort_order'] ?? 'desc';
        $query->orderBy($sortBy, $sortOrder);

        // Paginate results (default: 10 items per page)
        return $query->paginate($filters['per_page'] ?? 10);
    }

//    public function getAllTasks()
//    {
//        return Task::all();
//    }

    // Get a task by ID
    public function getTaskById($id)
    {
        return Task::findOrFail($id);
    }

    // Update a task
    public function updateTask($id, array $data)
    {
        $task = Task::findOrFail($id);
        $task->update($data);
        return $task;
    }

    // Delete a task
    public function deleteTask($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();
        return $task;
    }
}
