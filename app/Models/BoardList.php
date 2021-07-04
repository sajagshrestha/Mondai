<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BoardList extends Model
{
    use HasFactory;
    protected $fillable = [
        'board_id',
        'name',
        'description',
        'position',
    ];

    public function board()
    {
        $this->belongsTo(Board::class);
    }
}
