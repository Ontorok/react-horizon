import React, { useState } from "react";
import { useRef } from "react";

const PostForm = ({ addPost }) => {
  const formRef = useRef();
  const formAction = async (formData) => {
    const payload = {};
    formData.forEach((value, key) => (payload[key] = value));

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1500);
    });

    addPost(payload);
    formRef.current.reset();
  };

  return (
    <form
      className="p-4 border border-green-950 border-dashed"
      action={formAction}
      ref={formRef}
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="title"
        >
          Title
        </label>
        <input
          className="border border-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          type="text"
          placeholder="Enter title"
          name="name"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="title"
        >
          Description
        </label>
        <input
          className="border border-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          type="text"
          placeholder="Enter Description"
          name="description"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default function FormAction() {
  const [posts, setPosts] = useState([]);

  const handlePostAdd = (newPost) => {
    setPosts((prev) => [...prev, { id: prev.length + 1, ...newPost }]);
  };
  return (
    <>
      <PostForm addPost={handlePostAdd} />

      {posts.length > 0 && (
        <div className="mt-2 p-4 border border-b-blue-950 border-dashed">
          {posts.map((p) => (
            <div
              key={p.id}
              className="mt-2 w-full bg-cyan-600 text-white rounded p-4"
            >
              <p>{p.name}</p>
              <p>{p.description}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
