const initialState = {
    messages: JSON.parse(localStorage.getItem('messages')) || [],
    username: '',
    page: 1,
  };
  
  export const chatReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_MESSAGE':
        const newMessages = [...state.messages, action.payload];
        localStorage.setItem('messages', JSON.stringify(newMessages));
        return {
          ...state,
          messages: newMessages,
        };
      case 'SET_USERNAME':
        return {
          ...state,
          username: action.payload,
        };
      case 'LOAD_MORE_MESSAGES':
        return {
          ...state,
          page: state.page + 1,
        };
      default:
        return state;
    }
  };

