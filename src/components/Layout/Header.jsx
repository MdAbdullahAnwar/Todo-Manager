import React from "react";
import { FaTasks } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useLocation, Link } from "react-router-dom";

function Header() {
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const mode = queryParams.get("mode");

  const getLinkClasses = (path) => {
    const base = "px-5 py-2 rounded-lg border transition";
    const active =
      location.pathname === path
        ? "border-teal-500 text-teal-500"
        : "border-transparent text-white hover:text-teal-400";
    return `${base} ${active}`;
  };

  return (
    <header className="bg-[linear-gradient(135deg,#0f2027,#203a43,#2c5364)] shadow-lg p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-yellow-300 text-2xl font-bold tracking-wide flex items-center gap-2">
          <FaTasks className="text-green-500" />
          Todo Manager
        </h1>

        <nav className="flex items-center gap-4">
          {currentUser ? (
            <>
              <Link to="/" className={getLinkClasses("/")}>
                Home
              </Link>
              <Link to="/todos" className={getLinkClasses("/todos")}>
                Todos
              </Link>
              <Link to="/pending" className={getLinkClasses("/pending")}>
                Pending Todos
              </Link>
              <Link to="/api-todos" className={getLinkClasses("/api-todos")}>
                API Todos
              </Link>
              <Link to="/about" className={getLinkClasses("/about")}>
                About
              </Link>
              <button
                onClick={logout}
                className="px-5 py-2 rounded-lg text-white hover:text-red-400 transition border border-transparent"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {mode === "signup" ? (
                <Link
                  to="/auth?mode=login"
                  className="text-teal-400 border border-teal-400 px-5 py-2 rounded-lg transition hover:text-teal-500"
                >
                  Login
                </Link>
              ) : (
                <Link
                  to="/auth?mode=signup"
                  className="text-teal-400 border border-teal-400 px-5 py-2 rounded-lg transition hover:text-teal-500"
                >
                  Signup
                </Link>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
