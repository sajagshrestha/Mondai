<?php

namespace App\Http\Controllers\API\Auth;


use App\Http\Controllers\API\ResponseController;
use Illuminate\Http\Request;

class LoginController extends ResponseController
{
    public function login(Request $request)
    {
        $this->validate($request,[
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (!auth()->attempt($request->only(['email','password']))) {
            return $this->responseUnauthorized();
        }
        $user = auth()->user();
        $token = $user->createToken('userAccessToken')->plainTextToken;

        return $this->responseResourceCreated('Logged in successfully', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
            ],
            'access_token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return $this->responseSuccess();
    }
}
