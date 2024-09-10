<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Resources\PostResource;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::paginate(10);
        return Inertia::render('Post/Index',['posts' =>PostResource::collection($posts)]);
    }

    public function index2()
    {
        $posts = Post::paginate(10);
        return Inertia::render('Post/Index',['posts' =>PostResource::collection($posts)]);
    }

    public function loadMore(Request $request)
    {
        $page = $request->input('page', 1);
        $posts = Post::latest()->paginate(10, ['*'], 'page', $page);
        
        return response()->json($posts);
    }
}
