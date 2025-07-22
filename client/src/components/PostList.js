import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const PostList = ({ posts: newPosts }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const fetchedPosts = querySnapshot.docs.map(doc => doc.data());

      // Sort by date descending
      fetchedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, [newPosts]);

  return (
    <div className="space-y-4">
      {posts.map((post, index) => (
        <div
          key={index}
          className="bg-gradient-to-br from-white to-blue-50 border border-blue-100 p-5 rounded-2xl shadow-md hover:shadow-xl transition"
        >
          <p className="text-gray-800 text-lg">{post.content}</p>
          <p className="text-sm text-gray-500 mt-2">
            Posted on: {post.date}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
