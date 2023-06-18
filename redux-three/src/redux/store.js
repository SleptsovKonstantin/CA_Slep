import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import axios from 'axios'
import thunk from 'redux-thunk';


const initialState = {
  loading: false,
  loaderText: '',
  records: [],
};

export const fetchRecords = item => ({
  type: 'FETCH_RECORDS',
  payload: item
});

export const fetchUsersRequest = () => {
  return {
    type: 'FETCH_USERS_REQUEST',
  }
}

export const fetchUsersSuccess = text => {
  return {
    type: 'FETCH_USERS_SUCCESS',
    payload: text
  }
}

export const fetchUsersFailure = text => {
  return {
    type: 'FETCH_USERS_FAILURE',
    payload: text
  }
}
export const closeModal = () => {
  return {
    type: 'CLOSE_MODAL',
    
  }
}

export const fetchRecordsAsync = () => {
  return dispatch => {
    dispatch(fetchUsersRequest())
    axios('http://localhost:3000/api/getItem')
      .then(data => {
        dispatch(fetchRecords(data.data))
        dispatch(fetchUsersSuccess('Загрузка записей успешно завершено'))
      }).catch(error => {
        console.error('Get request Error:', error);
        dispatch(fetchUsersFailure('Загрузка записей выполнена с ошибкой'))
      })
  };
};

export const addRecordAsync = (newItem) => {
  return dispatch => {
    dispatch(fetchUsersRequest())
    axios.post('http://localhost:3000/api/addItem', newItem)
      .then(data => {
        dispatch(fetchRecords(data.data))
        dispatch(fetchUsersSuccess('Элемент добавлен успешно'))
      }).catch(error => {
        console.error('Add request Error:', error);
        dispatch(fetchUsersFailure('Ошибка добавления элемента'))
      })
  };
};

export const updateRecordAsync = (idItem, textItem) => {
  return dispatch => {
    dispatch(fetchUsersRequest())
    axios.patch('http://localhost:3000/api/updateItem', { id: idItem, text: textItem })
      .then(data => {
        dispatch(fetchRecords(data.data))
        dispatch(fetchUsersSuccess('Обновление элемента успешно'))
      }).catch(error => {
        console.error('Update Error:', error);
        dispatch(fetchUsersFailure('Ошибка обновления элемента'))
      })
  };
};

export const deleteRecordAsync = (itemId) => {
  const removeElement = {
    id: itemId
  }
  return dispatch => {
    dispatch(fetchUsersRequest())
    axios.delete('http://localhost:3000/api/deleteItem', {
      params: removeElement
    })
      .then(data => {
        dispatch(fetchRecords(data.data))
        dispatch(fetchUsersSuccess('Удаление завершено успешно'))
      }).catch(error => {
        console.error('Delete Error:', error);
        dispatch(fetchUsersFailure('Удаление завершено с ошибкой'))
      })
  };
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_RECORDS':
      return {
        ...state,
        records: action.payload
      };
    case 'FETCH_USERS_REQUEST':
      return {
        ...state,
        loading: true,
        loaderText: action.payload,
      };
    case 'FETCH_USERS_SUCCESS':
      return {
        ...state,
        loaderText: action.payload,
      };
    case 'FETCH_USERS_FAILURE':
      return {
        ...state,
        loaderText: action.payload,
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        loading: false,
        loaderText: '',
      };

    default:
      return state;
  }
};

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;