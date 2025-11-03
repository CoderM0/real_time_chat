import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { FaCloud, FaComments, FaMobile, FaShieldAlt } from "react-icons/fa";

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="w-full md:w-1/2">
                        <div className="text-center mb-6">
                            <Link
                                href="/"
                                className="flex items-center justify-center space-x-3"
                            >
                                <ApplicationLogo className="h-16 w-16 fill-current text-green-500" />
                            </Link>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
                            {children}
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 flex justify-center">
                        <div className="relative">
                            <div className="relative w-80 h-80 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center p-8 shadow-xl">
                                <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg">
                                    <FaShieldAlt className="text-green-500 text-2xl" />
                                </div>
                                <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg">
                                    <FaMobile className="text-green-500 text-2xl" />
                                </div>
                                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl w-64">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                            <FaComments className="text-white" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-800 dark:text-white">
                                                IChat
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                Online now
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg rounded-tr-none max-w-xs">
                                            <p className="text-gray-800 dark:text-white">
                                                Welcome to IChat!
                                            </p>
                                        </div>
                                        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg rounded-tl-none max-w-xs ml-auto">
                                            <p className="text-gray-800 dark:text-white">
                                                Ready to connect!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute -bottom-8 -right-8 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg max-w-xs">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                                        <FaCloud className="text-blue-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 dark:text-white">
                                            Cloud Sync
                                        </h4>
                                        <p className="text-xs text-gray-600 dark:text-gray-300">
                                            Access anywhere
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute -top-8 -left-8 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg max-w-xs">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-teal-100 dark:bg-teal-900 p-2 rounded-full">
                                        <FaComments className="text-teal-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 dark:text-white">
                                            Simple & Easy
                                        </h4>
                                        <p className="text-xs text-gray-600 dark:text-gray-300">
                                            User friendly
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
