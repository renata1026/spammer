import React, { useState } from 'react';
import { API } from '../api';
import EditMessage from './EditMessage';
import LikeMessage from './LikeMessage';
import DeleteMessage from './DeleteMessage';

const ReplyMessage = ({ parentId, fetchMessageData, childs }) => {
  const filteredChilds = childs.filter((child) => child.isDeleted === false);
  const [reply, setReply] = useState('');

  const onDeleted = (id) => {
    const updatedChilds = childs.map((child) => {
      console.log(child.id, id);
      if (child.id === id) {
        return {
          ...child,
          isDeleted: true,
        };
      }
      return child;
    });

    console.log(updatedChilds);

    setReplies(updatedChilds.filter((child) => child.isDeleted === false));
  };

  const [replies, setReplies] = useState(filteredChilds);

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
      body: JSON.stringify({ text: reply, parentId }),
    });

    const info = await response.json();

    // Fetch updated message data after posting the reply
    fetchMessageData();
    // Reset the reply input
    setReply('');

    // Add the new reply to the replies array
    setReplies((prevReplies) => [...prevReplies, { id: info.id, text: reply }]);
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
        {/* /*Render reply messages */}
        {replies?.map((message) => (
          <div key={message.id} className="message">
            <div className="message-container">
              <div className="flex-container">
                <EditMessage
                  message={message}
                  fetchMessageData={fetchMessageData}
                />
              </div>

              <div className="icon-container">
                <LikeMessage
                  messageId={message.id}
                  fetchMessageData={fetchMessageData}
                />
                <DeleteMessage
                  messageId={message.id}
                  parentId={parentId}
                  onChildDeleted={onDeleted}
                  fetchMessageData={fetchMessageData}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReplyMessage;
