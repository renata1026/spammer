import './App.css';
import React, { useEffect, useState } from 'react';
import { API } from './api';

import Message from './components/Message';
import MessageList from './components/MessageList';

const App = () => {
  const [messageData, setMessageData] = useState([]);

  const fetchMessageData = async () => {
    try {
      const response = await fetch(`${API}/messages`);
      const info = await response.json();
        console.log(info)
      setMessageData(info.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessageData();
  }, []);

  return (
    <div>
      <Message fetchMessageData={fetchMessageData} />
      <MessageList
        messageData={messageData}
        fetchMessageData={fetchMessageData}
      />
    </div>
  );
};

export default App;
