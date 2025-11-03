import { useOnlineUsers } from "@/hooks/useOnlineUsers";
import { Link } from "@inertiajs/react";
import { useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaComments } from "react-icons/fa";
import BlankChat from "./BlankChat";
import ChatBox from "./ChatBox";

export default function ChatPage({
    users,
    is_blank,
    receive_user,
    messages,
    current_user,
}) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const onlineUsers = useOnlineUsers();

    console.log("online users", onlineUsers);
    const isUserOnline = (idToCheck) => {
        return onlineUsers.some((user) => user.id === idToCheck);
    };

    const onlineStatus = useMemo(() => {
        return isUserOnline(receive_user?.id);
    }, [receive_user, onlineUsers]);

    console.log("current_user", current_user);
    return (
        <div className="flex h-screen bg-gradient-to-br from-green-50 to-teal-100 text-gray-800 transition-all duration-300">
            <aside
                className={`${
                    isCollapsed ? "w-20" : "w-80"
                } bg-white border-r border-gray-200 flex flex-col shadow-lg transition-all duration-300`}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    {!isCollapsed && (
                        <div className="flex items-center space-x-3">
                            <div className="bg-green-500 p-2 rounded-full">
                                <FaComments className="text-white text-lg" />
                            </div>
                            <h2 className="text-xl font-bold text-green-600">
                                IChat
                            </h2>
                        </div>
                    )}
                    <button
                        onClick={() => setIsCollapsed((prev) => !prev)}
                        className="text-gray-500 hover:text-green-600 transition-colors p-2 rounded-lg hover:bg-green-50"
                        title={isCollapsed ? "Expand" : "Collapse"}
                    >
                        {isCollapsed ? (
                            <FaChevronRight className="text-lg" />
                        ) : (
                            <FaChevronLeft className="text-lg" />
                        )}
                    </button>
                </div>

                <div className="p-3 border-b border-gray-100">
                    {!isCollapsed && (
                        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                            Contacts ({users.length})
                        </h3>
                    )}
                </div>

                <ul
                    className={`flex-1 overflow-y-auto ${
                        isCollapsed ? "px-2" : "px-3"
                    } py-3 space-y-2 transition-all duration-300`}
                >
                    {users.map((user) => (
                        <li
                            key={user.id}
                            className={`${
                                route().current("user.messages", user.id)
                                    ? "bg-green-50 border border-green-200 shadow-sm"
                                    : "hover:bg-green-50"
                            } flex items-center justify-between  rounded-xl transition-all duration-200 cursor-pointer group ${
                                isCollapsed ? "justify-center p-0" : "p-3"
                            }`}
                        >
                            <Link
                                href={route("user.messages", user.id)}
                                className={`flex items-center gap-3 flex-1 ${
                                    isCollapsed ? "justify-center" : ""
                                }`}
                            >
                                <div className="relative">
                                    <img
                                        src={`/storage/${user.avatar}`}
                                        alt={user.name}
                                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                                    />
                                    <div
                                        className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                                            isUserOnline(user.id)
                                                ? "bg-green-500"
                                                : "bg-gray-400"
                                        }`}
                                    ></div>
                                </div>
                                {!isCollapsed && (
                                    <div className="flex flex-col flex-1 min-w-0">
                                        <span className="font-semibold text-gray-800 truncate">
                                            {user.name}
                                        </span>
                                        <span
                                            className={`text-xs font-medium ${
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

                            {!isCollapsed && isUserOnline(user.id) && (
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            )}
                        </li>
                    ))}
                </ul>

                {!isCollapsed && (
                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                        <div className="flex items-center space-x-3">
                            <img
                                src={`/storage/${current_user?.avatar}`}
                                alt={current_user?.name}
                                className="w-10 h-10 rounded-full object-cover border-2 border-green-500"
                            />
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-gray-800 truncate">
                                    {current_user?.name}
                                </p>
                                <p className="text-xs text-green-600 font-medium">
                                    Online
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </aside>

            <main className="flex-1 flex flex-col bg-white shadow-inner transition-all duration-300">
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
