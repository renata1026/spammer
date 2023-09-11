import './App.css';
import React, { useEffect, useState } from 'react';
import { API } from './api';
import 'font-awesome/css/font-awesome.min.css';

import Message from './components/Message';
import MessageList from './components/MessageList';
import Footer from './components/Footer';

const App = () => {
  const [messageData, setMessageData] = useState([]);

  const fetchMessageData = async () => {
    try {
      const response = await fetch(`${API}/messages`);
      const info = await response.json();

      setMessageData(info.messages);
    } catch (error) {}
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

      <Footer />
    </div>
  );
};

export default App;
