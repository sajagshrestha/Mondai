<?php


namespace App\Services;


use App\Models\Board;

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
}
