import { legacy_createStore as createStore } from 'redux';

const initialState = {
  users: []
};

export const addUser = (user) => ({
  type: 'ADD_USER',
  payload: user
});

export const removeUser = (userId) => ({
  type: 'REMOVE_USER',
  payload: userId
});

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, action.payload]
      };
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload)
      };
    default:
      return state;
  }
};

const store = createStore(userReducer);

export default store;