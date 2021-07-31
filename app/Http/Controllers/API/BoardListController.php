<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\ResponseController;
use App\Http\Requests\BoardListRequest;
use App\Http\Resources\BoardListResource;
use App\Models\Board;
use App\Models\BoardList;
use App\Models\Card;
use App\Services\BoardService;
use Illuminate\Http\Request;

class BoardListController extends ResponseController
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


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Board $board)
    {
        $boardLists = $board->lists()->with('cards')->orderBy('position','asc')->get();
        return $this->responseSuccess('',BoardListResource::collection($boardLists));
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(BoardListRequest $request, Board $board)
    {
        $query = $board->lists();
        if ($this->boardService->nameExists($request, $query)) {
            return $this->responseUnprocessable([
                'name' => ['List already exists. Please select another name'],
            ]);
        }
        $boardList = $board->lists()->create($request->all());
        return $this->responseSuccess('Successfully created list', [new BoardListResource($boardList)]);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\BoardList  $boardList
     * @return \Illuminate\Http\Response
     */
    public function update(BoardListRequest $request, BoardList $boardList)
    {
        $board = $boardList->board;
        $query = $board->lists();
        if ($this->boardService->nameExists($request, $query,$boardList)) {
            return $this->responseUnprocessable([
                'name' => ['List already exists. Please select another name'],
            ]);
        }
        $boardList->update($request->all());
        return $this->responseSuccess('', [new BoardListResource($boardList)]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\BoardList  $boardList
     * @return \Illuminate\Http\Response
     */
    public function destroy(BoardList $boardList)
    {
        $boardList->delete();
        return $this->responseResourceDeleted('Successfully removed list from the project');
    }


    public function reorder(Request $request)
    {
        foreach($request->reorderArray as $index => $reorderArray)
        {
            $listId = array_key_first($reorderArray);
            $list = BoardList::findOrFail($listId);
            $list->update([
                'position' => $index,
            ]);

            foreach($reorderArray[$listId] as $index => $cardId)
            {
                $card = Card::findOrFail($cardId);
                $card->update([
                    'position' => $index,
                ]);
            }
        }

        return $this->responseSuccess();
    }
}
