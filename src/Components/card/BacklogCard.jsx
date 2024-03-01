import React, { useEffect, useState } from 'react';
import './dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faWindowRestore, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import baseUrl from "../api";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Modal from "../EditModal/EditModal"

const BacklogCard = ({ filter }) => {
  const [childData, setChildData] = useState([]);
  const [cardVisibility, setCardVisibility] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [editItemId, setEditItemId] = useState(null);


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
      axios.get(`${baseUrl}/backlog/getall/${id}`, config).then((res) => {
        // console.log(res.data);
        setChildData(res.data);

      });
    } catch (error) {
      console.log(error);
    }
  }, [childData]);


  //delte toto api call
  const handleDeleteTodo = async (id) => {
    console.log(id);
    try {
      const token = localStorage.getItem('token');

      const config = {
        headers: {
          'token': `bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      await axios.delete(`${baseUrl}/backlog/delete/${id}`, config).then((res) => {
        // console.log(res.data);
        toast.success('Backlog Deleted!')

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

  //close three dot close anywhere

  const togglethreedot = (id) => {
    const newVisibility = {
      ...cardVisibility,
      [id]: {
        ...cardVisibility[id],
        showOptions: !cardVisibility[id]?.showOptions
      }
    };
    setCardVisibility(newVisibility);

    // Close three dots menu when clicking outside
    const handleClickOutside = (event) => {
      if (!event.target.closest('.child-card')) {
        setCardVisibility(prevState => ({
          ...prevState,
          [id]: {
            ...prevState[id],
            showOptions: false
          }
        }));
        document.removeEventListener('click', handleClickOutside);
      }
    };

    if (newVisibility[id]?.showOptions) {
      document.addEventListener('click', handleClickOutside);
    }
  };


  const handleCloseAllDropDown = () => {
    const updatedVisibility = {};
    for (const id in cardVisibility) {
      updatedVisibility[id] = { ...cardVisibility[id], showOptions: false, dummyDataVisible: false };
    }
    setCardVisibility(updatedVisibility);
  };


  //add to todo from backlog
  const handleTodo = async (id) => {
    try {
      const token = localStorage.getItem('token');

      const config = {
        headers: {
          'token': `bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      await axios.post(`${baseUrl}/backlog/todo/${id}`, config).then((res) => {
        console.log(res.data);
        toast.success('Todo added to Todo!')

      });
      // console.log("success");
    } catch (error) {
      console.log(error);
    }
  }
  // add to done from backlog
  const handleDone = async (id) => {
    try {
      const token = localStorage.getItem('token');

      const config = {
        headers: {
          'token': `bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      await axios.post(`${baseUrl}/backlog/done/${id}`, config).then((res) => {
        console.log(res.data);
        toast.success('Todo added to done!')

      });
      // console.log("success");
    } catch (error) {
      console.log(error);
    }
  }
  //add to progress from backlog
  const handleProgress = async (id) => {
    try {
      const token = localStorage.getItem('token');

      const config = {
        headers: {
          'token': `bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      await axios.post(`${baseUrl}/backlog/progress/${id}`, config).then((res) => {
        console.log(res.data);
        toast.success('Todo added to progress!')

      });
      // console.log("success");
    } catch (error) {
      console.log(error);
    }
  }


  const handleEditTodo = (id) => {
    setEditItemId(id);
    setShowModal(true);
  }


  return (
    <div className="parent-card">
      <Toaster />
      <div className="first-card">
        <div className="card-header">
          <h3>Backlog</h3>
          <div className="card-buttons">
            <FontAwesomeIcon icon={faWindowRestore} onClick={handleCloseAllDropDown} />
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

                {cardVisibility[ele._id]?.showOptions && (
                  <div className="dropdown">
                    <div onClick={() => handleEditTodo(ele._id)} >Edit</div>
                    <div onClick={() => handleShareTodo(ele._id)}>Share</div>
                    <div onClick={() => handleDeleteTodo(ele._id)}>Delete</div>
                  </div>
                )}

              </div>





            </div>
            <div className="child-data">
              {cardVisibility[ele._id]?.dummyDataVisible && (
                <div className='child-input'>
                  {ele.task.map((task, index) => (
                    <input type='text' value={task} key={index} />
                  ))}
                </div>
              )}
            </div>

            <div className='child-data-button'>
              <div className={`todo-priority ${ele.priority}`}>{(ele.dueDate) && new Date(ele.dueDate).toLocaleString('en-US', { day: '2-digit', month: 'short' })}</div>
              <div className='child-button' onClick={() => { handleTodo(ele._id) }}>Todo</div>
              <div className='child-button' onClick={() => { handleProgress(ele._id) }}>progree</div>
              <div className='child-button' onClick={() => { handleDone(ele._id) }}>done</div>

            </div>
          </div>
        ))}
      </div>
      {showModal && <Modal closeModal={() => setShowModal(false)} itemId={editItemId} />}
    </div>





  );
};

export default BacklogCard;
