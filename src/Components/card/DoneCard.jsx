import React, { useEffect, useState } from 'react';
import './dashboard.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faWindowRestore , faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'; // Add the required icons
import baseUrl from "../api";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const DoneCard = () => {
  const [childData, setChildData] = useState([]);
  const [cardVisibility, setCardVisibility] = useState({});

 

  useEffect(() => {
    try {
      const id = localStorage.getItem("userId");
      const token = localStorage.getItem('token');

      const config = {
        headers: {
          'token': `bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      axios.get(`${baseUrl}/done/getall/${id}`, config).then((res) => {
        // console.log(res.data);
        setChildData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [childData]);

  //delte toto api call
  const handleDeleteTodo = async (id) => {
   
    try {
      const token = localStorage.getItem('token');

      const config = {
        headers: {
          'token': `bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      await axios.delete(`${baseUrl}/done/delete/${id}`,config).then((res) => {
        console.log(res.data);
        toast.success('Done todo Deleted!')
      });
    } catch (error) {
      console.log(error);
    }
  }
  // share todo api call
  const handleShareTodo = async (id) => {
    const currentUrl = window.location.href;
    const shareableLink = `${currentUrl}/${id}`;
    await navigator.clipboard.writeText(shareableLink);
    toast.success('Linked Copied!')

  }

  

  const toggleDummyData = (id) => {
    setCardVisibility(prevState => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        dummyDataVisible: !prevState[id]?.dummyDataVisible
      }
    }));
  };

  const togglethreedot = (id) => {
    setCardVisibility(prevState => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        showOptions: !prevState[id]?.showOptions
      }
    }));
  };

  const handleCloseAllDropDown = () => {
    const updatedVisibility = {};
    for (const id in cardVisibility) {
      updatedVisibility[id] = { ...cardVisibility[id], showOptions: false, dummyDataVisible: false };
    }
    setCardVisibility(updatedVisibility);
  };


     //add to backlog from done
     const handleBacklog = async (id) => {
      try {
          const token = localStorage.getItem('token');
  
          const config = {
              headers: {
                  'token': `bearer ${token}`,
                  'Content-Type': 'application/json'
              }
          };
          await axios.post(`${baseUrl}/done/backlog/${id}`, config).then((res) => {
              console.log(res.data);
             
                  toast.success('Todo added to backlog!')
              
          });
          // console.log("success");
      } catch (error) {
          console.log(error);
      }
  }
  // add to progress from done
  const handleprogress = async (id) => {
      try {
          const token = localStorage.getItem('token');
  
          const config = {
              headers: {
                  'token': `bearer ${token}`,
                  'Content-Type': 'application/json'
              }
          };
          await axios.post(`${baseUrl}/done/progress/${id}`, config).then((res) => {
              console.log(res.data);
              toast.success('Todo added to Progress!')
              
          });
          // console.log("success");
      } catch (error) {
          console.log(error);
      }
  }
  //add to todo from done
  const handleTodo = async (id) => {
      try {
          const token = localStorage.getItem('token');
  
          const config = {
              headers: {
                  'token': `bearer ${token}`,
                  'Content-Type': 'application/json'
              }
          };
          await axios.post(`${baseUrl}/done/todo/${id}`, config).then((res) => {
              console.log(res.data);
              toast.success('Todo added to Todo!')
             
          });
          // console.log("success");
      } catch (error) {
          console.log(error);
      }
  }
 
  

  return (
    <div className="parent-card">
    <Toaster/>
      <div className="first-card">
        <div className="card-header">
          <h3>Done</h3>
          <div className="card-buttons">
            <FontAwesomeIcon icon={faWindowRestore } onClick={handleCloseAllDropDown} />
          </div>
        </div>

        {childData.map((ele, index) => (
          <div className="child-card" key={index}>
             <span className={`todo-priority ${ele.priority}`}>{ele.priority.toUpperCase()} PRIORITY </span>
            <div className="card-header">
              <h3>{ele.title}</h3>
             
              <div className="card-buttons">
                <FontAwesomeIcon icon={cardVisibility[ele._id]?.dummyDataVisible ? faAngleUp : faAngleDown} onClick={() => toggleDummyData(ele._id)} />
                <FontAwesomeIcon icon={faEllipsisV} onClick={() => togglethreedot(ele._id)} />
              </div>
              
              {cardVisibility[ele._id]?.showOptions && (
                <div className="dropdown">
                  {/* <div>Edit</div> */}
                  <div onClick={() => handleShareTodo(ele._id)}>Share</div>
                  <div onClick={() => handleDeleteTodo(ele._id)}>Delete</div>
                </div>
              )}
            </div>
            <div className="child-data">
              {cardVisibility[ele._id]?.dummyDataVisible && (
                <div className='child-input'>
                  {ele.task.map((task, index) => (
                    <input type='text'  value={task} key={index}/>
                  ))}
                </div>
              )}
            </div>
            <div className='child-data-button'>
                            <div className={`todo-priority ${ele.priority}`}>{(ele.dueDate) && new Date(ele.dueDate).toLocaleString('en-US', { day: '2-digit', month: 'short' })}</div>
                            <div className='child-button' onClick={() => { handleBacklog(ele._id) }}>Backlog</div>
                            <div className='child-button' onClick={() => { handleTodo(ele._id) }}>Todo</div>
                            <div className='child-button' onClick={() => { handleprogress(ele._id) }}>Progress</div>

                        </div>
                    </div>
        ))}
      </div>
    </div>
  );
};

export default DoneCard;
