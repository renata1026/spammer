import React from 'react';
import EditMessage from './EditMessage';
import LikeMessage from './LikeMessage';
import DeleteMessage from './DeleteMessage';
import PostMessage from './PostMessage';
import ReplyMessage from './ReplyMessage';
import { useEffect, useState } from 'react';

import { API } from '../api';

const MessageList = ({ messageData, fetchMessageData }) => {
  // Reverse the order of messageData to display newest messages first
  const [sortedMessages, setSortedMessages] = useState([]);
  useEffect(() => {
    if (messageData) {
      const sortedData = messageData
        .slice()
        .sort((a, b) => Number(b.id) - Number(a.id));
      setSortedMessages(sortedData);
    }
  }, [messageData]);
  return (
    <div className="wrapper">
      <div className="chat-container">
        {sortedMessages.map((message) => (
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
                  fetchMessageData={fetchMessageData}
                />
                <ReplyMessage
                  fetchMessageData={fetchMessageData}
                  parentId={message.id}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageList;
