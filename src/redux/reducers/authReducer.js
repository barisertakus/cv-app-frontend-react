import {
	DELETE_CV,
	EDIT_CV,
	GET_CV,
	GET_CVS,
	GET_USER,
	LOADING_UI,
	LOGIN_FAILURE,
	LOGIN_SUCCESS,
	LOGOUT,
	REGISTER_FAILURE,
	REGISTER_SUCCESS,
	SET_CV,
} from '../types';

const user = JSON.parse(sessionStorage.getItem('user'));

const INITIAL_STATE = user
	? {
			loading: false,
			authenticated: true,
			user,
			cv: user.cv,
			cvs: [],
			error: '',
	  }
	: {
			loading: false,
			authenticated: false,
			user: null,
			error: '',
			cvs: [],
	  };

export const authReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOADING_UI:
			return { ...state, loading: true };
		case LOGIN_SUCCESS:
			return {
				...state,
				authenticated: true,
				loading: false,
				user: action.payload,
			};
		case REGISTER_SUCCESS:
			return {
				...state,
				loading: false,
			};
		case REGISTER_FAILURE:
			return {
				...state,
				loading: false,
			};

		case LOGIN_FAILURE:
			return {
				...state,
				loading: false,
			};

		case LOGOUT:
			return {
				...state,
				loading: false,
				authenticated: false,
				user: null,
				cvs: [],
			};

		case GET_USER:
			return {
				...state,
				loading: false,
				user: action.payload,
			};

		case SET_CV:
			return {
				...state,
				user: {
					...state.user,
					cv: action.payload,
				},
				loading: false,
			};

		case EDIT_CV:
			return {
				...state,
				user: {
					...state.user,
					cv: action.payload,
				},
				loading: false,
			};

		case GET_CV:
			return {
				...state,
				user: {
					...state.user,
					cv: action.payload,
				},
				loading:false
			};

		case GET_CVS:
			return {
				...state,
				cvs: action.payload,
				loading: false,
			};

		case DELETE_CV:
			return {
				...state,
				...state.user,
				cv: null,
			};

		/*
		case GET_USER:
			return {
				...state,
				loading: false,
				userDetails: action.payload,
			};
*/
		default:
			return state;
	}
};

export default authReducer;
