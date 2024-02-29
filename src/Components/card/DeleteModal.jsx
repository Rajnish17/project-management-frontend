import React from 'react';
// import './deleteModal.css';

const DeleteModal = ({ onClose, onDelete }) => {
    return (
        <div className="delete-modal-overlay">
            <div className="delete-modal">
                <h2>Delete Confirmation</h2>
                <p>Are you sure you want to delete this todo?</p>
                <div className="buttons">
                    <button onClick={onDelete}>Yes</button>
                    <button onClick={onClose}>No</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
