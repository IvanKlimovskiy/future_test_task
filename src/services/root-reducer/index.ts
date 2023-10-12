import { combineReducers } from 'redux';
import books from '../slices/books';
import modal from '../slices/modal';
const rootReducer = combineReducers({ books, modal });

export default rootReducer;
