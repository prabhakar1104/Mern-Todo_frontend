import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useTheme } from "../context/ThemeContext";
import { MdLightMode, MdDarkMode, MdLogout, MdAdd, MdDelete, MdEdit } from "react-icons/md";
import { FiCheckSquare, FiSquare } from "react-icons/fi";
import { API_URL } from '../config/config';

export const Dashboard = () => {
  const [task, setTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const navigate = useNavigate();
  let [tasklist, setTaskList] = useState([]);
  const { darkMode, toggleTheme } = useTheme();

  const token = localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const handleToggleComplete = (id) => {
    axios.put(`${API_URL}/updateStatus/${id}`, {}, config)
      .then((result) => {
        setTaskList(prev => 
          prev.map(todo => 
            todo._id === id ? {...todo, completed: !todo.completed} : todo
          )
        );
        toast.success('Task status updated!');
      })
      .catch((err) => toast.error('Failed to update task status'));
  };

  const handleSubmit = (e) => {
    if (!task.trim()) {
      toast.warning('Please enter a task');
      return;
    }
    axios.post(`${API_URL}/add`, { task: task }, config)
      .then((result) => {
        setTask("");
        toast.success('Task added successfully!');
        return axios.get(`${API_URL}/get`, config);
      })
      .then((result) => setTaskList(result.data))
      .catch((err) => toast.error('Failed to add task'));
  };

useEffect(() => {
    axios.get(`${API_URL}/get`, config)
        .then((result) => setTaskList(result.data))
        .catch((err) => {
            if (err.response?.status === 401) {
                toast.error('Please login again');
                navigate('/login');
            } else {
                toast.error('Failed to fetch tasks');
                console.error(err);
            }
        });
}, [navigate]);

  const handleDelete = (id) => {
    axios.delete(`${API_URL}/delete/${id}`, config)
      .then((res) => {
        setTaskList((prev) => prev.filter((todo) => todo._id !== id));
        toast.success('Task deleted successfully!');
      })
      .catch((err) => toast.error('Failed to delete task'));
  };

  const handleEdit = (id, currentText) => {
    setEditingId(id);
    setEditText(currentText);
  };

const handleUpdate = (id) => {
    if (!editText.trim()) {
        toast.warning('Task cannot be empty');
        return;
    }
    
    axios.put(`${API_URL}/update/${id}`, { task: editText }, config)
        .then((result) => {
            setTaskList(prev => 
                prev.map(todo => 
                    todo._id === id ? {...todo, task: editText} : todo
                )
            );
            setEditingId(null);
            setEditText("");
            toast.success('Task updated successfully!');
        })
        .catch((err) => {
            toast.error(err.response?.data?.message || 'Failed to update task');
            setEditingId(null);
        });
  };

  const handleKeyPress = (e) => {
    if(e.key === 'Enter' && task.trim() !== '') {
      handleSubmit();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.info('Logged out successfully');
    navigate('/login');
  };


  const completedTasks = tasklist.filter(task => task.completed).length;
  const totalTasks = tasklist.length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className={`${darkMode ? 'bg-gray-900' : 'bg-gray-50'} min-h-screen transition-colors duration-300`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                ApanaTime
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${darkMode ? 'text-yellow-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                {darkMode ? <MdLightMode size={22} /> : <MdDarkMode size={22} />}
              </button>
              
              <button
                onClick={handleLogout}
                className={`flex items-center px-4 py-2 rounded-md ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
              >
                <MdLogout className="mr-2" size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className={`rounded-xl p-6 shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Total Tasks</h3>
            <p className="text-3xl font-bold mt-2 text-blue-500">{totalTasks}</p>
          </div>
          
          <div className={`rounded-xl p-6 shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Completed</h3>
            <p className="text-3xl font-bold mt-2 text-green-500">{completedTasks}</p>
          </div>
          
          <div className={`rounded-xl p-6 shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Completion Rate</h3>
            <div className="flex items-center mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5 mr-3">
                <div 
                  className="bg-blue-500 h-2.5 rounded-full" 
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
              <span className="text-lg font-bold text-blue-500">{completionPercentage}%</span>
            </div>
          </div>
        </div>

        {/* Add Task Section */}
        <div className={`rounded-xl p-6 shadow-md mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Add New Task</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="What needs to be done?"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyPress={handleKeyPress}
              className={`flex-grow border rounded-lg px-4 py-3 text-lg ${
                darkMode 
                  ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500' 
                  : 'bg-white text-gray-900 border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center font-medium"
              onClick={handleSubmit}
            >
              <MdAdd size={22} className="mr-2" />
              Add Task
            </button>
          </div>
        </div>

        {/* Task List */}
        <div className={`rounded-xl shadow-md overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className={`px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Your Tasks {totalTasks > 0 && <span className="text-sm font-normal text-gray-500">({completedTasks} of {totalTasks} completed)</span>}
            </h2>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {tasklist.length === 0 ? (
              <div className={`py-12 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <div className="text-4xl mb-2">📝</div>
                <p className="text-lg">No tasks yet. Add a task to get started!</p>
              </div>
            ) : (
              tasklist.map((todo) => (
                <div
                  key={todo._id}
                  className={`p-4 flex items-center justify-between group ${
                    darkMode ? 'hover:bg-gray-750' : 'hover:bg-gray-50'
                  } transition-colors duration-200`}
                >
                  <div className="flex items-center gap-4 flex-grow">
                    <button
                      onClick={() => handleToggleComplete(todo._id)}
                      className={`flex-shrink-0 rounded-md p-1 ${
                        todo.completed 
                          ? 'text-green-500 bg-green-100 dark:bg-green-900/30' 
                          : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                      }`}
                    >
                      {todo.completed ? <FiCheckSquare size={22} /> : <FiSquare size={22} />}
                    </button>
                    
                    {editingId === todo._id ? (
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onBlur={() => handleUpdate(todo._id)}
                        onKeyPress={(e) => e.key === 'Enter' && handleUpdate(todo._id)}
                        className={`flex-grow border rounded px-3 py-2 ${
                          darkMode 
                            ? 'bg-gray-700 text-white border-gray-600' 
                            : 'bg-white text-gray-900 border-gray-300'
                        }`}
                        autoFocus
                      />
                    ) : (
                      <span 
                        className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : darkMode ? 'text-gray-200' : 'text-gray-800'}`}
                        onDoubleClick={() => handleEdit(todo._id, todo.task)}
                      >
                        {todo.task}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {editingId !== todo._id && (
                      <button
                        onClick={() => handleEdit(todo._id, todo.task)}
                        className="p-1.5 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-md"
                        title="Edit task"
                      >
                        <MdEdit size={18} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(todo._id)}
                      className="p-1.5 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-md"
                      title="Delete task"
                    >
                      <MdDelete size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <footer className={`mt-12 py-6 text-center ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
        <p>ApanaTime © {new Date().getFullYear()} - Your productivity companion</p>
      </footer>
    </div>
  );
};