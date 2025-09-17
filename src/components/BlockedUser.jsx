import { useContext } from "react";
import { StateContext } from "../contexts/State";
import { BlockedContext } from "../contexts/Blocked";
import { removeBlock } from "../services/block.api";
import { AuthContext } from "../contexts/Auth";

const BlockedUser = () => {
    const { showBlockedUsers, setShowBlockedUsers } = useContext(StateContext);
    const { blocked, setBlocked } = useContext(BlockedContext);
    const { auth } = useContext(AuthContext);

    const closeBlock = () => {
        setShowBlockedUsers(false);
    };

    const removeBlockedUser = async (cid) => {
        try {
            console.log(cid)
            const res = await removeBlock({ token: auth.token, contactId: cid });
            if (res.status === 200) {
                alert('User unblocked successfully');
                setBlocked(prev => prev.filter(user => user._id !== cid));
            } else {
                alert('Failed to unblock user');
            }
        } catch (err) {
            console.error('Error removing block:', err);
            alert('An error occurred while unblocking the user');
        }
    };

    return (
        <div className="fixed z-50 h-[90%] w-[90%] left-[5%] top-[5%] md:top-[15%] md:left-[35%] md:w-[30%] md:h-[70%] bg-gray-900 text-white rounded-xl shadow-lg overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold">Blocked Users</h2>
                <button
                    onClick={closeBlock}
                    className="text-white hover:text-gray-300 transition"
                >
                    {'<<'}
                </button>
            </div>
            <div className="w-full h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800 p-2 space-y-2">
                {blocked.length > 0 ? (
                    blocked.map((user, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center bg-gray-700 rounded-lg px-4 py-2"
                        >
                            <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-gray-300">{user.username}</p>
                            </div>
                            <button
                                className="bg-orange-300 text-black px-3 py-1 rounded hover:bg-orange-400 transition"
                                onClick={() => removeBlockedUser(user._id)}
                            >
                                Unblock
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-400 mt-10">No blocked users.</p>
                )}
            </div>
        </div>
    );
};

export default BlockedUser;
