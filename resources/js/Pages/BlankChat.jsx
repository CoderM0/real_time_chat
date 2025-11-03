import { FaComments, FaLock, FaRocket, FaUsers } from "react-icons/fa";

export default function BlankChat() {
    return (
        <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-white to-green-50 p-8">
            <div className="text-center max-w-md">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaComments className="text-green-500 text-3xl" />
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Welcome to IChat
                </h1>

                <p className="text-gray-600 text-lg mb-8">
                    Start a conversation by selecting a contact from the sidebar
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100 text-center">
                        <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                            <FaUsers className="text-blue-500 text-xl" />
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-1">
                            Connect
                        </h3>
                        <p className="text-sm text-gray-600">
                            Chat with friends
                        </p>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100 text-center">
                        <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                            <FaLock className="text-green-500 text-xl" />
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-1">
                            Secure
                        </h3>
                        <p className="text-sm text-gray-600">
                            End-to-end encrypted
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-center space-x-2 text-gray-500">
                    <FaRocket className="text-green-500" />
                    <span className="text-sm">Ready to start chatting</span>
                </div>
            </div>
        </div>
    );
}
