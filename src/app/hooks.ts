import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// সাধারণ useDispatch এবং useSelector এর বদলে আমরা পুরো অ্যাপে এইগুলো ব্যবহার করবো
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;