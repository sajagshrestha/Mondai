<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\BoardRequest;
use App\Http\Resources\BoardResource;
use App\Jobs\BoardJob;
use App\Models\Board;
use App\Services\BoardService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BoardController extends ResponseController
{


    /**
     * @var BoardService
     */
    private $boardService;

    public function __construct(BoardService $boardService)
    {
        $this->middleware('auth:sanctum');
        $this->boardService = $boardService;
    }

    public function index(): JsonResponse
    {
        $user = Auth::user();
        return $this->responseSuccess("success", BoardResource::collection($user->boards));
    }

    public function store(BoardRequest $request): JsonResponse
    {
        $user = $request->user();
        $query = $user->boards();
        if ($this->boardService->nameExists($request,$query)) {
            return $this->responseUnprocessable([
                'name' => ['Project already exists. Please select another name'],
            ]);
        }
        $request->request->add(['user_id' => $user->id]);
        $board = Board::create($request->all());
        $board->members()->attach($user,['role' => 'owner']);
        $boardCreateJob = new BoardJob($user,$board);
        $this->dispatch($boardCreateJob);
        return $this->responseResourceCreated('Successfully created board', [new BoardResource($board)]);
    }

    public function show(Board $board)
    {
        return $this->responseSuccess('', [new BoardResource($board)]);
    }

    public function update(Board $board, BoardRequest $request)
    {
        $user = $request->user();
        $query = $user->boards();
        if ($this->boardService->nameExists($request,$query,$board)) {
            return $this->responseUnprocessable([
                'name' => ['Project name already exists. Please select another name'],
            ]);
        }
        $board->update($request->only('name', 'description'));
        return $this->responseResourceUpdated('Successfully updated board');
    }

    public function destroy(Board $board)
    {
        $board->delete();
        return $this->responseResourceDeleted('Successfully deleted board');
    }

    
}
