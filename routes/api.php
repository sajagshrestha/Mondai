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

Route::get('board-member/{board}',[App\Http\Controllers\API\BoardMemberController::class,'index'] );
Route::get('board-member/invite/{board}',[App\Http\Controllers\API\BoardMemberController::class,'create']);
Route::delete('board-member/{board}',[App\Http\Controllers\API\BoardMemberController::class,'destroy'] );


Route::post('board-list/reorder',[App\Http\Controllers\API\BoardListController::class,'reorder']);
Route::get('board-list/{board}',[App\Http\Controllers\API\BoardListController::class,'index']);
Route::post('board-list/{board}',[App\Http\Controllers\API\BoardListController::class,'store']);
Route::put('board-list/{boardList}',[App\Http\Controllers\API\BoardListController::class,'update']);
Route::delete('board-list/{boardList}',[App\Http\Controllers\API\BoardListController::class,'destroy']);

Route::get('card/{list}',[App\Http\Controllers\API\CardController::class,'index']);
Route::post('card/{list}',[App\Http\Controllers\API\CardController::class,'store']);
Route::get('board-list/card/{card}',[App\Http\Controllers\API\CardController::class,'show']);
Route::put('card/{card}',[App\Http\Controllers\API\CardController::class,'update']);
Route::delete('card/{card}',[App\Http\Controllers\API\CardController::class,'destroy']);

