import React, { useState } from 'react';
import { API } from '../api';

const MessageEdit = ({ fetchMessageData, message }) => {
  const [editedText, setEditedText] = useState(message.text);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditChange = (e) => {
    setEditedText(e.target.value); // Update the editedText state as the user types
  };

  const handleEditClick = async () => {
    try {
      console.log('Edited Text:', editedText); // Check if editedText is correct
      const response = await fetch(`${API}/message/${message.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: editedText,
        }),
      });

      console.log('Response:', response); // Check the response from the API

      const info = await response.json();
      console.log('Info:', info); // Check the info object from the response

      if (info.success) {
        console.log('Edit Success'); // Check if this block is being executed
        fetchMessageData();
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error editing message:', error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false); // Close the edit mode on cancel
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex-container">
      {isEditing ? (
        <>
          <input type="text" value={editedText} onChange={handleEditChange} />
          <button onClick={handleEditClick} className="button-emoji">
            Edit
          </button>
          <button onClick={handleCancelClick} className="button-emoji">
            Cancel
          </button>
        </>
      ) : (
        <>
          <p>{message.text}</p>
          <button className="button-emoji" onClick={toggleEdit}>
            ✏️
          </button>
        </>
      )}
    </div>
  );
};

export default MessageEdit;
