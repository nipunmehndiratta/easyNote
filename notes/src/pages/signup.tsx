import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { z } from 'zod';

export default function Signup() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [error, setError] = useState("");

    const schema = z.object({
        username: z.string().min(3),
        password: z.string().min(5)
    });

    async function handleSignup() {
        try {
            schema.parse({ username, password });
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
                username,
                password
            });
            if (response.status === 201) {
                alert("Registration successful, please log in");
                router.push("/signin");
            }
        } catch (error :any) {
                setError(error?.response?.data?.message);
                console.error(error);
        }
    }

    function handleUsernameBlur() {
        try {
            schema.pick({ username: true }).parse({ username });
            setUsernameError("");
        } catch (error) {
            if (error instanceof z.ZodError) {
                setUsernameError("Username must be at least 3 characters long");
            } 
        }
    }

    function handlePasswordBlur() {
        try {
            schema.pick({ password: true }).parse({ password });
            setPasswordError("");
        } catch (error) {
            if (error instanceof z.ZodError) {
                setPasswordError("Password must be at least 5 characters long");
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
                    onBlur={handleUsernameBlur}
                />
                {usernameError && <p className="text-red-500">{usernameError}</p>}
                <input
                    placeholder="Password"
                    className="min-w-full p-3 border border-gray-300 rounded shadow mt-2 outline-orange-400"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={handlePasswordBlur}
                />
                {passwordError && <p className="text-red-500">{passwordError}</p>}
                <button className="bg-orange-400 rounded-lg text-white min-w-full min-h-12 mt-5" onClick={handleSignup}>Continue</button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <span className="text-gray-400 mt-10">Already have an account?</span>
                <button className="text-orange-400 mt-2" onClick={() => router.push("/signin")}>Sign in</button>
            </div>
        </div>
    );
}
