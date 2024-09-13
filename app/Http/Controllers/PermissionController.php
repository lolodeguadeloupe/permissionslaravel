<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Permission;
use Illuminate\Http\Request;
use Illuminate\Contracts\Cache\Store;
use App\Http\Resources\PermissionResource;
use App\Http\Requests\StorePermissionRequest;

class PermissionController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $permissionquery = Permission::query();
        
        if($request->search){
            $permissionquery->where('title', 'LIKE', "%" . $request->search . "%");
        }
        $permissions = $permissionquery->paginate(10);
        
        return Inertia::render('Permission/Index', [
            'permissions' =>PermissionResource::collection($permissions),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Permission/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePermissionRequest $request)
    {
        Permission::create($request->validated());
        return redirect()->route('permissions.index');
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
    public function edit(Permission $permission)
    {
        return Inertia::render('Permission/Edit', ['permission' => PermissionResource::make($permission)]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(StorePermissionRequest $request, Permission $permission)
    {
        $permission->update($request->validated());
        return redirect()->route('permissions.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Permission $permission)
    {
        $permission->forceDelete();
        return redirect()->route('permissions.index');
    }

    /**
     * Restore the specified resource from storage.
     */
    public function restore(Permission $permission) 
    {
        //
    }
}
