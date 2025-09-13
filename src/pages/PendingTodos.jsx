import React, { useState, useEffect } from "react";
import { FaTrash, FaCheck, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { getDatabase, ref, onValue, remove, update } from "firebase/database";
import { useAuth } from "../context/AuthContext";
import Pagination from "./Pagination";

function PendingTodos() {
  const { currentUser } = useAuth();
  const db = getDatabase();
  const [pendingTasks, setPendingTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [editingDueDate, setEditingDueDate] = useState("");
  const tasksPerPage = 5;

  useEffect(() => {
    if (!currentUser) return;
    const tasksRef = ref(db, `todos/${currentUser.uid}`);
    onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      const today = new Date().toISOString().split("T")[0];
      const loadedTasks = data
        ? Object.keys(data)
            .map((key) => ({ id: key, ...data[key] }))
            .filter((task) => task.dueDate < today)
        : [];
      setPendingTasks(loadedTasks);
      setCurrentPage(1);
    });
  }, [currentUser, db]);

  const toggleComplete = (id, completed) => {
    const taskRef = ref(db, `todos/${currentUser.uid}/${id}`);
    update(taskRef, { completed: !completed });
  };

  const deleteTask = (id) => {
    const taskRef = ref(db, `todos/${currentUser.uid}/${id}`);
    remove(taskRef);
  };

  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditingText(task.text);
    setEditingDueDate(task.dueDate);
  };

  const cancelEditing = () => {
    setEditingTaskId(null);
    setEditingText("");
    setEditingDueDate("");
  };

  const saveEdit = (id) => {
    if (!editingText.trim() || !editingDueDate) return;
    const taskRef = ref(db, `todos/${currentUser.uid}/${id}`);
    update(taskRef, { text: editingText, dueDate: editingDueDate });
    cancelEditing();
  };

  // Pagination
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = pendingTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(pendingTasks.length / tasksPerPage);

  return (
    <section className="bg-gradient-to-r from-[#e0f7fa] via-[#e6f2ff] to-[#f0faff] text-gray-900 py-20 px-6">
      <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">
          Pending Todos
        </h2>

        {currentTasks.length === 0 ? (
          <p className="text-gray-600 text-center">No pending tasks!</p>
        ) : (
          <ul className="space-y-4">
            {currentTasks.map((task) => (
              <li
                key={task.id}
                className="flex flex-col md:flex-row justify-between items-start md:items-center p-3 rounded-lg shadow hover:shadow-md transition bg-red-100"
              >
                <div className="flex flex-col md:flex-row gap-2 md:items-center">
                  {editingTaskId === task.id ? (
                    <>
                      <input
                        type="text"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                      <input
                        type="date"
                        value={editingDueDate}
                        onChange={(e) => setEditingDueDate(e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </>
                  ) : (
                    <span className="font-semibold">{task.text}</span>
                  )}
                  <div className="text-sm text-gray-700">
                    Added: {task.createdAt} | Due: {task.dueDate}
                  </div>
                </div>

                <div className="flex gap-2 mt-2 md:mt-0">
                  {editingTaskId === task.id ? (
                    <>
                      <button
                        onClick={() => saveEdit(task.id)}
                        className="text-blue-500 hover:text-blue-700 transition"
                        title="Save"
                      >
                        <FaSave />
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="text-gray-500 hover:text-gray-700 transition"
                        title="Cancel"
                      >
                        <FaTimes />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => toggleComplete(task.id, task.completed)}
                        className="text-green-500 hover:text-green-700 transition"
                        title="Toggle Complete"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => startEditing(task)}
                        className="text-blue-500 hover:text-blue-700 transition"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-red-500 hover:text-red-700 transition"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          onNext={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          color="red"
        />
      </div>
    </section>
  );
}

export default PendingTodos;
