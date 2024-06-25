import { useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "@/store/atoms/user";
import { useRouter } from "next/router";
import ProfilePicture from "./ProfilePicture";

export default function Appbar() {
    const username = useRecoilValue(userState);
    const [showLogout, setShowLogout] = useState(false);
    const router = useRouter();

    const handleProfileClick = () => {
        setShowLogout(!showLogout);
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        router.push("/signin");
    };

    return (
        <div className="flex justify-between p-5">
            <span className="text-black font-bold text-xl ml-3">NOTES</span>
            <div className="flex items-center relative">
                <span className="text-gray-700">{username}</span>
                <div className="relative">
                    <ProfilePicture name={username} handleProfileClick={handleProfileClick} />
                    {showLogout && (
                        <button
                            onClick={handleLogout}
                            className="absolute top-full right-4 bg-orange-400 text-white border border-transparent py-1 px-3 rounded shadow-lg transition-all duration-300 hover:scale-105"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
