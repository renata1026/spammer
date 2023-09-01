import React from 'react';
import { API } from '../api';
import { useState } from 'react';

const LikeMessage = ({ messageId, fetchMessageData }) => {
  const [likeCount, setLikeCount] = useState(0);

  const handleLikes = async () => {
    setLikeCount((prevLikeCount) => prevLikeCount + 1);
    const response = await fetch(`${API}/message/${messageId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        likes: likeCount,
      }),
    });

    const info = await response.json();

    if (info.success) {
      console.log('Edit Success'); // Check if this block is being executed
      fetchMessageData();
    }
  };

  return (
    <div>
      <button onClick={handleLikes} className="button-emoji">
        👍{likeCount}
      </button>
    </div>
  );
};

export default LikeMessage;
