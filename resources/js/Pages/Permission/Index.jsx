import MagnifyingGlass from "@/Components/icons/MaginfyingGlass";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage,useForm } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { useEffect, useMemo, useState,useRef } from "react";

export default function Index({ auth, permissions}) {
    const page = usePage();

    const [searchTerm, setSearchTerm] = useState( "");
    const [inputValue, setInputValue] = useState( "");
    const [pageNumber, setPageNumber] = useState("");
    
    //Initialiser pour éviter rechargement continu
    const isInitialRender = useRef(true);

    let studentsUrl = useMemo(() => {
        const url = new URL(route("permissions.index"));

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
            setPageNumber("1");
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

    function deleteRole(id) {
        if (confirm("Are you sure you want to delete this role?")) {
            router.delete(route("permissions.destroy", id), {
                preserveScroll: true,
            });
        }
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Role List
                </h2>
            }
        >
            <Head title="Permissions List" />

            <div className="bg-gray-100 py-10">
                <div className="mx-auto max-w-7xl">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                <h1 className="text-xl font-semibold text-gray-900">
                                    permissions
                                </h1>
                                <p className="mt-2 text-sm text-gray-700">
                                    A list of all the permissions.
                                </p>
                            </div>

                            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                                    <Link
                                        href={route("permissions.create")}
                                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                                    >
                                        Add Permission
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
                                    placeholder="Search permissions data..."
                                    id="search"
                                    className="block rounded-lg border-0 py-2 pl-10 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col">
                            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg relative">
                                        <table className="min-w-full divide-y divide-gray-300">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                                    >
                                                        ID
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                                    >
                                                        Title
                                                    </th>
                                                
                                                    <th
                                                        scope="col"
                                                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                                                    />
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                {permissions.data.map(
                                                    (role) => {
                                                        return (
                                                            <tr
                                                                key={role.id}
                                                            >
                                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                                    {role.id}
                                                                </td>
                                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                                    {
                                                                        role.title
                                                                    }
                                                                </td>
                                                                

                                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                                        <Link
                                                                            href={route(
                                                                                "permissions.edit",
                                                                                role.id
                                                                            )}
                                                                            className="text-indigo-600 hover:text-indigo-900"
                                                                        >
                                                                            Edit
                                                                        </Link>
                                                                        <button
                                                                            onClick={() => deleteRole(role.id)}
                                                                            className="ml-2 text-indigo-600 hover:text-indigo-900"
                                                                        >
                                                                            Delete
                                                                        </button>
                                                                
                                                                </td>
                                                            </tr>
                                                        );
                                                    }
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-7 flex-1"><Pagination meta={permissions.meta} updatedPageNumber={updatedPageNumber} /></div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}