import InputError from "@/Components/InputError";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Edit({ auth, classes,student }) {
    const [sections, setSections] = useState([]);

    const { data, setData, put, processing, errors } = useForm({
        name: student.data.name,
        email: student.data.email,
        class_id: student.data.class.id,
        section_id: student.data.section.id,
    });

    useEffect(() => {
        if (data.class_id) {
            axios
                .get(
                    route("sections.index", {
                        class_id: data.class_id,
                    })
                )
                .then((response) => {
                    setSections(response.data.data);
                });
        }
    }, [data.class_id]);

    function submit(e) {
        e.preventDefault();
        put(
            route("students.update", {
                student: student.data.id,
            })
        );
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit a student
                </h2>
            }
        >
            <Head title="Edit Student" />

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
                    <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-12">
                        <form onSubmit={submit}>
                            <div className="shadow sm:rounded-md sm:overflow-hidden">
                                <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                                    <div>
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                            Student Information
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Use this form to edit a student.
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
                                                htmlFor="className_id"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Class
                                            </label>
                                            <select
                                                id="class_id"
                                                value={data.class_id}
                                                onChange={(e) =>
                                                    setData(
                                                        "class_id",
                                                        e.target.value
                                                    )
                                                }
                                                className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                                                    errors.class_id
                                                        ? "text-red-900 focus:ring-red-500 focus:border-red-500 border-red-300"
                                                        : ""
                                                }`}
                                            >
                                                <option value="">
                                                    Select a Class
                                                </option>
                                                {classes.data.map((item) => {
                                                    return (
                                                        <option
                                                            value={item.id}
                                                            key={item.id}
                                                        >
                                                            {item.name}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                            <InputError
                                                message={errors.class_id}
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="section_id"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Section
                                            </label>
                                            <select
                                                id="section_id"
                                                value={data.section_id}
                                                onChange={(e) =>
                                                    setData(
                                                        "section_id",
                                                        e.target.value
                                                    )
                                                }
                                                className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                                                    errors.section_id
                                                        ? "text-red-900 focus:ring-red-500 focus:border-red-500 border-red-300"
                                                        : ""
                                                }`}
                                            >
                                                <option value="">
                                                    Select a Section
                                                </option>
                                                {sections.map((section) => {
                                                    return (
                                                        <option
                                                            value={section.id}
                                                            key={section.id}
                                                        >
                                                            {section.name}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                            <InputError
                                                message={errors.section_id}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <Link
                                        href={route("students.index")}
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