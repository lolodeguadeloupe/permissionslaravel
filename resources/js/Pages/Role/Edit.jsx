import InputError from "@/Components/InputError";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Select from 'react-select'

export default function Create({ auth,permissions,role }) {
    
    const options = permissions.data.map((permission) => {
        return {
            value: permission.id,
            label: permission.title,
        };
    });

    const defaultOptions = role.data.permissions.map((permission) => {
        return {
            value: permission.id,
            label: permission.title,
        };
    });

    const { data, setData, put, processing, errors } = useForm({
        title: role.data.title,
        selectedPermissions: [],
    });

    function submit(e) {
        e.preventDefault();
        put(
            route("roles.update", {
                role: role.data.id,
            })
        );
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create role
                </h2>
            }
        >
            <Head title="Create Role" />

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
                    <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-12">
                        <form onSubmit={submit}>
                            <div className="shadow sm:rounded-md sm:overflow-hidden">
                                <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                                    <div>
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                            Role Information
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Use this form to create a new
                                            Role.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="name"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                value={data.title}
                                                onChange={(e) =>
                                                    setData(
                                                        "title",
                                                        e.target.value
                                                    )
                                                }
                                                id="name"
                                                className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                                                    errors.title
                                                        ? "text-red-900 focus:ring-red-500 focus:border-red-500 border-red-300"
                                                        : ""
                                                }`}
                                            />
                                            <InputError message={errors.title} />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="permissions"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Permissions
                                            </label>
                                        <Select 
                                            isMulti 
                                            defaultValue={defaultOptions}
                                            options={options}
                                            onChange={(e) => setData("selectedPermissions", e)}
                                         />
                                        </div>
                                       
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <Link
                                        href={route("roles.index")}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-4"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Update Role
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}