import { echo } from "@/echo";
import { useEffect, useState } from "react";

export function useOnlineUsers() {
    const [onlineUsers, setOnlineUsers] = useState(() => {
        const saved = sessionStorage.getItem("online-users");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        sessionStorage.setItem("online-users", JSON.stringify(onlineUsers));
    }, [onlineUsers]);

    useEffect(() => {
        echo.join("online-users")
            .here((users) => setOnlineUsers(users))
            .joining((user) =>
                setOnlineUsers((prev) => {
                    const exists = prev.some((u) => u.id === user.id);
                    return exists ? prev : [...prev, user];
                })
            )
            .leaving((user) =>
                setOnlineUsers((prev) => prev.filter((u) => u.id !== user.id))
            );

        return () => {
            echo.leaveChannel("online-users");
        };
    }, []);

    return onlineUsers;
}
