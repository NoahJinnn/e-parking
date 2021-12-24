import { combineReducers } from 'redux';
import localeReducer from './locale';

const rootReducers = combineReducers({
    locale: localeReducer,
});
export type ReduxStates = ReturnType<typeof rootReducers>;
export default rootReducers;
