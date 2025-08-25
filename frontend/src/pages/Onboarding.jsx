import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Onboarding() {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    bio: "",
    profilePic: "",
    interests: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        interests: form.interests.split(",").map((i) => i.trim())
      };

      // 1️⃣ update profile fields
      await axios.put(
        `http://localhost:8080/api/user/${userId}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 2️⃣ mark onboarding complete
      await axios.put(
        `http://localhost:8080/api/user/${userId}/finish-onboarding`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 3️⃣ update localStorage & redirect
      localStorage.setItem("firstLogin", false);
      navigate("/profile");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-black bg-opacity-80 rounded-xl border-2 border-yellow-500 p-8 shadow-lg">
        <h2 
          className="text-3xl font-bold mb-6 text-center text-yellow-400"
          style={{ fontFamily: "'Bangers', cursive" }}
        >
          WELCOME TO THE MULTIVERSE, HERO!
        </h2>a
        <p className="text-gray-400 text-center mb-6">
          Complete your hero profile before stepping into alternate realities 🌌
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-yellow-400 mb-2">BIO</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border-b-2 border-red-600 focus:outline-none focus:border-yellow-500 text-white"
              rows="3"
              placeholder="Tell us your story..."
            />
          </div>

          <div>
            <label className="block text-yellow-400 mb-2">PROFILE PIC URL</label>
            <input
              type="text"
              name="profilePic"
              value={form.profilePic}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border-b-2 border-red-600 focus:outline-none focus:border-yellow-500 text-white"
              placeholder="Paste image link (Cloudinary, Imgur, etc.)"
            />
          </div>

          <div>
            <label className="block text-yellow-400 mb-2">INTERESTS</label>
            <input
              type="text"
              name="interests"
              value={form.interests}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border-b-2 border-red-600 focus:outline-none focus:border-yellow-500 text-white"
              placeholder="e.g. magic, science, chaos"
            />
            <p className="text-xs text-gray-400 mt-1">
              Separate multiple interests with commas
            </p>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-4 rounded transition"
          >
            ENTER THE MULTIVERSE
          </button>
        </div>
      </div>
    </div>
  );
}
