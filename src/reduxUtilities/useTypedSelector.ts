// reducer.ts
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { AppState } from '~/reduxUtilities/AppState';

export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;
