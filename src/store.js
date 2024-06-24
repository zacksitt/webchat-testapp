import { createStore } from 'redux';
import { chatReducer } from './chatReducer';
// import { configureStore } from '@reduxjs/toolkit';

const store = createStore(chatReducer);

export default store;