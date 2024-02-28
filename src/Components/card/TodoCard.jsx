import React, { useEffect, useState } from 'react';
import './dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faPlus, faBars, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'; // Add the required icons
import Modal from '../Modal/Modal';
import baseUrl from "../api";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';


const Dashboard = () => {
    const [showModal, setShowModal] = useState(false);
   
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
            axios.get(`${baseUrl}/todo/getall/${id}`, config).then((res) => {
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
        const shareableLink = `${currentUrl}/${id}`;

        // Copy the shareable link to the clipboard
        await navigator.clipboard.writeText(shareableLink);
        toast.success('Linked Copied!')

        // console.log("Shareable link copied to clipboard:", shareableLink);

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

   

    return (



        <div className="parent-card">

            <div className="first-card">
                <div className="card-header">
                    <h3>Todo</h3>
                    <div className="card-buttons">
                        <FontAwesomeIcon icon={faPlus} onClick={openModal} />
                        <FontAwesomeIcon icon={faBars} onClick={handleCloseAllDropDown} />
                    </div>
                </div>

                {childData.map((ele, index) => (
                    <div className="child-card" key={index}>
                        <div className="card-header">
                            <h3>{ele.title}</h3>
                            <div className='child-data-button'>
                                <div>{new Date(ele.dueDate).toLocaleString('en-US', { day: '2-digit', month: 'short' })}</div>
                                <div className='child-button'>backlog</div>
                                <div className='child-button'>progree</div>
                                <div className='child-button'>done</div>

                            </div>
                            <div className="card-buttons">
                                <FontAwesomeIcon icon={cardVisibility[ele._id]?.dummyDataVisible ? faAngleUp : faAngleDown} onClick={() => toggleDummyData(ele._id)} />
                                <FontAwesomeIcon icon={faEllipsisV} onClick={() => togglethreedot(ele._id)} />
                            </div>

                            {cardVisibility[ele._id]?.showOptions && (
                                <div className="dropdown">
                                    <div>Edit</div>
                                    <div onClick={() => handleShareTodo(ele._id)}>Share</div>
                                    <div onClick={() => handleDeleteTodo(ele._id)}>Delete</div>
                                </div>
                            )}
                        </div>
                        <div className="child-data">
                            {cardVisibility[ele._id]?.dummyDataVisible && (
                                <div>
                                    {ele.task.map((task, index) => (
                                        <input type='text' value={task} key={index} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {showModal && <Modal closeModal={closeModal} />}
        </div>



    )
};

export default Dashboard;
