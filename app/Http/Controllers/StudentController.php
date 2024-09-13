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

        if ($request->query('search')) {            
            $students = Student::search($request)->paginate(10);
        } 
        
        if ($request->query('class_id')) {            
            $students = Student::search($request)->paginate(10);
        } 

        $students = Student::search($request)->paginate(10);
        $classes = ClassResource::collection(Classes::all());

        return Inertia::render('Student/Index', [
            'students' => StudentResource::collection($students),
            'classes' => $classes,
            'class_id' => optional($request->class_id),
            'search' => optional($request->search),
        ]);
    }

    public function index2(Request $request)
    {
        
        $studentquery = Student::query();
        $classes = ClassResource::collection(Classes::all());
        

        
        $class_id = $request->query('class_id');
        

        $search = $request->query('search');
        $param = [
            'search' => $search ?? '',
            'class_id' => $class_id ?? '',
        ];
        
        if ($search ) {
            $studentquery = $this->applySearch($studentquery,$param);
        }

        if ($class_id) {
            $studentquery = $this->applySearch($studentquery,$param);
        }
        
        $students = StudentResource::collection($studentquery->latest()->paginate(5));

        return Inertia::render('Student/Index', [
            'students' => $students,
            'search' => $search ?? '',
            'classes' => $classes,
            'class_id' => $class_id ?? '',
        ]);
    }

    protected function applySearch($query, $param)
    {
        return $query->when($param['search'], function ($query, $search) {
                    $query->where(function ($query) use ($search) {
                        $query->where('name', 'like', '%'.$search.'%')
                            ->orWhere('email', 'like', '%'.$search.'%');
                    });
                })
                ->when($param['class_id'], function ($query, $class_id) {
                    $query->where('class_id', $class_id);
                });
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
