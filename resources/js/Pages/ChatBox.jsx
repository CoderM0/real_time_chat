import Message from "@/Components/Message";
import { echo } from "@/echo";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

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
                setPreMessages((prev) => [...prev, event.message]);
            })
            .listen("MessageRead", (ev) => {
                console.log("readed", ev.message);
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
    // console.log("mshs", messages);
    useEffect(() => {
        scrollToBottom();
    }, [premessages]);

    const sendMessage = async () => {
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
    ////

    const messageRefs = useRef({});

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const messageId = entry.target.dataset.id;
                        // console.log(
                        //     `${messageId} entere3d the view `
                        // );
                        console.log(
                            "entry is readed befor",
                            entry.target.dataset.id
                        );
                        console.log(
                            "it will be sent",
                            entry.target.dataset.read == null &&
                                entry.target.dataset.fromme !== "true"
                        );
                        if (
                            entry.target.dataset.read == null &&
                            entry.target.dataset.fromme !== "true"
                        ) {
                            console.log("  ارسال طلب قراءة");
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

    ///
    return (
        <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <header className="bg-white/70 backdrop-blur-md shadow-sm px-6 py-4 flex items-center justify-between border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => window.history.back()}
                        className="text-gray-500 hover:text-gray-700 transition"
                    >
                        ←
                    </button>
                    <div className="flex items-center gap-3">
                        <img
                            src={
                                `/storage/${receive_user.avatar}` ||
                                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    receive_user.name
                                )}&background=0D8ABC&color=fff`
                            }
                            alt={receive_user.name}
                            className="w-11 h-11 rounded-full object-cover border border-gray-200"
                        />
                        <div>
                            <h2 className="font-semibold text-gray-800 text-lg">
                                {receive_user.name}
                            </h2>
                            <p
                                className={`text-sm ${
                                    isUserOnline
                                        ? "text-green-600"
                                        : "text-gray-400"
                                }`}
                            >
                                {isUserOnline ? " Online" : "Offline"}
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-6 space-y-4">
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

            <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200 px-5 py-4 flex items-center gap-3">
                <input
                    type="text"
                    placeholder="write a message...."
                    ref={inputRef}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setContent(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-gray-700 placeholder-gray-400 shadow-sm"
                />
                <button
                    onClick={sendMessage}
                    ref={sendButtonRef}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-2xl shadow-md transition-all duration-150 active:scale-95"
                >
                    Send
                </button>
            </footer>
        </div>
    );
}
