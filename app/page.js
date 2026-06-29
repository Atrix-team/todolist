"use client";

import React, { useState, useEffect } from "react";

const Page = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState([]);


const fetchTodos = async () => {
  try {
    const res = await fetch("/api/todos");
    const data = await res.json();

    if (Array.isArray(data)) {
      setMainTask(data);
    } else {
      setMainTask([]);
    }
  } catch (error) {
    console.log("Error fetching todos:", error);
    setMainTask([]);
  }
};


  const submitHandler = async (e) => {
    e.preventDefault();

    if (!title || !desc) return;

    try {
      await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          desc,
        }),
      });

      setTitle("");
      setDesc("");

      fetchTodos(); // refresh list
    } catch (error) {
      console.log("Error adding todo:", error);
    }
  };



  const deleteHandler = async (id) => {
    await fetch(`/api/todos?id=${id}`, {
      method: "DELETE",
    });

    fetchTodos();
  };


  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h1 className="text-center bg-blue-300 text-6xl p-7 font-bold">
        Todo App
      </h1>

      {/* FORM */}
      <form className="text-center" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Enter Task Here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-2 m-7 p-2"
        />

        <input
          type="text"
          placeholder="Enter Description Here"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="border-2 m-7 p-2"
        />

        <button className="bg-black text-white p-2.5">Add Task</button>
      </form>

      <hr />

      {/* TASK LIST */}
      <div className="p-8 bg-slate-100 text-center">
        <ul>
          {mainTask.length === 0 ? (
            <h2>No Task Available</h2>
          ) : (
            (Array.isArray(mainTask) ? mainTask : []).map((t, i) => (
              <li
                key={t._id || i}
                className="flex items-center justify-between mb-4"
              >
                <div className="flex justify-between w-6xl">
                  <h5 className="text-2xl font-semibold">TITLE: {t.title}</h5>

                  <h6 className="text-xl font-semibold">DESC: {t.desc}</h6>

                  <button
                    onClick={() => deleteHandler(t._id)}
                    className="bg-red-400 text-white px-4 py-2 rounded cursor-pointer">
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Page;
