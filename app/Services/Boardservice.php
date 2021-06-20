<?php


namespace App\Services;


use App\Models\Board;
use App\Models\User;

class BoardService
{

    /**
     * @var Board
     */
    private $board;

    public function __construct(Board $board)
    {
        $this->board = $board;
    }

    public function nameExists($request, Board $except = null)
    {
        $user = $request->user();
        $board = $user->boards()->where('name', '=', $request->name)->first();
        if (isset($except)) {
            if ($except->id === $board->id)
                return false;
        }
        if ($board)
            return true;

        return false;
    }

    public function memberExists($request,Board $board)
    {
        $user = User::find($request->user_id);
        if($board->member()->where('user_id',$request->user_id)->exists())
            return true;
        else
            return false;
    }
}
