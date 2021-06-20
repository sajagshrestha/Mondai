<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BoardMemberResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'user' => [
                'id' => $this->member->id,
                'name' => $this->member->name,
                'role' =>$this->role
            ],
            'created_at' => $this->created_at->diffForHumans(),
        ];
    }
}
