import { combineReducers } from 'redux';
import books from '../slices/books';
const rootReducer = combineReducers({ books });

export default rootReducer;
