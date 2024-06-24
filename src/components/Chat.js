import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, ListGroup, ListGroupItem, Form, Button } from 'react-bootstrap';

const Chat = () => {
  const messages = useSelector((state) => state.messages);
  const username = useSelector((state) => state.username);
  const page = useSelector((state) => state.page);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const chatEndRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      // Force update to sync between tabs
      dispatch({ type: 'SYNC_MESSAGES' });
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const handleSend = () => {
    if (message.trim() !== '') {
      dispatch({ type: 'ADD_MESSAGE', payload: { username, message, timestamp: new Date() } });
      setMessage('');
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const loadMoreMessages = () => {
    dispatch({ type: 'LOAD_MORE_MESSAGES' });
  };

  return (
    <Container>
      <ListGroup>
        {messages.slice(-page * 25).map((msg, index) => (
          <ListGroupItem key={index}>
            <strong>{msg.username}:</strong> {msg.message} <br />
            <small className="text-muted">{new Date(msg.timestamp).toLocaleTimeString()}</small>
          </ListGroupItem>
        ))}
        <div ref={chatEndRef} />
      </ListGroup>
      {page * 25 < messages.length && (
        <Button variant="link" onClick={loadMoreMessages}>
          Load More
        </Button>
      )}
      <Form.Group className="mt-3">
        <Form.Control
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </Form.Group>
      <Button onClick={handleSend} className="mt-2">Send</Button>
    </Container>
  );
};

export default Chat;