<?php


namespace App\Services;


use App\Models\Board;

class Boardservice
{

    /**
     * @var Board
     */
    private $board;

    public function __construct(Board $board)
    {
        $this->board = $board;

    }

    public function nameExists($request)
    {
        $user = $request->user();
        $boardNames = $user->boards()->where('name', '=', $request->name)->first();
        if ($boardNames) {
            return true;
        }
        return false;
    }
}
