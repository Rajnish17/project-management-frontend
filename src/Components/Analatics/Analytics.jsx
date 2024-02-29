import React, { useEffect, useState } from 'react';
import './Analytics.css';
import axios from 'axios';
import baseUrl from "../api"

const Analytics = () => {
  const [task, setTask] = useState("")

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    try {
      axios.get(`${baseUrl}/alltask/${userId}`).then((res) => {
        setTask(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [task]);

  return (
    <div className="analytics">
      <h2 className="heading">Analytics</h2>
      

        {
          task ? (
            <div className="cards">
            <div className="card">
          <h3>Backlog Tasks {task.backlog}</h3>
          <h3>To-do Tasks {task.todo}</h3>
          <h3>in-Progress Tasks {task.progress}</h3>
          <h3>Completed Tasks {task.done}</h3>
        </div>
        <div className="card">

          <h3>Low Priority {task.lowPriority}</h3>
          <h3>Moderate Priority {task.moderatePriority}</h3>
          <h3>High Priority {task.highPriority}</h3>
          {/* <h3>Due Date Tasks</h3> */}
        </div>
        </div>
          ) : (<div className='loading'>Loading...</div>)
        }
      </div>
    
  );
};

export default Analytics;
