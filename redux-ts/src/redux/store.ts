import {
  legacy_createStore as createStore,
  applyMiddleware,
  AnyAction,
} from "redux";
import axios from "axios";
import thunk, { ThunkAction } from "redux-thunk";

export type RecordsType = {
  id: number;
  item: string;
  sum: number;
};

interface InitialState {
  loading: boolean;
  loaderText: string;
  records: RecordsType[];
}

enum Actions {
  FETCH_RECORDS = "FETCH_RECORDS",
  FETCH_RECORDS_REQUEST = "FETCH_RECORDS_REQUEST",
  FETCH_RECORDS_SUCCESS = "FETCH_RECORDS_SUCCESS",
  FETCH_RECORDS_FAILURE = "FETCH_RECORDS_FAILURE",
  CLOSE_MODAL = "CLOSE_MODAL",
}

type FetchRecordsAction = {
  type: Actions.FETCH_RECORDS;
  payload: RecordsType[];
};

type FetchRecordsRequestAction = {
  type: Actions.FETCH_RECORDS_REQUEST;
};

type FetchRecordsSuccessAction = {
  type: Actions.FETCH_RECORDS_SUCCESS;
  payload: string;
};

type FetchRecordsFailureAction = {
  type: Actions.FETCH_RECORDS_FAILURE;
  payload: string;
};

type CloseModalAction = {
  type: Actions.CLOSE_MODAL;
};

type RecordsActions =
  | FetchRecordsAction
  | FetchRecordsRequestAction
  | FetchRecordsSuccessAction
  | FetchRecordsFailureAction
  | CloseModalAction;

const initialState: InitialState = {
  loading: false,
  loaderText: "",
  records: [],
};

export const fetchRecords = (item: RecordsType[]): FetchRecordsAction => ({
  type: Actions.FETCH_RECORDS,
  payload: item,
});

export const fetchRecordsRequest = (): FetchRecordsRequestAction => {
  return {
    type: Actions.FETCH_RECORDS_REQUEST,
  };
};

export const fetchRecordsSuccess = (text: string): FetchRecordsSuccessAction => {
  return {
    type: Actions.FETCH_RECORDS_SUCCESS,
    payload: text,
  };
};

export const fetchRecordsFailure = (text: string): FetchRecordsFailureAction => {
  return {
    type: Actions.FETCH_RECORDS_FAILURE,
    payload: text,
  };
};
export const closeModal = (): CloseModalAction => {
  return {
    type: Actions.CLOSE_MODAL,
  };
};

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export const fetchRecordsAsync = (): AppThunk  => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchRecordsRequest());
    try {
      const response = await axios.get<RecordsType[]>("http://localhost:3000/api/getItem");
      dispatch(fetchRecords(response.data));
      dispatch(fetchRecordsSuccess("Загрузка записей успешно завершено"));
    } catch (error) {
      console.error("Get request Error:", error);
      dispatch(fetchRecordsFailure("Загрузка записей выполнена с ошибкой"));
    }
  };
};

export const addRecordAsync = (
  newItem: RecordsType
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchRecordsRequest());
    await axios
      .post("http://localhost:3000/api/addItem", newItem)
      .then((data) => {
        dispatch(fetchRecords(data.data));
        dispatch(fetchRecordsSuccess("Элемент добавлен успешно"));
      })
      .catch((error) => {
        console.error("Add request Error:", error);
        dispatch(fetchRecordsFailure("Ошибка добавления элемента"));
      });
  };
};

export const updateRecordAsync = (
  idItem: number,
  textItem: string
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchRecordsRequest());
    await axios
      .patch("http://localhost:3000/api/updateItem", {
        id: idItem,
        text: textItem,
      })
      .then((data) => {
        dispatch(fetchRecords(data.data));
        dispatch(fetchRecordsSuccess("Обновление элемента успешно"));
      })
      .catch((error) => {
        console.error("Update Error:", error);
        dispatch(fetchRecordsFailure("Ошибка обновления элемента"));
      });
  };
};

export const deleteRecordAsync = (
  itemId: number
) => {
  const removeElement = {
    id: itemId,
  };
  return async (dispatch: AppDispatch) => {
    dispatch(fetchRecordsRequest());
    await axios
      .delete("http://localhost:3000/api/deleteItem", {
        params: removeElement,
      })
      .then((data) => {
        dispatch(fetchRecords(data.data));
        dispatch(fetchRecordsSuccess("Удаление завершено успешно"));
      })
      .catch((error) => {
        console.error("Delete Error:", error);
        dispatch(fetchRecordsFailure("Удаление завершено с ошибкой"));
      });
  };
};

const rootReducer = (state = initialState, action: RecordsActions) => {
  switch (action.type) {
    case "FETCH_RECORDS":
      return {
        ...state,
        records: action.payload,
      };
    case "FETCH_RECORDS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_RECORDS_SUCCESS":
      return {
        ...state,
        loaderText: action.payload,
      };
    case "FETCH_RECORDS_FAILURE":
      return {
        ...state,
        loaderText: action.payload,
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        loading: false,
        loaderText: "",
      };
    default:
      return state;
  }
};

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
