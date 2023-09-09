import React, { useState } from 'react';
import { API } from '../api';

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
      console.log('Like Success'); // Check if this block is being executed
      fetchMessageData();
      setLikeCount(newLikeCount); // Update likeCount in the component's state
    } else {
      console.error('Like Failed:', info.error); // Log an error message if the like fails
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
