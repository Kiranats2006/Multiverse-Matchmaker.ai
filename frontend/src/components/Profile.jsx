import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/user/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUser(response.data);
        setForm({
          ...response.data,
          interests: response.data.interests?.join(", ") || "",
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, [userId, token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        ...form,
        interests: form.interests.split(",").map((i) => i.trim()),
      };

      const res = await axios.put(
        `http://localhost:8080/api/user/${userId}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data);
      setEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone!"
      )
    )
      return;
    try {
      await axios.delete(`http://localhost:8080/api/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  if (!user)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div
          className="text-yellow-400 text-2xl"
          style={{ fontFamily: "'Bangers', cursive" }}
        >
          LOADING YOUR HERO PROFILE...
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4">
      <div className="max-w-2xl mx-auto bg-black bg-opacity-80 rounded-xl border-2 border-red-700 p-8 shadow-lg">
        <h2
          className="text-3xl font-bold mb-8 text-center text-yellow-400 border-b-2 border-red-700 pb-4"
          style={{ fontFamily: "'Bangers', cursive" }}
        >
          YOUR HERO PROFILE
        </h2>

        {editing ? (
          <div className="space-y-6">
            {/* Username */}
            <div>
              <label className="block text-yellow-400 mb-2">CODE NAME</label>
              <input
                name="username"
                value={form.username || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border-b-2 border-red-600 focus:outline-none focus:border-yellow-500 text-white"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-yellow-400 mb-2">SHIELD COMMUNICATOR</label>
              <input
                name="email"
                value={form.email || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border-b-2 border-red-600 focus:outline-none focus:border-yellow-500 text-white"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-yellow-400 mb-2">BIO</label>
              <textarea
                name="bio"
                value={form.bio || ""}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 bg-gray-800 border-b-2 border-red-600 focus:outline-none focus:border-yellow-500 text-white"
              />
            </div>

            {/* Profile Pic */}
            <div>
              <label className="block text-yellow-400 mb-2">PROFILE PIC URL</label>
              <input
                type="text"
                name="profilePic"
                value={form.profilePic || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border-b-2 border-red-600 focus:outline-none focus:border-yellow-500 text-white"
              />
            </div>

            {/* Interests */}
            <div>
              <label className="block text-yellow-400 mb-2">INTERESTS</label>
              <input
                type="text"
                name="interests"
                value={form.interests || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border-b-2 border-red-600 focus:outline-none focus:border-yellow-500 text-white"
                placeholder="magic, science, chaos..."
              />
              <p className="text-xs text-gray-400 mt-1">
                Separate multiple interests with commas
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={handleUpdate}
                className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded transition"
              >
                SAVE PROFILE
              </button>
              <button
                onClick={() => setEditing(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition"
              >
                CANCEL
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Profile Pic */}
            {user.profilePic && (
              <div className="flex justify-center">
                <img
                  src={user.profilePic}
                  alt="profile"
                  className="w-32 h-32 rounded-full border-4 border-yellow-500 object-cover"
                />
              </div>
            )}

            {/* Username */}
            <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-yellow-500">
              <h3 className="text-yellow-400 mb-1">CODE NAME</h3>
              <p className="text-xl">{user.username}</p>
            </div>

            {/* Email */}
            <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-yellow-500">
              <h3 className="text-yellow-400 mb-1">SHIELD COMMUNICATOR</h3>
              <p className="text-xl">{user.email}</p>
            </div>

            {/* Bio */}
            {user.bio && (
              <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-yellow-500">
                <h3 className="text-yellow-400 mb-1">BIO</h3>
                <p>{user.bio}</p>
              </div>
            )}

            {/* Interests */}
            {user.interests?.length > 0 && (
              <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-yellow-500">
                <h3 className="text-yellow-400 mb-1">INTERESTS</h3>
                <p>{user.interests.join(", ")}</p>
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <button
                onClick={() => setEditing(true)}
                className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded transition"
              >
                EDIT PROFILE
              </button>
            </div>
          </div>
        )}

        {/* Delete Button */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <button
            onClick={handleDelete}
            className="w-full bg-black hover:bg-red-900 text-red-400 font-bold py-2 px-4 rounded transition border border-red-700"
          >
            DESTROY IDENTITY PROTOCOL
          </button>
          <p className="text-xs text-gray-400 mt-2 text-center">
            This will permanently erase your account across all realities
          </p>
        </div>
      </div>
    </div>
  );
}
