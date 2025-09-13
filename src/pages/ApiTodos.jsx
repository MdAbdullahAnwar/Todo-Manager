import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";

function ApiTodos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=50")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  const handleUpdate = (id, updatedFields) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, ...updatedFields } : t)));
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <section className="bg-gradient-to-r from-[#e0f7fa] via-[#e6f2ff] to-[#f0faff] text-gray-900 py-20 px-6">
      <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-purple-600 mb-6 text-center">API Todos</h2>
        <TodoList
          todos={todos}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          showDueDate={false}
          cardColor="bg-orange-100"
          completedColor="bg-green-100"
        />
      </div>
    </section>
  );
}

export default ApiTodos;
