<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

//Route::get('/user', function (Request $request) {
//    return $request->user();
//})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->prefix('tasks')->group(function () {
    Route::get('/', [TaskController::class, 'index']); // Get all tasks
    Route::get('{id}', [TaskController::class, 'show']); // Get a single task
    Route::post('/', [TaskController::class, 'store']); // Create a task
    Route::put('{id}', [TaskController::class, 'update']); // Update a task
    Route::delete('{id}', [TaskController::class, 'destroy']); // Delete a task
});


