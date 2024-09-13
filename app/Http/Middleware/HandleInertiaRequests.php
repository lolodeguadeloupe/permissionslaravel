<?php

namespace App\Http\Middleware;

use Inertia\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user =  $request?->user()?->load('roles.permissions');

        $permissions = [];

        if ($user) {
            if($user->roles){
                foreach ($user->roles as $role) {
                    foreach ($role->permissions as $singlePermission) {
                        $permissions[] = $singlePermission->title;
                    }
                }
            }
            if($user->permissions){
                foreach($user->permissions as $singlePermission){
                    $permissions[] = $singlePermission->title;
                }
            }
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
            ],
            'can' => $user ? collect($permissions)->unique()->map(function ($permission) {
                        return [$permission => true];
                    })->collapse()->toArray() : [],
        ];
    }
}
