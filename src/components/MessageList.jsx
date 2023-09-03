import React, { useState } from 'react';
import EditMessage from './EditMessage';
import LikeMessage from './LikeMessage';
import DeleteMessage from './DeleteMessage';
import PostMessage from './PostMessage';
import ReplyMessage from './ReplyMessage';

import { API } from '../api';

const MessageList = ({ messageData, fetchMessageData }) => {
  const [replyingMessageId, setReplyingMessageId] = useState(null);

  const handleReply = (parentId, replyId) => {
    // Set the replying message ID when a reply button is clicked
    setReplyingMessageId(parentId);
  };

  return (
    <div className="wrapper">
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

              <div className="icon-container">
                <LikeMessage
                  messageId={message.id}
                  fetchMessageData={fetchMessageData}
                />
                <DeleteMessage
                  messageId={message.id}
                  fetchMessageData={fetchMessageData}
                />
                <ReplyMessage
                  fetchMessageData={fetchMessageData}
                  parentId={message.id}
                  onReply={() => handleReply(message.id)}
                />
              </div>
            </div>

            {/* Render nested reply container if replyingMessageId matches */}
            {message.id === replyingMessageId && (
              <ReplyMessage
                fetchMessageData={fetchMessageData}
                parentId={message.id}
                onReply={() => handleReply(message.id)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageList;
