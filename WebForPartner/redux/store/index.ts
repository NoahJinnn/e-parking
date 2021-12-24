import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '@redux/reducers';
import { MakeStore } from 'next-redux-wrapper';

const store: MakeStore = (initialState = {}) => {
    return createStore(reducer, initialState, applyMiddleware(thunk));
};
export default store;
