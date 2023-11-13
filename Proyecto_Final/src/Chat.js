import React, { useState } from 'react';

const Chat = ({ libroId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    const newMessageObject = {
      id: Date.now(), 
      sender: 'Usuario', 
      message: newMessage,
    };

    setMessages([...messages, newMessageObject]);
    setNewMessage('');
  };

  return (
    <div>
      <h3>Chat</h3>
      <div className="messages-container">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <p>{message.sender}: {message.message}</p>
          </div>
        ))}
      </div>
      <div className="new-message-container">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
