/// Message.jsx
import React, { useState } from 'react';
import { API } from '../api';

const Message = ({ fetchMessageData }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputValue }),
      });

      const info = await response.json();
      if (info.success) {
        fetchMessageData();
        setInputValue('');
      }
    } catch (error) {
      console.error('Error posting new message:', error);
    }
  };

  return (
    <div>
      <h1>Spammer</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          onChange={handleInputChange}
          type="text"
          value={inputValue}
          placeholder="What's your message?"
        />
        <button className="post-button" type="submit">
          Post Message
        </button>
      </form>
    </div>
  );
};

export default Message;
