import { useDispatch, useSelector } from 'react-redux';

// Use 'export const' so they are "Named Exports"
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;