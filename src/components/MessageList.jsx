import React from 'react';
import MessageEdit from './MessageEdit';

const MessageList = ({ messageData, fetchMessageData }) => {
  return (
    <div>
      {messageData.map((message) => (
        <div key={message.id} className="message">
          <div className="message-container">
            <div className="flex-container">
              <MessageEdit
                message={message}
                fetchMessageData={fetchMessageData}
              />
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
