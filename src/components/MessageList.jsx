import React, { useEffect, useState } from 'react';
import EditMessage from './EditMessage';
import LikeMessage from './LikeMessage';
import DeleteMessage from './DeleteMessage';
import PostMessage from './PostMessage';
import ReplyMessage from './ReplyMessage';
import { API } from '../api';

const MessageList = ({ messageData, fetchMessageData }) => {
  // Reverse the order of messageData to display newest messages first
  const [sortedMessages, setSortedMessages] = useState([]);
  useEffect(() => {
    if (messageData) {
        console.log(messageData)
      const sortedData = messageData
        .sort((a, b) => a.text.localeCompare(b.text));
      setSortedMessages(sortedData);
        console.log(sortedData);

    }
  }, [messageData]);
  // Slice the sortedMessages array to include only the first 10 comments
  const limitedMessages = sortedMessages.slice(0, 10);
  return (
    <div className="wrapper">
      <div className="chat-container">
        {limitedMessages.map((message) => (

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
                  childs={message.children}
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
