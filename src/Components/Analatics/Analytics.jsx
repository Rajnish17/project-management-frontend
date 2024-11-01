import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from "../api";

const Analytics = () => {
  const [task, setTask] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`${baseUrl}/alltask/${userId}`);
        setTask(res.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="analytics p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Analytics</h2>

      {task ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Task Status</h3>
            <p className="text-gray-600">Backlog Tasks: <span className="font-bold">{task.backlog}</span></p>
            <p className="text-gray-600">To-do Tasks: <span className="font-bold">{task.todo}</span></p>
            <p className="text-gray-600">In-Progress Tasks: <span className="font-bold">{task.progress}</span></p>
            <p className="text-gray-600">Completed Tasks: <span className="font-bold">{task.done}</span></p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Task Priority</h3>
            <p className="text-gray-600">Low Priority: <span className="font-bold">{task.lowPriority}</span></p>
            <p className="text-gray-600">Moderate Priority: <span className="font-bold">{task.moderatePriority}</span></p>
            <p className="text-gray-600">High Priority: <span className="font-bold">{task.highPriority}</span></p>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">Loading...</div>
      )}
    </div>
  );
};

export default Analytics;
