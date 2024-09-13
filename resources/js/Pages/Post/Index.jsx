import MagnifyingGlass from "@/Components/icons/MaginfyingGlass";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage,useForm } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useMemo, useState,useRef } from "react";
import { useInView } from "react-intersection-observer";

export default function Index({ auth, posts }) {
    
    const { ref, inView } = useInView({});
    const [postsData, setPostsData] = useState(posts.data);
    const [path, setPath] = useState(posts.meta.path);
    const [nextCursor, setNextCursor] = useState(posts.meta.next_cursor);

    useEffect(() => {
        if (inView && nextCursor !== null) {
            axios.get(`${path}?cursor=${nextCursor}`).then((response) => {
                setPostsData([...postsData, ...response.data.data]);
                setNextCursor(response.data.meta.next_cursor);
            });
        }
    }, [inView]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Post List 1
                </h2>
            }
        >
            <Head title="Posts List 1" />
            
            <div className="bg-gray-100 py-10">
                <div className="mx-auto max-w-7xl">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                <h1 className="text-xl font-semibold text-gray-900">
                                    Posts 1
                                </h1>
                                <p className="mt-2 text-sm text-gray-700">
                                    A list of all the Posts 1.
                                </p>
                            </div>

                        </div>

                        <div className="max-w-2xl mx-auto my-12 space-y-12">
                            {postsData.map((post) => {
                                return (
                                    <div key={post.id}>
                                        <h1 className="font-bold text-3xl">
                                            {post.id}: {post.title}
                                        </h1>
                                        <p className="mt-2 text-lg">{post.teaser}</p>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="-translate-y-32" ref={ref}></div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}