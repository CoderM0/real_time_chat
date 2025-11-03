import Message from "@/Components/Message";
import { echo } from "@/echo";
import { Link } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaPaperPlane } from "react-icons/fa";

export default function ChatBox({
    receive_user,
    isUserOnline,
    current_user,
    messages,
}) {
    const [premessages, setPreMessages] = useState(messages);
    const [content, setContent] = useState("");
    const inputRef = useRef();
    const messagesEndRef = useRef(null);
    const sendButtonRef = useRef(null);
    const [messageStatusUpdates, setMessageStatusUpdates] = useState({});

    useEffect(() => {
        const channel = echo
            .private(`chat.${current_user.id}`)
            .listen("MessageSent", (event) => {
                const isForCurrentConversation =
                    (event.message.sender_id === receive_user.id &&
                        event.message.receiver_id === current_user.id) ||
                    (event.message.sender_id === current_user.id &&
                        event.message.receiver_id === receive_user.id);
                if (isForCurrentConversation) {
                    setPreMessages((prev) => [...prev, event.message]);
                }
            })
            .listen("MessageRead", (ev) => {
                setMessageStatusUpdates((prev) => ({
                    ...prev,
                    [ev.message.id]: ev.message.msg_status,
                }));
            });

        return () => {
            channel.stopListening("MessageSent");
            echo.leaveChannel(`chat.${current_user.id}`);
        };
    }, [receive_user.id]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [premessages]);

    const sendMessage = async () => {
        if (!content.trim()) return;

        try {
            let response = await axios.post(route("send_message"), {
                receiver_id: receive_user.id,
                content,
            });
            if (response.status === 200) {
                setPreMessages((prev) => [...prev, { ...response.data }]);
            }
        } catch (err) {
            console.error("Error sending message:", err);
        }
        setContent("");
        inputRef.current.value = "";
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendButtonRef.current.click();
        }
    };

    const messageRefs = useRef({});

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const messageId = entry.target.dataset.id;
                        if (
                            entry.target.dataset.read == null &&
                            entry.target.dataset.fromme !== "true"
                        ) {
                            axios.post(route("read_message", messageId));
                        }
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.5,
            }
        );

        Object.values(messageRefs.current).forEach((el) =>
            observer.observe(el)
        );

        return () => observer.disconnect();
    }, [premessages]);

    return (
        <div className="flex flex-col h-screen bg-white">
            <header className="bg-green-50 border-b border-green-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href={route("dashboard")}
                        className="text-green-600 hover:text-green-700 transition p-2 rounded-lg hover:bg-green-100"
                    >
                        <FaArrowLeft className="text-lg" />
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <img
                                src={`/storage/${receive_user.avatar}`}
                                alt={receive_user.name}
                                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                            />
                            <div
                                className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                                    isUserOnline
                                        ? "bg-green-500"
                                        : "bg-gray-400"
                                }`}
                            ></div>
                        </div>
                        <div>
                            <h2 className="font-bold text-gray-800 text-lg">
                                {receive_user.name}
                            </h2>
                            <p
                                className={`text-sm font-medium ${
                                    isUserOnline
                                        ? "text-green-600"
                                        : "text-gray-500"
                                }`}
                            >
                                {isUserOnline ? "Online" : "Offline"}
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-white to-green-50">
                {premessages?.map((msg) => (
                    <Message
                        messageStatusUpdates={messageStatusUpdates}
                        refs={messageRefs}
                        key={msg.id}
                        currentUserId={current_user.id}
                        message={msg}
                    />
                ))}
                <div ref={messagesEndRef} />
            </main>

            <footer className="bg-white border-t border-green-200 px-6 py-4 flex items-center gap-3">
                <input
                    type="text"
                    placeholder="Type a message..."
                    ref={inputRef}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setContent(e.target.value)}
                    className="flex-1 border border-green-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition text-gray-700 placeholder-gray-400 shadow-sm bg-white"
                />
                <button
                    onClick={sendMessage}
                    ref={sendButtonRef}
                    disabled={!content.trim()}
                    className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium px-6 py-3 rounded-2xl shadow-md transition-all duration-150 active:scale-95 flex items-center gap-2"
                >
                    <FaPaperPlane className="text-sm" />
                    Send
                </button>
            </footer>
        </div>
    );
}
