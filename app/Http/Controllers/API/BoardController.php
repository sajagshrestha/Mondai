<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\BoardRequest;
use App\Http\Resources\BoardResource;
use App\Models\Board;
use App\Services\Boardservice;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class BoardController extends ResponseController
{


    /**
     * @var Boardservice
     */
    private $boardService;

    public function __construct(Boardservice $boardService)
    {
        $this->middleware('auth:sanctum');
        $this->boardService = $boardService;
    }

    public function index(): JsonResponse
    {
        $user = Auth::user();
        $boards = [];
        if (!empty($user->boards)) $boards = $user->boards;
        return $this->responseSuccess("", BoardResource::collection($boards));
    }

    public function store(BoardRequest $request): JsonResponse
    {
        if ($this->boardService->nameExists($request)) {
            return $this->responseUnprocessable([
                'name' => ['Project already exists. Please select another name'],
            ]);
        }
        $user = $request->user();
        $board = $user->boards()->create($request->only('name', 'description'));
        return $this->responseResourceCreated('Successfully created board', [new BoardResource($board)]);
    }

    public function show(Board $board)
    {
        return $this->responseSuccess('', [new BoardResource($board)]);
    }

    public function update(Board $board, BoardRequest $request)
    {
        $board->update($request->only('name', 'description'));
    }

    public function destroy(Board $board)
    {
        $board->delete();
    }
}
