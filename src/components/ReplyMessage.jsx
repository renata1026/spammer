import React, { useState } from 'react';
import { API } from '../api';

const ReplyMessage = ({ fetchMessageData }) => {
  const [reply, setReply] = useState('');
  const [replies, setReplies] = useState([]);
  const [isReplying, setIsReplying] = useState(false);
  const [background, setBackground] = useState(false);

  const handleReplyOnChange = (e) => {
    setReply(e.target.value);
  };

  const toggleReplyForm = () => {
    setBackground(!background);
    setIsReplying(!isReplying);
  };

  const handleFormReplySubmit = async (e) => {
    e.preventDefault();
    toggleReplyForm();

    // Send the reply to the server
    const response = await fetch(`${API}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: reply }),
    });

    const info = await response.json();
    console.log(info);
    if (info.success) {
      // Fetch updated message data after posting the reply
      fetchMessageData();
      // Reset the reply input
      setReply('');

      // Add the new reply to the replies array
      setReplies((prevReplies) => [
        ...prevReplies,
        { id: info.id, text: reply },
      ]);
    }
  };

  return (
    <div className="reply-container">
      <div className="reply-content">
        <button
          style={{ display: isReplying ? 'none' : 'block' }}
          onClick={toggleReplyForm}
          className="button-emoji"
        >
          ↩️
        </button>
        {isReplying ? (
          <form onSubmit={handleFormReplySubmit} className="reply-form">
            <input
              onChange={handleReplyOnChange}
              type="text"
              value={reply}
              placeholder="Your reply"
            />
            <button
              style={{ display: isReplying ? 'block' : 'none' }}
              type="submit"
              className="button-emoji button"
            >
              Reply
            </button>
            <button
              onClick={toggleReplyForm}
              type="button"
              className="button-emoji button"
            >
              Cancel
            </button>
          </form>
        ) : null}

        {/* Render reply messages */}
        {replies.map((reply) => (
          <div
            key={reply.id}
            className={`reply-message ${
              background ? 'none' : 'reply-background'
            }`}
          >
            <p>{reply.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReplyMessage;
