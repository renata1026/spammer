import React, { useState } from 'react';
import { API } from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

const EditMessage = ({ fetchMessageData, message }) => {
  const [editedText, setEditedText] = useState(message.text);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditChange = (e) => {
    setEditedText(e.target.value); // Update the editedText state as the user types
  };

  const handleEditClick = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API}/messages/${message.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: editedText,
      }),
    });

    const info = await response.json();

    if (info.success) {
      fetchMessageData();
      setIsEditing(false);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false); // Close the edit mode on cancel
    setEditedText(message.text); // Revert editedText to the original message text
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing); // Toggle the isEditing state
  };

  return (
    <div className="flex-container">
      {isEditing ? (
        <form onSubmit={handleEditClick} className="edit-form">
          <input type="text" value={editedText} onChange={handleEditChange} />
          <button type="submit" className="button-emoji button">
            Submit
          </button>
          <button
            type="button"
            onClick={handleCancelClick}
            className="button-emoji button"
          >
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <p>{editedText}</p>
          <button className="button-emoji" onClick={toggleEdit}>
            <FontAwesomeIcon icon={faPencil} />
          </button>
        </div>
      )}
    </div>
  );
};

export default EditMessage;
