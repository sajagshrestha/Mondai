<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [App\Http\Controllers\API\Auth\RegisterController::class, 'register']);
Route::post('/login', [App\Http\Controllers\API\Auth\LoginController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [App\Http\Controllers\API\Auth\LoginController::class, 'logout']);

Route::get('login/{provider}', [App\Http\Controllers\API\Auth\ProviderLoginController::class, 'redirectToProvider']);
Route::get('login/{provider}/callback', [App\Http\Controllers\API\Auth\ProviderLoginController::class, 'handleProviderCallback']);


Route::resource('boards', App\Http\Controllers\API\BoardController::class)->except(['create', 'edit']);
