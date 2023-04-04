import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import axios from 'axios'
import thunk from 'redux-thunk';


const initialState = {
  loading: false,
  records: [],
  error: ''
};

export const fetchRecords = (item) => ({
  type: 'FETCH_RECORDS',
  payload: item
});

// export const fetchUsersRequest = () => {
//   return {
//     type: 'FETCH_USERS_REQUEST'
//   }
// }

// export const fetchUsersSuccess = users => {
//   return {
//     type: 'FETCH_USERS_SUCCESS',
//     payload: users
//   }
// }

// export const fetchUsersFailure = error => {
//   return {
//     type: 'FETCH_USERS_FAILURE',
//     payload: error
//   }
// }

export const fetchRecordsAsync = () => {
  return dispatch => {
    axios('http://localhost:3000/api/getItem')
      .then(data => {
        console.log('data with req', data.data);
        dispatch(fetchRecords(data.data))
      }).catch(error => console.error('Get request Error:', error))
  };
};

export const addRecordAsync = (newItem) => {
  return dispatch => {
    axios.post('http://localhost:3000/api/addItem', newItem)
      .then(data => {
        dispatch(fetchRecords(data.data))
      }).catch(error => console.error('Add request Error:', error))
  };
};

export const updateRecordAsync = (idItem, textItem) => {
  // console.log('newItem', newItem);
  return dispatch => {
    axios.patch('http://localhost:3000/api/updateItem', {id: idItem , text: textItem} )
      .then(data => {
        dispatch(fetchRecords(data.data))
      }).catch(error => console.error('Update Error:', error))
  };
};

export const deleteRecordAsync = (itemId) => {
  const removeElement = {
    id: itemId
  }
  return dispatch => {
    axios.delete('http://localhost:3000/api/deleteItem', {
      params: removeElement
    })
      .then(data => {
        dispatch(fetchRecords(data.data))
      }).catch(error => console.error('Delete Error:', error))
  };
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_RECORDS':
      console.log('state', state);
      return {
        ...state,
        records: action.payload
      };
    default:
      return state;
  }
};

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;