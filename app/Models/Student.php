<?php

namespace App\Models;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Student extends Model
{
    use HasFactory;
        protected $fillable = ['name','email','class_id','section_id'];
        protected $with = ['class','section'];

    public function class()
    {
        return $this->belongsTo(Classes::class,'class_id');
    }

    public function section()
    {
        return $this->belongsTo(Section::class);
    }

    public function scopeSearch(Builder $query, Request $request)
    {
        return $query
            ->where(function ($query) use ($request) {
                return $query->when($request->search, function ($query, $search) {
                    $query->where(function ($query) use ($search) {
                        $query->where('name', 'like', '%'.$search.'%')
                            ->orWhere('email', 'like', '%'.$search.'%');
                    });
                })
                ->when($request->class_id, function ($query, $class_id) {
                    $query->where('class_id', $class_id);
                });
            });
    }
}
