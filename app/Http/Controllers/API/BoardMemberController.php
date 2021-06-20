<?php

namespace App\Http\Controllers\API;

use App\Http\Resources\BoardMemberResource;
use App\Models\Board;
use App\Models\User;
use App\Services\BoardService;
use Illuminate\Http\Request;

use function PHPSTORM_META\type;

class BoardMemberController extends ResponseController
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
        return $this->responseSuccess(BoardMemberResource::collection($board->member));
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Board $board)
    {
        $this->validate($request, [
            'user_id' => 'required|exists:users,id'
        ]);
        if ($this->boardService->memberExists($request, $board)) {
            return $this->responseUnprocessable([
                'error' => 'Member already exists',
            ]);
        }
        $board->member()->create([
            'user_id' => $request->user_id,
        ]);
        return $this->responseResourceCreated('Successfully created board', BoardMemberResource::collection($board->member));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Board $board,Request $request)
    {
        $this->validate($request,[
            'user_id' => 'required|exists:users,id'
        ]);
        $board->member()->where('user_id',$request->user_id)->delete();
        return $this->responseResourceDeleted('Successfully removed user from the project');
    }
}
