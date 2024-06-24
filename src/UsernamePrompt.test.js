import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import UsernamePrompt from './components/UsernamePrompt';

// Mock Redux store
const mockStore = configureStore([]);

test('renders UsernamePrompt component and handles user input', () => {
  // Create a mock store
  const store = mockStore({});

  render(
    <Provider store={store}>
      <UsernamePrompt />
    </Provider>
  );

  // Check if the input field and button are rendered
  const inputElement = screen.getByPlaceholderText(/Enter your name/i);
  const buttonElement = screen.getByText(/Join Chat/i);

  expect(inputElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();

  // Simulate user input
  fireEvent.change(inputElement, { target: { value: 'TestUser' } });
  expect(inputElement.value).toBe('TestUser');

  // Simulate button click
  fireEvent.click(buttonElement);

  // Check if the correct action is dispatched
  const actions = store.getActions();
  expect(actions).toEqual([{ type: 'SET_USERNAME', payload: 'TestUser' }]);
});