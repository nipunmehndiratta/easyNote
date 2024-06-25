import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Signin() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSignin() {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                username,
                password
            });
            if (response.status === 201) {
                localStorage.setItem("token", response.data.access_token);
                router.push("/");
            }
        } catch (error :any) {
            console.error(error);
            if (error?.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("An error occurred while signing in. Please try again later.");
            }
        }
    }

    return (
        <div className="bg-orange-400 min-h-screen flex justify-center items-center">
            <div className="bg-white flex flex-col items-center rounded-xl p-5 max-w-xs md:p-12 md:w-[550px] md:max-w-[550px]">
                <img className="max-w-48" src="./logo.png" alt="Logo" />
                <span className="text-gray-500 mt-5">
                    Notes are the footprints of our minds
                </span>
                <input
                    placeholder="Username"
                    className="border border-gray-300 min-w-full p-3 rounded shadow mt-10 outline-orange-400"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    placeholder="Password"
                    className="min-w-full p-3 border border-gray-300 rounded shadow mt-2 outline-orange-400"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="bg-orange-400 rounded-lg text-white min-w-full min-h-12 mt-5" onClick={handleSignin}>Continue</button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <span className="text-gray-400 mt-5">Don't have an account?</span>
                <button className="text-orange-400 mt-2" onClick={() => router.push("/signup")}>Create account</button>
            </div>
        </div>
    );
}
