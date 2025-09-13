import React, { useState, useEffect } from "react";
import {
  getDatabase,
  ref,
  push,
  onValue,
  update,
  remove,
} from "firebase/database";
import { useAuth } from "../context/AuthContext";
import TodoList from "./TodoList";

function Todos() {
  const { currentUser } = useAuth();
  const db = getDatabase();
  const [todos, setTodos] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (!currentUser) return;
    const tasksRef = ref(db, `todos/${currentUser.uid}`);
    onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      const loadedTodos = data
        ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
        : [];

      loadedTodos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

      setTodos(loadedTodos);
    });
  }, [currentUser, db]);

  const addTask = () => {
    if (!taskInput.trim() || !dueDate) return;
    const tasksRef = ref(db, `todos/${currentUser.uid}`);
    const currentDate = new Date().toISOString().split("T")[0];
    push(tasksRef, {
      text: taskInput,
      completed: false,
      createdAt: currentDate,
      dueDate,
    });
    setTaskInput("");
    setDueDate("");
  };

  const handleUpdate = (id, updatedFields) => {
    const taskRef = ref(db, `todos/${currentUser.uid}/${id}`);
    update(taskRef, updatedFields);
  };

  const handleDelete = (id) => {
    const taskRef = ref(db, `todos/${currentUser.uid}/${id}`);
    remove(taskRef);
  };

  return (
    <section className="bg-gradient-to-r from-[#e0f7fa] via-[#e6f2ff] to-[#f0faff] text-gray-900 py-20 px-6">
      <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-teal-600 mb-8 text-center">
          Your Todos
        </h2>

        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <input
            type="text"
            placeholder="Add a new task..."
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            className="flex-grow p-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="p-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
          />
          <button
            onClick={addTask}
            className="bg-teal-500 text-white px-6 py-3 rounded-2xl hover:bg-teal-600 transition flex items-center gap-2 shadow-md"
          >
            Add
          </button>
        </div>

        <TodoList
          todos={todos}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          showDueDate={true}
          cardColor="bg-yellow-100"
          completedColor="bg-green-100"
        />
      </div>
    </section>
  );
}

export default Todos;
