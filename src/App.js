import React from 'react';
import { useSelector } from 'react-redux';
import UsernamePrompt from './components/UsernamePrompt';
import Chat from './components/Chat';

const App = () => {
  const username = useSelector((state) => state.username);

  return (
      <div>
        {username ? <Chat /> : <UsernamePrompt />}
      </div>
  );
};

export default App;