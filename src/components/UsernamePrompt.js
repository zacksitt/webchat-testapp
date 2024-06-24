import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const UsernamePrompt = () => {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (username.trim() !== '') {
      dispatch({ type: 'SET_USERNAME', payload: username });
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { // Check if Enter key was pressed without Shift
      e.preventDefault(); // Prevent default behavior (form submission)
      handleSubmit(); // Call handleSend function to submit message
    }
  };
  return (
    <Container className="mt-5">
      <Form>
        <Form.Group controlId="username">
          <Form.Label>Enter your name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={username}
            onKeyDown={handleKeyPress}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSubmit} className="mt-3">
          Join Chat
        </Button>
      </Form>
    </Container>
  );
};

export default UsernamePrompt;