import React from "react";
import { FaTasks } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";

function Header() {
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const mode = queryParams.get("mode");

  return (
    <header className="bg-[linear-gradient(135deg,#0f2027,#203a43,#2c5364)] shadow-lg p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-yellow-300 text-2xl font-bold tracking-wide flex items-center gap-2">
          <FaTasks className="text-green-500" />
          Todo Manager
        </h1>

        <nav className="space-x-6">
          {currentUser ? (
            <>
              <a href="/" className="text-white hover:text-teal-400 transition">
                Home
              </a>
              <a href="/todos" className="text-white hover:text-teal-400 transition">
                Todos
              </a>
              <a href="/about" className="text-white hover:text-teal-400 transition">
                About
              </a>
              <button
                onClick={logout}
                className="text-white hover:text-red-400 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {mode === "signup" ? (
                <a
                  href="/auth?mode=login"
                  className="text-teal-400 hover:text-yellow-300 border border-teal-400 hover:border-yellow-300 px-5 py-2 rounded-lg transition"
                >
                  Login
                </a>
              ) : (
                <a
                  href="/auth?mode=signup"
                  className="text-teal-400 hover:text-yellow-300 border border-teal-400 hover:border-yellow-300 px-5 py-2 rounded-lg transition"
                >
                  Signup
                </a>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
