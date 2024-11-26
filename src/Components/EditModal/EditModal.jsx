import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import baseUrl from "../api";

const EditModal = ({ closeModal, itemId }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("low");
  const [dueDate, setDueDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handlePriorityChange = (e) => setPriority(e.target.value);
  const handleDueDateChange = (e) => setDueDate(e.target.value);

  const handleAddTask = () => setTasks([...tasks, ""]);
  const handleTaskChange = (index, e) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = e.target.value;
    setTasks(updatedTasks);
  };
  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const formattedDueDate = dueDate !== "" ? dueDate : null;

      const config = {
        headers: {
          token: `bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      if (!title) {
        setError("Please provide a title");
        return;
      }

      if (tasks.length === 0 || tasks[0] === "") {
        setError("Please add at least one task");
        return;
      }

      const data = {
        title,
        task: tasks,
        priority,
        dueDate: formattedDueDate,
      };

      const response = await axios.put(
        `${baseUrl}/backlog/update/${itemId}`,
        data,
        config
      );
      closeModal();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full overflow-y-auto h-[500px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Item</h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title:</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Priority:</label>
          <select
            value={priority}
            onChange={handlePriorityChange}
            className="w-full p-2 border rounded"
          >
            <option value="Low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>
        </div>

        {tasks.map((task, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={task}
              onChange={(e) => handleTaskChange(index, e)}
              className="flex-grow p-2 border rounded"
            />
            <FontAwesomeIcon
              icon={faTrash}
              className="text-red-500 ml-2 cursor-pointer"
              onClick={() => handleDeleteTask(index)}
            />
          </div>
        ))}

        <button
          onClick={handleAddTask}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add New
        </button>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={handleDueDateChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {error && <div className="text-red-600 text-center mb-4">{error}</div>}

        <div className="flex justify-between">
          <button
            onClick={closeModal}
            className="px-4 py-2 text-red-500 border border-red-500 rounded hover:bg-red-500 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
