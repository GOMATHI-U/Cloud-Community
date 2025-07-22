import React, { useEffect, useState } from "react";
import AdminPanel from "./components/AdminPanel";
import PostList from "./components/PostList";
import Login from "./components/Login";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);
        const roleRef = doc(db, "roles", u.uid);
        const roleSnap = await getDoc(roleRef);
        if (roleSnap.exists()) {
          setRole(roleSnap.data().role);
        } else {
          setRole("user");
        }
      } else {
        setUser(null);
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAddPost = (post) => {
    setPosts([post, ...posts]);
  };

  if (!user) return <Login />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 p-6 transition-all duration-500 ease-in-out">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-3xl p-8 transition-all duration-500">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-600 text-center mb-8">
          ☁️ CloudCommunity Info Board
        </h1>

        {role === "admin" && (
          <div className="mb-10">
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-2xl shadow-md border border-blue-200">
              <h2 className="text-xl font-semibold text-blue-700 mb-2">Admin Panel</h2>
              <AdminPanel onAddPost={handleAddPost} />
            </div>
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">📣 Latest Posts</h2>
          <PostList posts={posts} />
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          Logged in as: <span className="font-semibold text-blue-600">{role}</span>
        </p>
      </div>
    </div>
  );
}

export default App;
