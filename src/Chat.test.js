import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'; // Import configureStore from redux-mock-store
import Chat from './components/Chat';
// import store from './store'

// Mock Redux store
const mockStore = configureStore([]);

// Mock initial state
const initialState = {
  messages: [
    { username: 'User1', message: 'Hello!', timestamp: new Date() },
    { username: 'User2', message: 'Hi there!', timestamp: new Date() },
  ],
  username: 'TestUser',
  page: 1,
};

test('renders chat component with messages', () => {
  // Create a mock store with initial state
  const store = mockStore(initialState);

  render(
    <Provider store={store}>
      <Chat />
    </Provider>
  );

  expect(screen.getByText(/User1/i)).toBeInTheDocument();
  expect(screen.getByText(/User2/i)).toBeInTheDocument();
  expect(screen.getByText(/Load More/i)).toBeInTheDocument();
});