<?php

namespace App\Jobs;

use App\Models\Board;
use App\Models\BoardList;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class BoardJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $user;
    protected $board;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(User $user,Board $board)
    {
        $this->user = $user;
        $this->board = $board;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->board->lists()->saveMany([
            new BoardList(['name' => 'Todo']),
            new BoardList(['name' => 'Doing']),
            new BoardList(['name' => 'Done']),
        ]);
    }
}
