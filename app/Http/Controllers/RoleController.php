<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Inertia\Inertia;
use App\Models\Permission;
use Illuminate\Http\Request;
use App\Http\Resources\RoleResource;
use Illuminate\Support\Facades\Gate;
use App\Http\Requests\UpdateRoleRequest;
use App\Http\Resources\PermissionResource;

class RoleController extends Controller
{
    public function index()
    {
        Gate::authorize('role_access');
        $roles = Role::paginate(10);
        return Inertia::render('Role/Index', [
            'roles' =>RoleResource::collection($roles),
        ]);
    }

     /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role)
    {
        Gate::authorize('role_edit');
        $permissions = Permission::all();
        return Inertia::render('Role/Edit', [
            'role' => RoleResource::make($role->load('permissions')),
            'permissions' => PermissionResource::collection($permissions),
        ]);
    }

     /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('role_create');
        $permissions = Permission::all();
        return Inertia::render('Role/Create', [
            'permissions' => PermissionResource::collection($permissions),
        ]);
    }

     /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRoleRequest $request, Role $role)
    {
        Gate::authorize('role_edit');
        $role->update($request->validated());
        $permissions = collect($request->selectedPermissions)->map(function($permission){
            return $permission['value'];
        });
        $role->permissions()->sync($permissions);
        
        return redirect()->route('roles.index');
    }

    /**
     * Store a newly created resource in storage.
     */

    public function store(UpdateRoleRequest $request)
    {
        Gate::authorize('role_create');
        $role = Role::create($request->validated());
        $permissions = collect($request->selectedPermissions)->map(function($permission){
            return $permission['value'];
        });
        $role->permissions()->sync($permissions);

        return redirect()->route('roles.index');
    }

     /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        Gate::authorize('role_delete');
        $role->forceDelete();
        return redirect()->route('roles.index');
    }
}
