import React, { useState } from "react";
import { FaTrash, FaCheck, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import Pagination from "./Pagination";

function TodoList({
  todos,
  onUpdate,
  onDelete,
  todosPerPage = 5,
  cardColor = "bg-white",
  completedColor = "bg-green-100",
  showDueDate = false,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [editingDueDate, setEditingDueDate] = useState("");

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
  const totalPages = Math.ceil(todos.length / todosPerPage);

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditingText(todo.title || todo.text);
    setEditingDueDate(todo.dueDate || "");
  };

  const saveEdit = (todo) => {
    if (!editingText.trim() || (showDueDate && !editingDueDate)) return;
    onUpdate(
      todo.id,
      showDueDate
        ? { text: editingText, dueDate: editingDueDate }
        : { title: editingText }
    );
    setEditingId(null);
    setEditingText("");
    setEditingDueDate("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
    setEditingDueDate("");
  };

  return (
    <>
      <ul className="space-y-4">
        {currentTodos.length === 0 ? (
          <p className="text-gray-600 text-center">No todos!</p>
        ) : (
          currentTodos.map((todo) => (
            <li
              key={todo.id}
              className={`p-4 rounded-lg shadow-md transition flex flex-col md:flex-row justify-between items-center ${
                todo.completed ? completedColor + " line-through" : cardColor
              }`}
            >
              <div className="flex gap-2 items-center flex-1">
                {editingId === todo.id ? (
                  <>
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="p-2 border border-gray-300 rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    {showDueDate && (
                      <input
                        type="date"
                        value={editingDueDate}
                        onChange={(e) => setEditingDueDate(e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                      />
                    )}
                  </>
                ) : (
                  <span className="font-semibold">
                    {todo.title || todo.text}
                  </span>
                )}
              </div>

              {showDueDate && editingId !== todo.id && (
                <div className="text-sm text-gray-500 md:mx-4 text-center">
                  Due: {todo.dueDate}
                </div>
              )}

              <div className="flex gap-2 mt-2 md:mt-0">
                {editingId === todo.id ? (
                  <>
                    <button
                      onClick={() => saveEdit(todo)}
                      className="text-blue-500 hover:text-blue-700 transition"
                    >
                      <FaSave />
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="text-gray-500 hover:text-gray-700 transition"
                    >
                      <FaTimes />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() =>
                        onUpdate(todo.id, { completed: !todo.completed })
                      }
                      className="text-green-500 hover:text-green-700 transition"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => startEditing(todo)}
                      className="text-blue-500 hover:text-blue-700 transition"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => onDelete(todo.id)}
                      className="text-red-500 hover:text-red-700 transition"
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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        onNext={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
      />
    </>
  );
}

export default TodoList;
