import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const AdminPanel = () => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.trim() === "") return;

    const newPost = {
      content,
      date: new Date().toLocaleString(),
      type: "post"
    };

    await addDoc(collection(db, "posts"), newPost);
    setContent("");
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-2xl shadow-lg transition-all duration-300 ease-in-out">
      <h2 className="text-2xl font-semibold text-blue-800 mb-4">Admin Panel</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none shadow-sm"
          rows="4"
          placeholder="Write something to share..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full shadow-md transition-all"
        >
          📤 Share Post
        </button>
      </form>
    </div>
  );
};

export default AdminPanel;
