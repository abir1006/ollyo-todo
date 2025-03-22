<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTaskRequest extends FormRequest
{
    public function authorize()
    {
        return true; // You can implement permission logic here if needed
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'status' => 'required|in:To Do,In Progress,Done',
            'due_date' => 'nullable|date|after:today',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Task name is required.',
            'description.required' => 'Task description is required.',
            'status.required' => 'Task status is required.',
            'due_date.after' => 'The due date must be a future date.',
        ];
    }
}
