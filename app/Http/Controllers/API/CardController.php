<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\CardRequest;
use App\Http\Resources\CardResource;
use App\Http\Resources\BoardListResource;
use App\Models\BoardList;
use App\Models\Card;

class CardController extends ResponseController
{


    public function __construct()
    {
        $this->middleware('auth:sanctum');

    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(BoardList $list)
    {
        $cards = $list->cards()->orderBy('position', 'asc')->get();
        return $this->responseSuccess('', CardResource::collection($cards));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(CardRequest $request,BoardList $list)
    {
        $user = $request->user();
        $card = $list->cards()->create([
            'title' => $request->title,
            'user_id' => $user->id
        ]);
        $lists =$list->board->lists()->with('cards')->orderBy('position','asc')->get();
        return $this->responseResourceCreated('Successfully created card',BoardListResource::collection($lists));
    }



    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Card  $card
     * @return \Illuminate\Http\Response
     */
    public function show(Card $card)
    {
        return $this->responseSuccess('',[new CardResource($card)]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Card  $card
     * @return \Illuminate\Http\Response
     */
    public function update(Card $card, CardRequest $request)
    {
        $list = $card->list;
        $card->update($request->all());
        $lists =$list->board->lists()->with('cards')->orderBy('position','asc')->get();
        return $this->responseSuccess('',BoardListResource::collection($lists));
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Card  $card
     * @return \Illuminate\Http\Response
     */
    public function destroy(Card $card)
    {
        $list = $card->list;
        $card->delete();
        $lists =$list->board->lists()->with('cards')->orderBy('position','asc')->get();
        return $this->responseSuccess('',BoardListResource::collection($lists));
    }
}
