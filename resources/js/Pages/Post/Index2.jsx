import MagnifyingGlass from "@/Components/icons/MaginfyingGlass";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage,useForm } from "@inertiajs/react";
import { useEffect, useMemo, useState,useRef } from "react";
import { useInView } from "react-intersection-observer";
import PostsList from '@/Components/PostsList';
import axios from "axios";

export default function Index({ auth, posts }) {
    
    const page = usePage();
    const [postsData, setPostsData] = useState([]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Post List 2
                </h2>
            }
        >
        <Head title="Posts List 2" />
        <div className="bg-gray-100 py-10">
            <div className="mx-auto max-w-7xl">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-xl font-semibold text-gray-900">
                                Posts 2
                            </h1>
                            <p className="mt-2 text-sm text-gray-700">
                                A list of all the Posts 2.
                            </p>
                        </div>
                    </div>
                    <PostsList initialPosts={posts}/>
                </div>
            </div>
        </div>
        </AuthenticatedLayout>
    );
}