import React, { useEffect, useState } from 'react';
import './dashboard.css';
import axios from 'axios';
import baseUrl from '../api';

import BacklogCard from "../card/BacklogCard";
import DoneCard from "../card/DoneCard";
import ProgressCard from "../card/ProgressCard";
import TodoCard from "../card/TodoCard";

const Dashboard = () => {
  const [name, setName] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    try {
      axios.get(`${baseUrl}/user/getone/${userId}`).then((res) => {
        setName(res.data.user.fullName);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const date = () => {
    const today = new Date();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return today.toLocaleDateString(undefined, options);
  };

  return (
    <div className='main-container'>
      
      <div className="topbox">
        <div className='headText'>welcome {name && `${name}`}</div>
        <div className='headTime'>{date()}</div>
      </div>

      <div className="head">
        <div><h3>board</h3></div>
        <div>
          <select name="" id="">
            <option value="">this week</option>
            <option value="">this month</option>
            <option value="">today</option>
          </select>
        </div>
      </div>

      <div className="parent-card">
        <div className="four-container">
          <BacklogCard />
          <TodoCard/>
          <ProgressCard />
          <DoneCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
