import React, { useEffect, useState } from 'react';
import { API } from '../api';
import Message from './Message';
// import EditMessage from './EditMessage';
import MessageList from './MessageList';

const PostMessage = () => {
  const [messageData, setMessageData] = useState([]);

  const fetchMessageData = async () => {
    const response = await fetch(`${API}/messages`);
    const info = await response.json();
    setMessageData(info.messages);
  };

  const handleNewMessage = async (newMessage) => {
    const response = await fetch(`${API}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: newMessage }),
    });
    const info = await response.json();
    if (info.success) {
      // Update the messageData state to include the new message
      setMessageData((prevMessageData) => [
        ...prevMessageData,
        { id: info.id, text: newMessage },
      ]);
    }
  };

  useEffect(() => {
    fetchMessageData();
  }, []);

  return (
    <div>
      <Message fetchMessageData={fetchMessageData} />
      <MessageList
        messageData={sortedMessages}
        fetchMessageData={fetchMessageData}
      />
    </div>
  );
};

export default PostMessage;
