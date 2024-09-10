<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Classes;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use App\Http\Resources\ClassResource;
use Illuminate\Contracts\Cache\Store;
use App\Http\Resources\ClassesResource;
use App\Http\Resources\StudentResource;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        Gate::authorize('student_access');

        $students = Student::search($request)->paginate(10);
        $classes = ClassResource::collection(Classes::all());

        return Inertia::render('Student/Index', [
            'students' => StudentResource::collection($students),
            'classes' => $classes,
            'class_id' => optional($request->class_id),
            'search' => optional($request->search),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('student_create');
        $classes = ClassResource::collection(Classes::all());
        return Inertia::render('Student/Create', [
            'classes' => $classes,
        ]);
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentRequest $request)
    {
       Gate::authorize('student_create');
       Student::create($request->validated());
       return redirect()->route('students.index');
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
    public function edit(Student $student)
    {
        Gate::authorize('student_edit');
        $classes = ClassResource::collection(Classes::all());
        return Inertia::render('Student/Edit', [
            'student' => StudentResource::make($student),
            'classes' => $classes,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudentRequest $request, Student $student)
    {
        Gate::authorize('student_edit');
        $student->update($request->validated());
        return redirect()->route('students.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        Gate::authorize('student_delete');
        $student->forceDelete();
        return redirect()->route('students.index');
    }

    
}
