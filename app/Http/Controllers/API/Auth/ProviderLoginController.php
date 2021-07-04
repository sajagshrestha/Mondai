<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\API\ResponseController;
use App\Models\User;
use GuzzleHttp\Exception\ClientException;
use Laravel\Socialite\Facades\Socialite;

class ProviderLoginController extends ResponseController
{
    public function redirectToProvider($provider)
    {
        $validated = $this->validateProvider($provider);
        if (!is_null($validated)) {
            return $validated;
        }

        return Socialite::driver($provider)->stateless()->redirect();
    }

    /**
     * Obtain the user information from Provider.
     *
     * @param $provider
     * @return JsonResponse
     */
    public function handleProviderCallback($provider)
    {
        $validated = $this->validateProvider($provider);
        if (!is_null($validated)) {
            return $validated;
        }
        try {
            $user = Socialite::driver($provider)->stateless()->user();
        } catch (ClientException $exception) {
            return response()->json(['error' => 'Invalid credentials provided.'], 422);
        }

        $userCreated = User::firstOrCreate(
            [
                'email' => $user->getEmail()
            ],
            [
                'email_verified_at' => now(),
                'name' => $user->getName(),
                'avatar' => $user->getAvatar(),
                'status' => true,
                'avatar' => $user->getAvatar()

            ]
        );
        $userCreated->providers()->updateOrCreate(
            [
                'provider' => $provider,
                'provider_id' => $user->getId(),
            ],
        );
        $token = $userCreated->createToken('userAccessToken')->plainTextToken;
        return $this->responseResourceCreated('Lololgged in successfully', [
            'user' => [
                'id' => $userCreated->id,
                'name' => $userCreated->name,
                // 'avatar' =>
            ],
            'access_token' => $token
        ]);
    }

    /**
     * @param $provider
     * @return JsonResponse
     */
    protected function validateProvider($provider)
    {
        $providers = [
            // 'facebook',
            // 'github',
            'google',
        ];
        if (!in_array($provider, $providers)) {
            return $this->responseUnprocessable(['error' => 'Please login using Google']);;
        }
    }
}
