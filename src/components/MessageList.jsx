import React from 'react';
import EditMessage from './EditMessage';
import LikeMessage from './LikeMessage';
import DeleteMessage from './DeleteMessage';
import PostMessage from './PostMessage';
import ReplyMessage from './ReplyMessage';
import { API } from '../api';

const MessageList = ({ messageData, fetchMessageData }) => {
  return (
    <div className="chat-container">
      {messageData.map((message) => (
        <div
          key={message.id}
          className={`message ${message.isSender ? 'sender' : 'receiver'}`}
        >
          <div className="message-container">
            <div className="flex-container">
              <EditMessage
                message={message}
                fetchMessageData={fetchMessageData}
              />
            </div>
            <ReplyMessage
              messageId={message.id}
              message={message}
              fetchMessageData={fetchMessageData}
            />
            <div className="icon-container">
              <LikeMessage
                messageId={message.id}
                fetchMessageData={fetchMessageData}
              />
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
