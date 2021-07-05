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

    public function nameExists($request, $query,$except = null)
    {
        $user = $request->user();
        $row = $query->where('name', '=', $request->name)->first();
        if (isset($except) && isset($row)) {
            if ($except->id === $row->id)
                return false;
        }
        if ($row)
            return true;

        return false;
    }
}
