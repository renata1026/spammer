import React, { useState } from 'react';

const Message = ({ onMessageSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onMessageSubmit(inputValue);
    setInputValue('');
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        onChange={handleInputChange}
        type="text"
        value={inputValue}
        placeholder="What's your message?"
      />
      <button type="submit">Post Message</button>
    </form>
  );
};

export default Message;
