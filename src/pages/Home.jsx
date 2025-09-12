import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaListAlt, FaRocket } from "react-icons/fa";

function Home() {
  return (
    <section className="bg-gradient-to-r from-[#e0f7fa] via-[#e6f2ff] to-[#f0faff] text-gray-900 py-32 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        
        <div className="text-center md:text-left max-w-lg">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Welcome to{" "}
            <span className="text-teal-600">Todo Manager</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600">
            Organize your tasks, stay productive, and achieve your goals with ease.
          </p>
          <div className="mt-6 flex justify-center md:justify-start gap-4">
            <Link
              to="/todos"
              className="bg-teal-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-teal-600 transition"
            >
              Start Managing
            </Link>
            <Link
              to="/about"
              className="border border-teal-500 px-6 py-3 rounded-full shadow-lg hover:bg-teal-500 hover:text-white transition"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full md:w-1/2">
          <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition">
            <FaCheckCircle className="text-teal-500 text-4xl mx-auto mb-3" />
            <h3 className="text-lg font-semibold">Quick Add</h3>
            <p className="text-sm text-gray-600">
              Add tasks instantly and stay on top of your work.
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition">
            <FaListAlt className="text-blue-500 text-4xl mx-auto mb-3" />
            <h3 className="text-lg font-semibold">Organize</h3>
            <p className="text-sm text-gray-600">
              Group and manage tasks with ease.
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition">
            <FaRocket className="text-indigo-500 text-4xl mx-auto mb-3" />
            <h3 className="text-lg font-semibold">Boost Productivity</h3>
            <p className="text-sm text-gray-600">
              Track progress and accomplish more daily.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
