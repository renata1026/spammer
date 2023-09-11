// DeleteMessage.js
import React, { useState } from 'react';
import { API } from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const DeleteMessage = ({
  messageId,
  onChildDeleted,
  fetchMessageData,
  parentId,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    const response = await fetch(`${API}/messages/${messageId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ parentId }),
    });
    const info = await response.json();

    fetchMessageData();

    setIsDeleting(false);

    if (onChildDeleted) {
      onChildDeleted(messageId);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="button-emoji"
      disabled={isDeleting}
    >
      <FontAwesomeIcon icon={faTrashCan} />
    </button>
  );
};

export default DeleteMessage;
