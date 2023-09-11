import React, { useState } from 'react';
import { API } from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const LikeMessage = ({ messageId, fetchMessageData }) => {
  const [likeCount, setLikeCount] = useState(0);

  const handleLikes = async () => {
    // Increment likeCount and store it in a variable as a number
    const newLikeCount = likeCount + 1;

    const response = await fetch(`${API}/messages/${messageId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        likes: parseInt(newLikeCount), // Use the newLikeCount variable
      }),
    });

    const info = await response.json();

    if (info.success) {
      fetchMessageData();
      setLikeCount(newLikeCount); // Update likeCount in the component's state
    }
  };

  return (
    <div>
      <button onClick={handleLikes} className="button-emoji">
        <FontAwesomeIcon icon={faHeart} style={{ marginRight: '10px' }} />
        {likeCount}
      </button>
    </div>
  );
};

export default LikeMessage;
