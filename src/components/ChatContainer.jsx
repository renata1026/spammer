import React, { useState } from 'react';
import MessageList from './MessageList';
import ReplyMessage from './ReplyMessage';

const ChatContainer = () => {
  const [isReplyFormVisible, setIsReplyFormVisible] = useState(false);

  // Function to toggle reply form visibility
  const handleToggleReplyForm = () => {
    setIsReplyFormVisible(!isReplyFormVisible);
  };

  return (
    <div>
      <MessageList
        isReplyFormVisible={isReplyFormVisible}
        handleToggleReplyForm={handleToggleReplyForm}
      />
      {isReplyFormVisible && (
        <ReplyMessage handleToggleReplyForm={handleToggleReplyForm} />
      )}
    </div>
  );
};

export default ChatContainer;
