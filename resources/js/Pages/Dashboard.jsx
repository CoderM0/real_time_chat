import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12 bg-gray-100 min-h-screen">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
                        <div className="p-8 text-gray-800 text-lg font-medium">
                            Welcome back! You are logged in.
                        </div>

                        <div className="border-t border-gray-200 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <Link
                                href={route("users")}
                                className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
                            >
                                View Users
                            </Link>
                            <span className="text-gray-500 text-sm">
                                View users to chat with
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
