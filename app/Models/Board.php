<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Board extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description'];

    public function creator()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function member()
    {
        return $this->hasMany(BoardMember::class);
    }
}
