import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import baseUrl from '../api';
import './sharetodo.css';

const ShareTodo = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  

    const fetchTodo = async () => {
      try {
        const response = await axios.get(`${baseUrl}/share/${id}`);
        setTodo(response.data.task);
      } catch (error) {
        setError('Error fetching todo');
        console.error('Error fetching todo:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='todo-container'>
      <h3>Pro Manage</h3>
      {todo ? (
        <div className='todo-card'>
          <div className="todo-card-item">
            <p className={`todo-priority ${todo.priority}`}>{todo.priority}</p>
            <h2>{todo.title}</h2>
            <div>
              {todo.task.map((ele, index) => (
                <div key={index}>
                  <input type="text" value={ele} readOnly />
                </div>
              ))}
            </div>
            <p className={`todo-priority ${todo.priority}`}>{(todo.dueDate) && `Due Date:- ${new Date(todo.dueDate).toLocaleString('en-US', { day: '2-digit', month: 'short' })}`}</p>

          </div>
        </div>
      ) : (
        <div>Todo not found</div>
      )}
    </div>
  );
};

export default ShareTodo;
