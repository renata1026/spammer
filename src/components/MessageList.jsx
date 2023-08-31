import React from 'react';
import MessageFetch from './MessageFetch';
import Message from './Message';

const MessageList = ({ messageData }) => {
  console.log(messageData);
  return (
    <div>
      {messageData.map((message) => (
        <div key={message.id} className="message">
          <div className="message-container">
            <div className="flex-container">
              <p>{message.text}</p>
              <button className="button-emoji">✏️</button>
            </div>

            <div className="icon-container">
              <button className="button-emoji">↩️</button>
              <div>
                <button className="button-emoji">👍0</button>
              </div>
              <button className="button-emoji">🗑️</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
