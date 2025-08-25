import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/user/register', {
                username,
                email,
                password
            });
            console.log(response.data);
            navigate('/login');
        } catch (error) {
            console.error(error);
            alert("Registration failed. Please try again.");
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-red-900 to-black flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-yellow-400 mb-2 font-marvel tracking-wide"
                                            style={{ fontFamily: "'Bangers', cursive" }}
>
                        MULTIVERSE MATCHMAKER
                    </h1>
                    <p className="text-gray-300">Join Earth's Mightiest Community</p>
                </div>
                
                <form onSubmit={handleRegister} className="bg-black bg-opacity-70 rounded-lg shadow-lg p-8 border-2 border-red-700">
                    <div className="mb-6">
                        <label className="block text-yellow-400 text-sm font-bold mb-2 font-marvel">
                            SUPERHERO ALIAS
                        </label>
                        <input 
                            type="text"
                            className="w-full px-3 py-2 bg-gray-900 text-white border-b-2 border-red-700 focus:outline-none focus:border-yellow-500 transition"
                            placeholder="Enter your hero name" 
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="mb-6">
                        <label className="block text-yellow-400 text-sm font-bold mb-2 font-marvel">
                            SHIELD COMMUNICATOR
                        </label>
                        <input 
                            type="email"
                            className="w-full px-3 py-2 bg-gray-900 text-white border-b-2 border-red-700 focus:outline-none focus:border-yellow-500 transition"
                            placeholder="Enter your communicator ID" 
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="mb-8">
                        <label className="block text-yellow-400 text-sm font-bold mb-2 font-marvel">
                            SECRET CODE
                        </label>
                        <input 
                            type="password"
                            className="w-full px-3 py-2 bg-gray-900 text-white border-b-2 border-red-700 focus:outline-none focus:border-yellow-500 transition"
                            placeholder="Create your secret code" 
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        className="w-full bg-red-700 hover:bg-yellow-500 text-white font-bold py-3 px-4 rounded-md transition duration-300 transform hover:scale-105"
                    >
                        ASSEMBLE!
                    </button>
                    
                    <p className="text-gray-400 text-center mt-4 text-sm">
                        Already have an account? <a href="/login" className="text-yellow-400 hover:underline">Avengers Login</a>
                    </p>
                </form>
                
                <div className="mt-8 text-center text-gray-400 text-xs">
                    <p>© 2023 MARVEL MATCHMAKER. ALL RIGHTS RESERVED.</p>
                    <p className="mt-1">A S.H.I.E.L.D. APPROVED SERVICE</p>
                </div>
            </div>
        </div>
    )
}