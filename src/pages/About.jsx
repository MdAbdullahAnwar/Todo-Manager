import React from "react";
import { FaBullseye, FaClock, FaUserFriends } from "react-icons/fa";

function About() {
  return (
    <section className="bg-gradient-to-r from-[#f0faff] via-[#e6f2ff] to-[#e0f7fa] text-gray-900 py-32 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">

        <div className="text-center md:text-left max-w-lg">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            About <span className="text-teal-600">Todo Manager</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            Todo Manager helps you organize your daily tasks efficiently.  
            Stay productive, plan ahead, and never miss a deadline again.
          </p>
          <p className="text-gray-600 mb-6">
            Designed for individuals and teams, it’s simple, intuitive, and fast.  
            Manage your life and work in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full md:w-1/2">
          <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition">
            <FaBullseye className="text-teal-500 text-4xl mx-auto mb-3" />
            <h3 className="text-lg font-semibold">Focus</h3>
            <p className="text-sm text-gray-600">Keep your tasks organized and prioritize what matters most.</p>
          </div>

          <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition">
            <FaClock className="text-blue-500 text-4xl mx-auto mb-3" />
            <h3 className="text-lg font-semibold">Time Management</h3>
            <p className="text-sm text-gray-600">Track deadlines and complete tasks efficiently with ease.</p>
          </div>

          <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition">
            <FaUserFriends className="text-indigo-500 text-4xl mx-auto mb-3" />
            <h3 className="text-lg font-semibold">Collaboration</h3>
            <p className="text-sm text-gray-600">Work with friends or teams to achieve goals together.</p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default About;
