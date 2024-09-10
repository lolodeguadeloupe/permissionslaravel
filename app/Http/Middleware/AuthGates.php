<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Pest\Plugins\Parallel\Handlers\Pest;
use Symfony\Component\HttpFoundation\Response;

class AuthGates
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request?->user()?->load('roles.permissions');

        $permissions = [];

        if ($user) {
            foreach ($user->roles as $role) {
                Log::info($role->permissions);
                foreach ($role->permissions as $singlePermission) {
                    Log::info($singlePermission->title);
                    $permissions[] = $singlePermission->title;
                }
            }

            collect($permissions)->unique()->map(function ($permission) {
                Gate::define($permission, function () {
                    return true;
                });
            });
        }
        
        return $next($request);
    }
}
