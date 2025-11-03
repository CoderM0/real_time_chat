import { echo } from "@/echo";
import { Link } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import BlankChat from "./BlankChat";
import ChatBox from "./ChatBox";

export default function ChatPage({
    users,
    is_blank,
    receive_user,
    messages,
    current_user,
}) {
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        const channel = echo
            .join("online-users")
            .here((users) => setOnlineUsers(users))
            .joining((user) => setOnlineUsers((prev) => [...prev, user]))
            .leaving((user) =>
                setOnlineUsers((prev) => prev.filter((u) => u.id !== user.id))
            );

        return () => {
            echo.leaveChannel("online-users");
        };
    }, []);

    const isUserOnline = (idToCheck) => {
        return onlineUsers.some((user) => user.id === idToCheck);
    };

    const onlineStatus = useMemo(() => {
        return isUserOnline(receive_user?.id);
    }, [receive_user, onlineUsers]);
    const [isCollapsed, setIsCollapsed] = useState(false);
    return (
        <div className="flex h-screen bg-gray-50 text-gray-800 transition-all duration-300">
            <aside
                className={`${
                    isCollapsed ? "w-20" : "w-72"
                } bg-white border-r border-gray-200 flex flex-col shadow-sm transition-all duration-300`}
            >
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
                    {!isCollapsed && (
                        <h2 className="text-2xl font-semibold text-gray-800 transition-opacity duration-200">
                            IChat
                        </h2>
                    )}
                    <button
                        onClick={() => setIsCollapsed((prev) => !prev)}
                        className="text-gray-500 hover:text-gray-700 transition"
                        title={isCollapsed ? "توسيع" : "تصغير"}
                    >
                        {isCollapsed ? (
                            <span className="text-xl">»</span>
                        ) : (
                            <span className="text-xl">«</span>
                        )}
                    </button>
                </div>

                <ul
                    className={`flex-1 overflow-y-auto ${
                        isCollapsed ? "px-0" : "px-3"
                    }  py-3 space-y-2 transition-all duration-300`}
                >
                    {users.map((user) => (
                        <li
                            key={user.id}
                            className={` ${
                                route().current("user.messages", user.id)
                                    ? "bg-blue-50 border border-blue-100 "
                                    : ""
                            } flex items-center justify-between p-3 rounded-xl hover:bg-blue-50 transition-all duration-200 cursor-pointer ${
                                isCollapsed ? "justify-center" : ""
                            }`}
                        >
                            <Link
                                href={route("user.messages", user.id)}
                                className={`flex items-center gap-3 flex-1 ${
                                    isCollapsed ? "justify-center" : ""
                                }  `}
                            >
                                <img
                                    src={
                                        `/storage/${user.avatar}` ||
                                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                            user.name
                                        )}&background=0D8ABC&color=fff`
                                    }
                                    alt={user.name}
                                    className="w-10 h-10 rounded-full object-cover border border-gray-300 shadow-sm"
                                />
                                {!isCollapsed && (
                                    <div className="flex flex-col">
                                        <span className="font-medium text-gray-800">
                                            {user.name}
                                        </span>
                                        <span
                                            className={`text-xs ${
                                                isUserOnline(user.id)
                                                    ? "text-green-600"
                                                    : "text-gray-500"
                                            }`}
                                        >
                                            {isUserOnline(user.id)
                                                ? "Online"
                                                : "Offline"}
                                        </span>
                                    </div>
                                )}
                            </Link>

                            {!isCollapsed && (
                                <div
                                    className={`w-3 h-3 rounded-full ${
                                        isUserOnline(user.id)
                                            ? "bg-green-500"
                                            : "bg-gray-400"
                                    }`}
                                ></div>
                            )}
                        </li>
                    ))}
                </ul>
            </aside>

            <main className="flex-1 flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 transition-all duration-300">
                {is_blank ? (
                    <BlankChat />
                ) : (
                    <ChatBox
                        isUserOnline={onlineStatus}
                        receive_user={receive_user}
                        current_user={current_user}
                        messages={messages}
                    />
                )}
            </main>
        </div>
    );
}
