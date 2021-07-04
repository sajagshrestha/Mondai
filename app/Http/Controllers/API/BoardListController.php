<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\ResponseController;
use App\Http\Requests\BoardListRequest;
use App\Http\Resources\BoardListResource;
use App\Models\Board;
use App\Models\BoardList;
use Illuminate\Http\Request;

class BoardListController extends ResponseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Board $board)
    {
        $boardLists = $board->lists;
        return $this->responseSuccess('',[BoardListResource::collection($boardLists)]);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(BoardListRequest $request)
    {
        $boardLists = BoardList::create($request->all());
        return $this->responseSuccess('',[BoardListResource::collection($boardLists)]);

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
        $boardList->update($request->all());
        return $this->responseSuccess('',[new BoardListResource($boardList)]);

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
}
