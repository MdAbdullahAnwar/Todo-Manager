import React, { useState, useEffect } from "react";
import { FaTrash, FaCheck, FaEdit, FaSave, FaTimes, FaPlus } from "react-icons/fa";
import Pagination from "./Pagination";

function ApiTodos() {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const todosPerPage = 5;

  // Fetch initial todos from API
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=50")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  // Add new todo locally
  const addTodo = () => {
    if (!newTodo.trim()) return;
    const todo = {
      id: todos.length + 1,
      title: newTodo,
      completed: false,
    };
    setTodos([todo, ...todos]);
    setNewTodo("");
    setCurrentPage(1);
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  // Toggle complete
  const toggleComplete = (id) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // Start editing
  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditingText(todo.title);
  };

  // Save edit
  const saveEdit = (id) => {
    if (!editingText.trim()) return;
    setTodos(todos.map((t) => (t.id === id ? { ...t, title: editingText } : t)));
    setEditingId(null);
    setEditingText("");
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  // Pagination
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
  const totalPages = Math.ceil(todos.length / todosPerPage);

  return (
    <section className="bg-gray-50 py-10 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center">API Todos</h2>

        {/* Add Todo */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Add new todo..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            onClick={addTodo}
            className="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition flex items-center gap-2"
          >
            <FaPlus /> Add
          </button>
        </div>

        {/* Todo List */}
        <ul className="space-y-4">
          {currentTodos.length === 0 ? (
            <p className="text-gray-600 text-center">No todos!</p>
          ) : (
            currentTodos.map((todo) => (
              <li
                key={todo.id}
                className={`p-4 rounded-lg shadow-md transition ${
                  todo.completed ? "bg-green-100 line-through" : "bg-orange-100"
                } flex justify-between items-center`}
              >
                {/* Todo Text */}
                <div className="flex gap-2 items-center flex-1">
                  {editingId === todo.id ? (
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="p-2 border border-gray-300 rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  ) : (
                    <span className="font-semibold">{todo.title}</span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {editingId === todo.id ? (
                    <>
                      <button
                        onClick={() => saveEdit(todo.id)}
                        className="text-blue-500 hover:text-blue-700 transition"
                        title="Save"
                      >
                        <FaSave />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="text-gray-500 hover:text-gray-700 transition"
                        title="Cancel"
                      >
                        <FaTimes />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => toggleComplete(todo.id)}
                        className="text-green-500 hover:text-green-700 transition"
                        title="Toggle Complete"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => startEditing(todo)}
                        className="text-blue-500 hover:text-blue-700 transition"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="text-red-500 hover:text-red-700 transition"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))
          )}
        </ul>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          onNext={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
        />
      </div>
    </section>
  );
}

export default ApiTodos;
