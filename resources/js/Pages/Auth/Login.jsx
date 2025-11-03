import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="w-full">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                        Welcome Back
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
                        Sign in to your IChat account
                    </p>
                </div>

                {status && (
                    <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 border border-green-400 text-green-700 dark:text-green-300 rounded-lg text-sm">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <InputLabel
                            htmlFor="email"
                            value="Email"
                            className="text-gray-700 dark:text-gray-300 text-sm font-medium"
                        />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-green-500 focus:ring-green-500 text-sm py-2"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="text-gray-700 dark:text-gray-300 text-sm font-medium"
                        />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-green-500 focus:ring-green-500 text-sm py-2"
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            required
                        />
                        <InputError
                            message={errors.password}
                            className="mt-1"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                                className="border-gray-300 dark:border-gray-600 text-green-500 focus:ring-green-500"
                            />
                            <span className="ms-2 text-sm text-gray-600 dark:text-gray-300">
                                Remember me
                            </span>
                        </label>

                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 underline transition-colors"
                            >
                                Forgot password?
                            </Link>
                        )}
                    </div>

                    <div className="flex items-center justify-between pt-4">
                        <Link
                            href={route("register")}
                            className="text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 underline transition-colors"
                        >
                            Don't have an account?
                        </Link>

                        <PrimaryButton
                            className="bg-green-500 hover:bg-green-600 focus:bg-green-600 text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all transform hover:scale-105 shadow-lg"
                            disabled={processing}
                        >
                            {processing ? "Signing In..." : "Sign In"}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
