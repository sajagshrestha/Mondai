<?php

namespace App\Http\Controllers\API;

use App\Models\Board;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;

class BoardMemberController extends ResponseController
{

    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Board $board)
    {
        return $this->responseSuccess($board->members);
    }


    public function create(Board $board)
    {
        $invitaion = URL::signedRoute('member.store', ['board' => $board->id]);
        return $this->responseSuccess('',$invitaion);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Board $board)
    {
        if (! $request->hasValidSignature()) {
            return $this->responseUnprocessable([
                'error' => 'Invalid invitation',
            ]);
        }
        $user = $request->user();
        if ($board->members->contains($user->id)) {
            return $this->responseUnprocessable([
                'error' => 'Member already exists',
            ]);
        }
        $board->members()->attach($user, ['role' => 'member']);
        return $this->responseResourceCreated('Successfully added member', $board->member);
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
    public function destroy(Board $board, Request $request)
    {
        $this->validateUser($request);
        $board->member()->where('user_id', $request->user_id)->delete();
        return $this->responseResourceDeleted('Successfully removed user from the project');
    }

    private function validateUser($request)
    {
        $this->validate($request, [
            'user_id' => 'required|exists:users,id'
        ]);
    }
}
