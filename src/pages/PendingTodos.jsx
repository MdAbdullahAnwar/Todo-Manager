import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, update, remove } from "firebase/database";
import { useAuth } from "../context/AuthContext";
import TodoList from "./TodoList";

function PendingTodos() {
  const { currentUser } = useAuth();
  const db = getDatabase();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (!currentUser) return;
    const tasksRef = ref(db, `todos/${currentUser.uid}`);
    onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      const today = new Date().toISOString().split("T")[0];
      const pendingTodos = data
        ? Object.keys(data)
            .map((key) => ({ id: key, ...data[key] }))
            .filter((t) => t.dueDate < today && !t.completed)
        : [];

      pendingTodos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

      setTodos(pendingTodos);
    });
  }, [currentUser, db]);

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
      <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">
          Pending Todos
        </h2>
        <TodoList
          todos={todos}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          showDueDate={true}
          cardColor="bg-red-100"
          completedColor="bg-green-100"
        />
      </div>
    </section>
  );
}

export default PendingTodos;
