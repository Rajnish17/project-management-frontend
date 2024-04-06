import React, { useEffect, useState } from 'react';
import './dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faPlus, faWindowRestore, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'; // Add the required icons
import Modal from '../Modal/Modal';
import baseUrl from "../api";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import DeleteModal from "./DeleteModal"


const Dashboard = () => {
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setshowDeleteModal] = useState(false);
    const [childData, setChildData] = useState([]);
    const [cardVisibility, setCardVisibility] = useState({});


    useEffect(() => {
        try {
            const userId = localStorage.getItem("userId");
            const token = localStorage.getItem('token');

            const config = {
                headers: {
                    'token': `bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };
            axios.get(`${baseUrl}/todo/getall/${userId}`, config).then((res) => {
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
            await axios.delete(`${baseUrl}/todo/delete/${id}`, config).then((res) => {
                console.log(res.data);
                if (res.status === 200) {
                    toast.success('Todo Deleted!')
                }
            });
            // console.log("success");
        } catch (error) {
            console.log(error);
        }
    }
    // share todo api call
    const handleShareTodo = async (id) => {
        const currentUrl = window.location.href;

        // Append the ID to the current URL
        const shareableLink = `${currentUrl}/share/${id}`;
        await navigator.clipboard.writeText(shareableLink);
        toast.success('Linked Copied!')
    }

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

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
//add to backlog from todo
    const handleBacklog = async (id) => {
        try {
            const token = localStorage.getItem('token');

            const config = {
                headers: {
                    'token': `bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };
            await axios.post(`${baseUrl}/todo/backlog/${id}`, config).then((res) => {
                console.log(res.data);
                toast.success('Todo added to backlog!')
               
            });
            // console.log("success");
        } catch (error) {
            console.log(error);
        }
    }
// add to done from todo
    const handleDone = async (id) => {
        try {
            const token = localStorage.getItem('token');

            const config = {
                headers: {
                    'token': `bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };
            await axios.post(`${baseUrl}/todo/done/${id}`, config).then((res) => {
                console.log(res.data);
                toast.success('Todo added to done!')
               
            });
            // console.log("success");
        } catch (error) {
            console.log(error);
        }
    }
    //add to progress from todo
    const handleProgress = async (id) => {
        try {
            const token = localStorage.getItem('token');

            const config = {
                headers: {
                    'token': `bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };
            await axios.post(`${baseUrl}/todo/progress/${id}`, config).then((res) => {
                console.log(res.data);
                toast.success('Todo added to progress!')
               
            });
            // console.log("success");
        } catch (error) {
            console.log(error);
        }
    }

    //Edit Todo
    const handleEditTodo =(id)=>{
           console.log(id);
    }

    return (



        <div className="parent-card">
            <Toaster />

            <div className="first-card">
                <div className="card-header">
                    <h3>Todo</h3>
                    <div className="card-buttons">
                        <FontAwesomeIcon icon={faPlus} onClick={openModal} />
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
                            </div>

                            {cardVisibility[ele._id]?.showOptions && (
                                <div className="dropdown">
                                    {/* <div onClick={() => handleEditTodo(ele._id)} >Edit</div> */}
                                    <div onClick={() => handleShareTodo(ele._id)}>Share</div>
                                    <div onClick={() => handleDeleteTodo(ele._id)}>Delete</div>
                                </div>
                            )}
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
                            <div className='child-button' onClick={() => { handleBacklog(ele._id) }}>backlog</div>
                            <div className='child-button' onClick={() => { handleProgress(ele._id) }}>progree</div>
                            <div className='child-button' onClick={() => { handleDone(ele._id) }}>done</div>

                        </div>
                    </div>
                ))}
            </div>

            {showModal && <Modal closeModal={closeModal} />}
        </div>



    )
};

export default Dashboard;
