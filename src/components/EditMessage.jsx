import React, { useState } from 'react';
import { API } from '../api';

const EditMessage = ({ fetchMessageData, message }) => {
  const [editedText, setEditedText] = useState(message.text);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditChange = (e) => {
    setEditedText(e.target.value); // Update the editedText state as the user types
  };

  const handleEditClick = async (e) => {
    e.preventDefault();
    console.log('Edited Text:', editedText); // Check if editedText is correct
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
      console.log('Edit Success'); // Check if this block is being executed
      fetchMessageData();
      setIsEditing(false);
    } else {
      console.error('Edit Failed:', info.error); // Log an error message if the edit fails
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false); // Close the edit mode on cancel
    setEditedText(message.text); // Revert editedText to the original message text
    console.log('Canceled Editing'); // Log a message when editing is canceled
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing); // Toggle the isEditing state
    console.log('Toggled Edit Mode'); // Log a message when edit mode is toggled
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
            ✏️
          </button>
        </div>
      )}
    </div>
  );
};

export default EditMessage;
