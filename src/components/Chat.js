import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Container, ListGroup } from 'react-bootstrap';
import Avatar from 'react-avatar';

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
    dispatch({ type: 'ADD_MESSAGE', payload: { username, message, timestamp: new Date() } });
    setMessage('');
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadMoreMessages = () => {
    dispatch({ type: 'LOAD_MORE_MESSAGES' });
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { // Check if Enter key was pressed without Shift
      e.preventDefault(); // Prevent default behavior (form submission)
      handleSend(); // Call handleSend function to submit message
    }
  };
  return (
    <Container className="mt-5">
      <ListGroup>
        {messages.slice(-page * 25).map((msg, index) => (
          <ListGroup.Item
            key={index}
            className={`d-flex ${msg.username === username ? 'justify-content-end' : 'justify-content-start'}`}
          >
            <Avatar name={msg.username} size="40" round={true} className="me-2" />
            <div className={`p-2 ${msg.username === username ? 'bg-primary text-white' : 'bg-light'}`} style={{ borderRadius: '10px', maxWidth: '60%' }}>
              <strong>{msg.username}:</strong> {msg.message}
              <div className="text-muted small">{new Date(msg.timestamp).toLocaleTimeString()}</div>
            </div>
          </ListGroup.Item>
        ))}
        <div ref={chatEndRef} />
      </ListGroup>
      <div className="d-flex justify-content-center my-3">
        <Button onClick={loadMoreMessages}>Load More</Button>
      </div>
      <Form className="d-flex">
        <Form.Control
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="me-2"
          onKeyDown={handleKeyPress}
          style={{ flex: '1', borderRadius: '20px 0 0 20px', backgroundColor: '#f2f2f2' }} // Adjust input box style
        />
        <Button onClick={handleSend} variant="primary" style={{ borderRadius: '0 20px 20px 0' }}>Send</Button> {/* Adjust send button style */}
      </Form>
    </Container>
  );
};

export default Chat;