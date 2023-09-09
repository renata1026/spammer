// DeleteMessage.jsx
import React, { useState } from 'react';
import { API } from '../api';

const DeleteMessage = ({ messageId, fetchMessageData }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const response = await fetch(`${API}/messages/${messageId}`, {
      method: 'DELETE',
    });
    const info = await response.json();
    if (info.success) {
      fetchMessageData();
    }
    setIsDeleting(false);
  };

  return (
    <button
      onClick={handleDelete}
      className="button-emoji"
      disabled={isDeleting}
    >
      🗑️
    </button>
  );
};

export default DeleteMessage;
