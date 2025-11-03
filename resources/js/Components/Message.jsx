import { useEffect, useState } from "react";
import { FaCheck, FaCheckDouble, FaClock } from "react-icons/fa";

export default function Message({ message, currentUserId, refs }) {
    const isCurrentUser = message.sender_id === currentUserId;

    const formatTime = (datetime) => {
        const date = new Date(datetime);
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
    };

    const [msgStatus, setMsgStatus] = useState("sending");
    useEffect(() => {
        if (message.read_at != null) {
            setMsgStatus("readed");
        }
    }, []);
    const renderStatusIcon = () => {
        if (msgStatus === "sending") {
            return <FaClock className="w-3 h-3 text-gray-400 ml-1" />;
        } else if (msgStatus === "sent") {
            return <FaCheck className="w-3 h-3 text-gray-400 ml-1" />;
        } else if (msgStatus === "readed") {
            return <FaCheckDouble className="w-3 h-3 text-blue-400 ml-1" />;
        }
        return null;
    };

    return (
        <div
            ref={(el) => (refs.current[message.id] = el)}
            data-id={message.id}
            data-read={message.read_at}
            data-fromme={String(message.sender_id == currentUserId)}
            className={`flex ${
                isCurrentUser ? "justify-end" : "justify-start"
            }`}
        >
            <div
                className={`px-4 py-2 rounded-2xl max-w-xs break-words ${
                    isCurrentUser
                        ? "bg-blue-600 text-white rounded-tr-none"
                        : "bg-gray-200 text-gray-800 rounded-tl-none"
                }`}
            >
                <p className="text-sm">{message.content}</p>

                <div className="flex items-center justify-end mt-1 space-x-1 text-xs text-gray-300">
                    <span>{formatTime(message.created_at)}</span>
                    {isCurrentUser && renderStatusIcon()}
                </div>
            </div>
        </div>
    );
}
