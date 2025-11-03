import NavLink from "@/Components/NavLink";
import { echo } from "@/echo";
import { useEffect, useState } from "react";

export default function SidebarLayout({ users, children }) {
    const [onlineUsers, setOnlieUsers] = useState([]);
    useEffect(() => {
        const channel = echo
            .join("online-users")
            .here((users) => {
                console.log("online now", users);
                setOnlieUsers(users);
            })
            .joining((user) => {
                console.log("user joined", user);
                setOnlieUsers((prev) => [...prev, user]);
            })
            .leaving((user) => {
                console.log("user leave", user);
                setOnlieUsers((prev) => prev.filter((u) => u.id !== user.id));
            });

        return () => {
            echo.leaveChannel("online-users");
        };
    }, []);
    const isUserOnline = (idToCheck) => {
        return onlineUsers.some((user) => user.id === idToCheck);
    };
    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-white shadow-md p-4 overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Users</h2>
                <ul className="space-y-3">
                    {users.map((user) => (
                        <li
                            key={user.id}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-blue-50 cursor-pointer transition"
                        >
                            <NavLink
                                active={route().current(
                                    "user.messages",
                                    user.id
                                )}
                                href={route("user.messages", user.id)}
                                className="flex items-center gap-3"
                            >
                                <img
                                    src={
                                        user.avatar ||
                                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                            user.name
                                        )}`
                                    }
                                    alt={user.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <span className="font-medium">{user.name}</span>
                            </NavLink>
                            <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition">
                                {isUserOnline(user.id) ? "Online" : "OffLine"}
                            </button>
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Main Content */}
            <main className="flex-1">{children}</main>
        </div>
    );
}
