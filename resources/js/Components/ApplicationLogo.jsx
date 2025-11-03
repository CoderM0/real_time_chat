import { FaComments } from "react-icons/fa";

export default function ApplicationLogo(props) {
    return (
        <div className="flex items-center space-x-2">
            <div className="bg-green-500 p-2 rounded-full">
                <FaComments className="text-white text-xl" />
            </div>
            <span className="text-xl font-bold text-green-600">IChat</span>
        </div>
    );
}
