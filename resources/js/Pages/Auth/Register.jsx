import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FaCamera, FaUserPlus } from "react-icons/fa";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        avatar: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="w-full">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                        Create Account
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
                        Join IChat and start connecting
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-4">
                    <div className="flex flex-col items-center mb-4">
                        <div className="relative">
                            <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-700 shadow-lg">
                                {data.avatar ? (
                                    <img
                                        src={URL.createObjectURL(data.avatar)}
                                        alt="Preview"
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                ) : (
                                    <FaUserPlus className="text-green-500 text-2xl" />
                                )}
                            </div>
                            <label
                                htmlFor="fileupload"
                                className="absolute -bottom-1 -right-1 bg-green-500 hover:bg-green-600 text-white p-1.5 rounded-full cursor-pointer shadow-lg transition-colors"
                            >
                                <FaCamera className="text-xs" />
                            </label>
                            <input
                                id="fileupload"
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => {
                                    setData("avatar", e.target.files[0]);
                                }}
                            />
                        </div>
                        <InputError message={errors.avatar} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="name"
                            value="Full Name"
                            className="text-gray-700 dark:text-gray-300 text-sm font-medium"
                        />
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-green-500 focus:ring-green-500 text-sm py-2"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-1" />
                    </div>

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
                            autoComplete="new-password"
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

                    <div>
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Confirm Password"
                            className="text-gray-700 dark:text-gray-300 text-sm font-medium"
                        />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-green-500 focus:ring-green-500 text-sm py-2"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            required
                        />
                        <InputError
                            message={errors.password_confirmation}
                            className="mt-1"
                        />
                    </div>

                    <div className="flex items-center justify-between pt-4">
                        <Link
                            href={route("login")}
                            className="text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 underline transition-colors"
                        >
                            Already have an account?
                        </Link>

                        <PrimaryButton
                            className="bg-green-500 hover:bg-green-600 focus:bg-green-600 text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all transform hover:scale-105 shadow-lg"
                            disabled={processing}
                        >
                            {processing ? "Creating..." : "Create Account"}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
