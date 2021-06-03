<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $repositories = [
            'Board',
        ];
        foreach ($repositories as $repository){
            $this->app->bind(
                "App\\Repositories\\{$repository}\\{$repository}RepositoryInterface",
                "App\\Repositories\\{$repository}\\{$repository}Repository",
            );
        }
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
