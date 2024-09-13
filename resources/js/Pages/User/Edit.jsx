import InputError from "@/Components/InputError";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useMemo } from "react";
import Select from 'react-select'

export default function Edit({ auth,user,allPermissions,allRoles }) {

    console.log({ auth,user,allPermissions,allRoles });

    const permissionsDefaultOptions = user.data.permissions.map((permission) => {
        return {
            value: permission.id,
            label: permission.title,
        };
    });

    const permissionsTotalOptions = [...new Set(allPermissions.data.map((permission) => {
        return {
            value: permission.id,
            label: permission.title,
        };
    }))];

    const rolesDefaultOptions = user.data.roles.map((role) => {
        return {
            value: role.id,
            label: role.title,
        };
    });

    const rolesTotalOptions = [...new Set(allRoles.data.map((role) => {            
        return {
            value: role.id,
            label: role.title,
        };
    }))];

    const { data, setData, put, processing, errors } = useForm({
        name: user.data.name,
        email: user.data.email,
        roles: user.data.roles,
        selectedPermissions: permissionsDefaultOptions,
        selectedRoles: rolesDefaultOptions,
        rolesDefaultOptions:rolesDefaultOptions ,
        permissionsTotalOptions:permissionsTotalOptions ,
        optionsUser: permissionsDefaultOptions,
    });


   const defaultRoles = data.roles.map((role) => {
        return {
            value: role.id,
            label: role.title,
        };
   });

    function submit(e) {
        e.preventDefault();
        put(
            route("users.update", {
                user: user.data.id,
            })
        );
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit a User
                </h2>
            }
        >
            <Head title="Edit User" />
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
                    <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-12">
                        <form onSubmit={submit}>
                            <div className="shadow sm:rounded-md sm:overflow-hidden">
                                <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                                    <div>
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                            User Information
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Use this form to edit a user.
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
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                id="name"
                                                className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                                                    errors.name
                                                        ? "text-red-900 focus:ring-red-500 focus:border-red-500 border-red-300"
                                                        : ""
                                                }`}
                                            />
                                            <InputError message={errors.name} />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
                                                id="email"
                                                autoComplete="email"
                                                className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                                                    errors.email
                                                        ? "text-red-900 focus:ring-red-500 focus:border-red-500 border-red-300"
                                                        : ""
                                                }`}
                                            />
                                            <InputError
                                                message={errors.email}
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                        <label
                                                htmlFor="permission"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Permissions de l'utilisateur
                                        </label>
                                            <Select 
                                                isMulti 
                                                options={data.permissionsTotalOptions}
                                                defaultValue={data.optionsUser}
                                                onChange={(e) => setData("selectedPermissions", e)}
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                    htmlFor="role"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Roles
                                            </label>
                                            <Select 
                                                isMulti 
                                                options={rolesTotalOptions}
                                                defaultValue={data.rolesDefaultOptions}
                                                onChange={(e) => setData("selectedRoles", e)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 mt-60">
                                    <Link
                                        href={route("users.index")}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-4"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Update
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