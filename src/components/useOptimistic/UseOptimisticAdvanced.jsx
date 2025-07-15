import React, { useEffect, useOptimistic, useState } from "react";
import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { formDataToObject, sleep } from "../../utils/common-utils";

const FormSubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      className="w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400 cursor-pointer"
      type="submit"
      disabled={pending}
    >
      {pending ? "Submitting" : "Submit"}
    </button>
  );
};

const PostForm = ({ addPost }) => {
  const formRef = useRef();

  const formAction = async (formData) => {
    await addPost(formData);
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
          name="title"
          defaultValue={"Nasir Ahmed"}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <input
          className="border border-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          type="text"
          placeholder="Enter Description"
          name="description"
          defaultValue={"Nasir is a good guy"}
        />
      </div>
      <div className="flex items-center justify-between">
        <FormSubmitButton />
      </div>
    </form>
  );
};

export default function UseOptimisticAdvanced() {
  const [posts, setPosts] = useState([]);
  const [optimisticPosts, dispatch] = useOptimistic(posts, (state, action) => [
    ...state,
    action,
  ]);

  const createPost = async (post) => {
    await sleep(1500);
    return {
      id: crypto.randomUUID(),
      ...post,
    };
  };

  const handleAddPost = async (formData) => {
    const payload = formDataToObject(formData);
    const optimisticPost = {
      ...payload,
      id: crypto.randomUUID(),
      pending: true,
    };
    dispatch(optimisticPost);

    const nextPost = await createPost(payload);
    setPosts((prev) => [...prev, nextPost]);
  };

  return (
    <>
      <PostForm addPost={handleAddPost} />

      {optimisticPosts.length > 0 && (
        <div className="mt-2 p-4 border border-b-blue-950 border-dashed">
          {optimisticPosts.map((p) => (
            <div
              key={p.id}
              className={`mt-2 w-full ${
                p.pending ? "bg-cyan-600/60" : "bg-cyan-600"
              } text-white rounded p-4 flex justify-between items-center`}
            >
              <div>
                <p>{p.title}</p>
                <p>{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
