import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from '../redux/store';

export const useAppDispatch = () => useDispatch<AppDispatch>(); //1. Типизируем useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; //2. Типизируем useSelector