import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./context/ThemeContext";
import { MdLightMode, MdDarkMode, MdArrowForward } from "react-icons/md";
import {
  FiCheckCircle,
  FiCalendar,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdLogout } from "react-icons/md";

export const Home = () => {
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate(); 

  return (
    <div
      className={`${
        darkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-800"
          : "bg-gradient-to-br from-blue-50 to-indigo-100"
      } min-h-screen flex flex-col justify-between transition-colors duration-500`}
    >
      {/* Header */}
      <header
        className={`${
          darkMode ? "bg-gray-800/90" : "bg-white/90"
        } backdrop-blur-sm py-4 px-6 flex justify-between items-center sticky top-0 z-10 shadow-sm`}
      >
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-3 shadow-md">
            <span className="text-white font-bold text-lg">AT</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ApanaTime
          </h1>
        </div>
        <div className="flex items-center gap-4">
          {/* Conditional rendering of auth buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {localStorage.getItem("token") ? (
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  toast.success("Logged out successfully");
                  navigate("/login");
                }}
                className="px-4 py-2 rounded-lg font-medium text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <MdLogout size={20} />
                Logout
              </button>
            ) : (
              <>
                <Link to="/login">
                  <button
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      darkMode
                        ? "text-white hover:bg-gray-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="px-4 py-2 rounded-lg font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg">
                    Register
                  </button>
                </Link>
              </>
            )}
          </div>

          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-full ${
              darkMode
                ? "bg-gray-700 text-amber-300 hover:bg-gray-600"
                : "bg-gray-100 text-indigo-600 hover:bg-gray-200"
            } transition-all duration-300 shadow-sm`}
          >
            {darkMode ? <MdLightMode size={22} /> : <MdDarkMode size={22} />}
          </button>
        </div>
      </header>
      

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-sm font-medium mb-6 bg-white/80 backdrop-blur-sm shadow-sm border border-gray-200/50">
            <span className="h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
            <span className="text-gray-700">
              Now with enhanced productivity features
            </span>
          </div>

          <h1
            className={`text-5xl md:text-6xl font-bold mb-6 leading-tight ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Master Your Time,{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Maximize Productivity
            </span>
          </h1>

          <p
            className={`text-xl max-w-2xl mx-auto mb-10 leading-relaxed ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            ApanaTime helps you organize tasks, track progress, and achieve your
            goals with intuitive tools designed for modern professionals.
          </p>

          <Link to="/dashboard">
            <button className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center mx-auto">
              Get Started Now
              <MdArrowForward
                className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                size={20}
              />
            </button>
          </Link>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className={`p-6 rounded-2xl ${
                darkMode ? "bg-gray-800/50" : "bg-white/80"
              } backdrop-blur-sm border ${
                darkMode ? "border-gray-700/50" : "border-gray-200/50"
              } shadow-sm hover:shadow-md transition-all duration-300`}
            >
              <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 mx-auto">
                <FiCheckCircle
                  className="text-blue-600 dark:text-blue-400"
                  size={26}
                />
              </div>
              <h3
                className={`text-xl font-semibold mb-3 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Smart Task Management
              </h3>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Organize tasks with priority levels, due dates, and categories
                for maximum efficiency.
              </p>
            </div>

            <div
              className={`p-6 rounded-2xl ${
                darkMode ? "bg-gray-800/50" : "bg-white/80"
              } backdrop-blur-sm border ${
                darkMode ? "border-gray-700/50" : "border-gray-200/50"
              } shadow-sm hover:shadow-md transition-all duration-300`}
            >
              <div className="w-14 h-14 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4 mx-auto">
                <FiTrendingUp
                  className="text-purple-600 dark:text-purple-400"
                  size={26}
                />
              </div>
              <h3
                className={`text-xl font-semibold mb-3 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Progress Analytics
              </h3>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Track your productivity with visual reports and insights to
                improve your workflow.
              </p>
            </div>

            <div
              className={`p-6 rounded-2xl ${
                darkMode ? "bg-gray-800/50" : "bg-white/80"
              } backdrop-blur-sm border ${
                darkMode ? "border-gray-700/50" : "border-gray-200/50"
              } shadow-sm hover:shadow-md transition-all duration-300`}
            >
              <div className="w-14 h-14 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4 mx-auto">
                <FiUsers
                  className="text-green-600 dark:text-green-400"
                  size={26}
                />
              </div>
              <h3
                className={`text-xl font-semibold mb-3 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Team Collaboration
              </h3>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Share tasks and projects with your team for seamless
                collaboration and accountability.
              </p>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer
        className={`py-8 text-center ${
          darkMode ? "text-gray-500" : "text-gray-600"
        }`}
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-4">
            <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ApanaTime
            </span>{" "}
            - Your productivity companion
          </div>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} ApanaTime. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
