import React from 'react';
import { useState } from 'react';
import EditMessage from './EditMessage';
import DeleteMessage from './DeleteMessage';
import PostMessage from './PostMessage';
import { API } from '../api';

const MessageList = ({ messageData, fetchMessageData, handleDelete }) => {
  console.log(messageData);
  console.log(fetchMessageData);

  return (
    <div>
      {messageData.map((message) => (
        <div key={message.id} className="message">
          <div className="message-container">
            <div className="flex-container">
              <EditMessage
                message={message}
                fetchMessageData={fetchMessageData}
              />
            </div>
            <div className="icon-container">
              <button className="button-emoji">↩️</button>
              <div>
                <button className="button-emoji">👍0</button>
              </div>
              <DeleteMessage
                messageId={message.id}
                fetchMessageData={fetchMessageData}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
