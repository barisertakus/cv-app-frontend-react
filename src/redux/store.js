import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import messageReducer from './reducers/messageReducer';
const reducers = combineReducers({
	auth: authReducer,
	message: messageReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
