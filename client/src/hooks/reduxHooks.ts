import { useSelector } from "react-redux";
import { TypedUseSelectorHook, useDispatch } from "react-redux";

import { AppDispatch, RootState } from "../store/rtkStore/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
