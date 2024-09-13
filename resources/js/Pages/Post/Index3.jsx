import MagnifyingGlass from "@/Components/icons/MaginfyingGlass";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage,useForm } from "@inertiajs/react";
import { useEffect, useMemo, useState,useRef } from "react";
import { useInView } from "react-intersection-observer";

export default function Index({ auth, posts }) {
    
    const page = usePage();

    const [searchTerm, setSearchTerm] = useState( "");
    const [inputValue, setInputValue] = useState( "");
    const [pageNumber, setPageNumber] = useState("");
   
    const { ref, inView, entry } = useInView({});
    const [postsData, setPostsData] = useState([]);

    
    //Initialiser pour éviter rechargement continu
    const isInitialRender = useRef(true);

    let studentsUrl = useMemo(() => {
        const url = new URL(route("posts.index"));

        url.searchParams.append("page", pageNumber);
        
        if(searchTerm){
            url.searchParams.append("search", searchTerm);
        }

        return url.toString();
    }, [searchTerm,pageNumber]);


   useEffect(() => {
        if(isInitialRender.current){
            isInitialRender.current = false;
            return;
        }

        router.visit(studentsUrl,{
            preserveScroll: true,
            preserveState: true,
        });
   },[studentsUrl])

   useEffect(() => {
    
        if (inputValue.length == 0) {
            setSearchTerm("");
            return;
        }

        const handler = setTimeout(() => {
        setSearchTerm(inputValue);
        setPageNumber("1");
        }, 500);

        return () => clearTimeout(handler);

   }, [inputValue]);

    const updatedPageNumber = (link) => {
       setPageNumber(link.url.split("=")[1]);
    };

    useEffect(() => {
           if(inView){
              router.reload({
                  preserveScroll: true,
                  preserveState: true,
                  data: {
                      page: posts.meta.current_page +1,
                      
                  },
                  onSuccess: () => {
                     setPostsData([...postsData,...posts.data]);
                  },
              });
           }
        console.log(posts);
    }, [inView]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Post List
                </h2>
            }
        >
            <Head title="Posts List" />

            <div className="bg-gray-100 py-10">
                <div className="mx-auto max-w-7xl">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                <h1 className="text-xl font-semibold text-gray-900">
                                    Posts
                                </h1>
                                <p className="mt-2 text-sm text-gray-700">
                                    A list of all the Posts.
                                </p>
                            </div>

                             <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                                    <Link
                                        href={route("posts.create")}
                                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                                    >
                                        Add Post
                                    </Link>
                            </div>
                        </div>

                        <div className="flex flex-col justify-start sm:flex-row mt-6">
                            <div className="relative text-sm text-gray-800 col-span-3">
                                <div className="absolute pl-2 left-0 top-0 bottom-0 flex items-center pointer-events-none text-gray-500">
                                    <MagnifyingGlass />
                                </div>
                                <input
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Search posts data..."
                                    id="search"
                                    className="block rounded-lg border-0 py-2 pl-10 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
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
                        <div ref={ref}></div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}