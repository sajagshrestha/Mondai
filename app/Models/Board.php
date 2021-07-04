<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Board extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'user_id'];

    public function creator()
    {
        return $this->belongsTo(User::class,'user_id');
    }

    public function members()
    {
        return $this->belongsToMany(User::class, 'board_member',  'board_id', 'user_id')->withTimestamps();
    }

    public function lists()
    {
        $this->hasMany(BoardList::class);
    }
}
