import React, { useState } from 'react';
import { API } from '../api';

const ReplyMessage = () => {
  const [reply, setReply] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const [replyMessage, setReplyMessage] = useState([]);

  const handleReplyOnChange = (e) => {
    setReply(e.target.value);
  };

  const handleFormReplySubmit = async (e) => {
    e.preventDefault();

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
      // Update the replyMessage state to include the new message
      setReplyMessage((prevReplyMessage) => [
        ...prevReplyMessage,
        { id: info.id, text: reply },
      ]);
      // Reset the reply input
      setReply('');
    }
  };

  const toggleReplyForm = () => {
    setIsReplying(!isReplying);
  };

  return (
    <div className="reply-container">
      <div className="reply-content">
        {isReplying ? (
          <form onSubmit={handleFormReplySubmit} className="reply-form">
            <input
              onChange={handleReplyOnChange}
              type="text"
              value={reply}
              placeholder="Your reply"
            />
            <button type="submit" className="button-emoji reply-button">
              Reply
            </button>
            <button
              onClick={toggleReplyForm}
              type="button" // Change type to 'button' to prevent form submission
              className="button-emoji reply-button"
            >
              Cancel
            </button>
          </form>
        ) : (
          <div className="reply-message">
            <p>{reply}</p>
            <button onClick={toggleReplyForm} className="button-emoji">
              ↩️
            </button>
          </div>
        )}

        {/* Render reply messages */}
        {replyMessage.map((message) => (
          <div key={message.id} className="reply-message">
            <p>{message.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReplyMessage;
