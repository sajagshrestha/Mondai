<?php

namespace App\Scopes;

use \Illuminate\Database\Eloquent\Builder;
use \Illuminate\Database\Eloquent\Scope;
use \Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class UserScope implements Scope {
	/**
	 * @inheritdoc
	 *
	 * @param Builder $builder
	 * @param Model $model
	 *
	 * @return Builder|void
	 */
	public function apply( Builder $builder, Model $model ) {
        $user = Auth::user();

        if($user)
        {
          return $builder->where('branch_id',$user->branch_id);
        }

        return null;
	}
}
