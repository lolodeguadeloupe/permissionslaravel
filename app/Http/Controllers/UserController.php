<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Permission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Resources\RoleResource;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Gate;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\PermissionResource;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        Gate::authorize('user_access');
        $users = User::search($request)->paginate(10);
        return Inertia::render('User/Index', [
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        Gate::authorize('user_edit');
        $user->load('roles','permissions');
        return Inertia::render('User/Edit', [
            'user' => UserResource::make($user),
            'allPermissions' => PermissionResource::collection(Permission::all()),
            'allRoles' => RoleResource::collection(Role::all()),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        Gate::authorize('user_edit');
        $user->load('permissions','roles');

        $user->update($request->validated());
        
        $permissions =[];
        if($request->selectedPermissions){
            $permissions = collect($request->selectedPermissions)->map(function($permission){
                return $permission['value'];
            })->toArray();
        } 
        $user->permissions()->sync($permissions);

        $roles = [];
        if($request->selectedRoles){
            $roles = collect($request->selectedRoles)->map(function($role){
                return $role['value'];
            })->toArray();
        } 
        $user->roles()->sync($roles);

        return redirect()->route('users.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        Gate::authorize('user_delete');
        $user->forceDelete();
        return redirect()->route('users.index');
    }
}
