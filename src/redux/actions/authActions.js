import { api } from '../../api';
import { authHeader } from '../../utils/authHeader';
import {
	LOADING_UI,
	LOGIN_SUCCESS,
	LOGOUT,
	REGISTER_SUCCESS,
	GET_CV,
	GET_CVS,
	EDIT_CV,
	SET_CV,
	LOGIN_FAILURE,
	SET_MESSAGE,
	REGISTER_FAILURE,
	DELETE_CV,
	GET_USER,
} from '../types';

export const loginUser = (user, history) => (dispatch) => {
	dispatch({ type: LOADING_UI });
	login(user)
		.then((data) => {
			dispatch({ type: LOGIN_SUCCESS, payload: data });
			history.push('/');
		})
		.catch((error) => {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();

			dispatch({
				type: LOGIN_FAILURE,
			});

			dispatch({
				type: SET_MESSAGE,
				payload: message,
			});
		});
};

export const signupUser = (user, history) => (dispatch) => {
	dispatch({ type: LOADING_UI });
	signup(user)
		.then((response) => {
			dispatch({ type: REGISTER_SUCCESS });
			history.push('/');
			dispatch({
				type: SET_MESSAGE,
				payload: response.data.message,
			});
		})
		.catch((error) => {
			const message =
				(error.response && error.response?.data && error.response?.data.message) ||
				error.message ||
				error.response?.data.toString();

			dispatch({
				type: REGISTER_FAILURE,
			});

			dispatch({
				type: SET_MESSAGE,
				payload: message,
			});
		});
};

export const logoutUser = () => (dispatch) => {
	logout();
	dispatch({ type: LOGOUT });
};

export const getCurrentUser = (email) => (dispatch) => {
	dispatch({ type: LOADING_UI });
	api()
		.get(`/user/${email}`, { headers: authHeader() })
		.then((response) => {
			dispatch({ type: GET_USER, payload: response.data });
		});
};

export const getCv = (userId) => (dispatch) => {
	dispatch({ type: LOADING_UI });

	api()
		.get(`/cv/${userId}`, { headers: authHeader() })
		.then((response) => {
			dispatch({ type: GET_CV, payload: response.data });
		})
		.catch((error) => {
			console.log(error.message);
		});
};

export const getAll = () => (dispatch) => {
	dispatch({ type: LOADING_UI });
	api()
		.get('/cv', { headers: authHeader() })
		.then((response) => {
			dispatch({ type: GET_CVS, payload: response.data });
		})
		.catch((error) => {
			console.log(error.message);
		});
};

export const createCV = (cvDetails, userId) => (dispatch) => {
	dispatch({ type: LOADING_UI });
	api()
		.post(`/cv/user/${userId}`, cvDetails, { headers: authHeader() })
		.then((response) => {
			dispatch({ type: SET_CV, payload: response.data });
		})
		.catch((error) => {
			dispatch({ type: 'SET_CV_ERROR', payload: 'SET_CV error' + error.toString() });
		});
};

export const editCV = (cvDetails, cvId, push) => (dispatch) => {
	dispatch({ type: LOADING_UI });
	api()
		.put(`/cv/${cvId}`, cvDetails, { headers: authHeader() })
		.then((response) => {
			dispatch({ type: EDIT_CV, payload: response.data });
			push(`./`);
		})
		.catch((error) => {
			dispatch({
				type: 'EDIT_CV_ERROR',
				payload: 'EDIT_CV error..' + error.toString(),
			});
		});
};

export const deleteCv = (id) => (dispatch) => {
	api()
		.delete(`/cv/${id}`, { headers: authHeader() })
		.then(() => {
			dispatch({ type: DELETE_CV });
		})
		.catch((error) => {
			console.log(error);
		});
};

const login = (user) => {
	return api()
		.post('/login', user)
		.then((response) => {
			if (response.data.token) sessionStorage.setItem('user', JSON.stringify(response.data));
			return response.data;
		});
};

const signup = (user) => {
	return api()
		.post('/signup', user)
		.then((response) => {
			return response.data;
		});
};

const logout = () => {
	sessionStorage.removeItem('user');
};
