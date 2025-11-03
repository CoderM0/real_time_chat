import { Head, Link } from "@inertiajs/react";
import {
    FaCloud,
    FaComments,
    FaLock,
    FaMobile,
    FaShieldAlt,
    FaWhatsapp,
} from "react-icons/fa";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome to IChat" />
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 dark:from-gray-900 dark:to-gray-800 flex flex-col justify-center items-center p-4">
                <header className="w-full max-w-6xl flex justify-between items-center py-6 px-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-green-500 p-3 rounded-full">
                            <FaComments className="text-white text-2xl" />
                        </div>
                        <h1 className="text-3xl font-bold text-green-600 dark:text-green-400">
                            IChat
                        </h1>
                    </div>

                    <nav className="flex space-x-4">
                        {auth.user ? (
                            <Link
                                href={route("dashboard")}
                                className="px-4 py-2 text-green-600 dark:text-green-400 font-medium rounded-lg hover:bg-green-50 dark:hover:bg-gray-800 transition-colors"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route("login")}
                                    className="px-4 py-2 text-green-600 dark:text-green-400 font-medium rounded-lg hover:bg-green-50 dark:hover:bg-gray-800 transition-colors"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href={route("register")}
                                    className="px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors shadow-md"
                                >
                                    Create Account
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                <main className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mt-8 md:mt-16">
                    <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0 px-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
                            Connect Easily with{" "}
                            <span className="text-green-500">IChat</span>
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
                            Secure, fast, and reliable messaging platform. Stay
                            connected with friends and family anytime, anywhere.
                        </p>

                        <Link
                            href={
                                auth.user
                                    ? route("dashboard")
                                    : route("register")
                            }
                            className="inline-flex items-center justify-center px-8 py-4 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-all transform hover:scale-105 shadow-lg text-lg"
                        >
                            Get Started
                            <FaWhatsapp className="ml-2" />
                        </Link>
                    </div>

                    <div className="md:w-1/2 flex justify-center">
                        <div className="relative w-80 h-80 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center p-8 shadow-xl">
                            <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg">
                                <FaLock className="text-green-500 text-2xl" />
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
                                            Hello! How can I help you today?
                                        </p>
                                    </div>
                                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg rounded-tl-none max-w-xs ml-auto">
                                        <p className="text-gray-800 dark:text-white">
                                            I want to try IChat!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <section className="w-full max-w-6xl mt-16 md:mt-24 px-4">
                    <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-12">
                        Why Choose IChat?
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center hover:transform hover:-translate-y-2 transition-transform">
                            <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaShieldAlt className="text-green-500 text-2xl" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                                Secure & Encrypted
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300">
                                Your conversations are end-to-end encrypted to
                                ensure privacy and security.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center hover:transform hover:-translate-y-2 transition-transform">
                            <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaCloud className="text-blue-500 text-2xl" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                                Cloud Sync
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300">
                                Access your messages from any device with
                                seamless cloud synchronization.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center hover:transform hover:-translate-y-2 transition-transform">
                            <div className="bg-teal-100 dark:bg-teal-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaComments className="text-teal-500 text-2xl" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                                Simple & Intuitive
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300">
                                User-friendly interface that makes communication
                                easy and enjoyable.
                            </p>
                        </div>
                    </div>
                </section>

                <footer className="w-full max-w-6xl mt-16 py-8 text-center text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
                    <p>
                        All Rights Reserved © {new Date().getFullYear()} IChat
                    </p>
                </footer>
            </div>
        </>
    );
}
