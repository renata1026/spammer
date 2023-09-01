import React, { useState } from 'react';
import { API } from '../api';
import MessageList from './MessageList';

const ReplyMessage = ({ message, messageId, fetchMessageData }) => {
  const [reply, setReply] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  const handleIsReplying = () => {
    setIsReplying(!isReplying);
  };

  const handleReplyOnChange = (e) => {
    setReply(e.target.value);
  };

  const formReplyOnSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted');
    console.log('Reply:', reply);
    const response = await fetch(`${API}/message/${messageId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: reply }),
    });
    const info = await response.json();
    if (info.success) {
      fetchMessageData();
      setReply('');
      setIsReplying(false);
    }
  };

  return (
    <div>
      {isReplying ? (
        <form onSubmit={formReplyOnSubmit} className="reply">
          <input onChange={handleReplyOnChange} type="text" value={reply} />
          <button type="submit" className="button-emoji reply">
            Submit
          </button>
        </form>
      ) : (
        <div>
          <p>{reply}</p>
          <button onClick={handleIsReplying} className="button-emoji reply">
            ↩️ Reply
          </button>
        </div>
      )}
    </div>
  );
};

export default ReplyMessage;
