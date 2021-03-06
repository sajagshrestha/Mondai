<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'label',
        'due_date',
        'board_list_id',
        'user_id',
        'assignee_id',
        'position',
    ];
    public function list()
    {
        return $this->belongsTo(BoardList::class,'board_list_id');
    }

    public function assigned_to()
    {
        return $this->belongsTo(User::class,'assignee_id');
    }

    public function creator(){
        return $this->belongsTo(User::class,'user_id');
    }
}
