import React from 'react';
import Chat from './Chat';

const ChatScreen = () => {
  const libroId = window.location.pathname.split('/').pop();

  return (
    <div>
      <Chat libroId={libroId} />
    </div>
  );
};

export default ChatScreen;
