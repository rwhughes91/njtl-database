import React, { useState, useEffect } from 'react';
import FlashMessage, { FlashMessageContainer } from './FlashMessage';
import Bus from '../../../utils/Bus';
import { v4 } from 'uuid';

const Flash = ({ top }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let timer;
    Bus.addListener('flash', ({ message, type }) => {
      const id = v4();
      setMessages((prevState) => {
        return [...prevState, { id, type, message }];
      });
      timer = setTimeout(() => {
        setMessages((prevState) => {
          return prevState.filter((message) => id !== message.id);
        });
      }, 6000);
    });
    return () => {
      Bus.removeAllListeners('flash');
      clearTimeout(timer);
    };
  }, []);

  const flashMessages = messages.map((message) => {
    return (
      <FlashMessage
        type={message.type}
        message={message.message}
        key={message.id}
      />
    );
  });
  return (
    <FlashMessageContainer top={top}>{flashMessages}</FlashMessageContainer>
  );
};

export default React.memo(Flash);
