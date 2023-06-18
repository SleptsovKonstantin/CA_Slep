import { legacy_createStore as createStore } from 'redux';

const initialState = {
  items: []
};

export const addItem = (item) => ({
  type: 'INCOME',
  payload: item
});

export const removeItem = (itemId) => ({
  type: 'REMOVE_ITEM',
  payload: itemId
});

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCOME':
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    default:
      return state;
  }
};

const store = createStore(userReducer);

export default store;