import React from "react";
import { FaTasks } from "react-icons/fa";

function Header() {
  return (
    <header className="bg-[linear-gradient(135deg,#0f2027,#203a43,#2c5364)] shadow-lg p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-yellow-300 text-2xl font-bold tracking-wide flex items-center gap-2">
          <FaTasks className="text-green-500" />
          Todo Manager
        </h1>
        <nav className="space-x-6">
          <a href="/" className="text-white hover:text-teal-400 transition">
            Home
          </a>
          <a href="/todos" className="text-white hover:text-teal-400 transition">
            Todos
          </a>
          <a href="/about" className="text-white hover:text-teal-400 transition">
            About
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
