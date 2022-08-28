import { useReducer } from 'react';
import GlobalContext from './GlobalContext';
import GlobalReducer from './GlobalReducer';
import { LOADING, DATAUSER, REMOVEUSER, TOKENUSER } from './GlobalTypes';

const GlobalState = ({ children }) => {
	
	// state
	const initialState = {
		loading: false,
		dataUser: [],
		tokenUser:'',
	};
	const [state, dispatch] = useReducer(GlobalReducer, initialState);
	const { loading, dataUser, tokenUser } = state;

	// function
	const splashLoading = () => {
		dispatch({
			type: LOADING,
			payload: true,
		});
	};
	const getUser = () => {
		if (localStorage.getItem('dataUser') && localStorage.getItem('tokenUser')) {
			dispatch({
				type: DATAUSER,
				payload: localStorage.getItem('dataUser'),
			});
			dispatch({
				type: TOKENUSER,
				payload: localStorage.getItem('tokenUser'),
			});
		}
		dispatch({
			type: LOADING,
			payload: false,
		});
	};
	const loginUser = async (LoginPayload) => {
		try {
			dispatch({
				type: LOADING,
				payload: true,
			});

			const data = await fetch(
				'https://todos-project-api.herokuapp.com/auth/login',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email: LoginPayload.email,
						password: LoginPayload.password,
					}),
				},
			).then((data) => data.json());

			if (data.auth_token) {
				localStorage.setItem('dataUser', JSON.stringify(LoginPayload));
				localStorage.setItem('tokenUser', JSON.stringify(data));
				// HAPUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUS
				console.log(JSON.stringify(data));
				getUser();
			} else {
				dispatch({
					type: LOADING,
					payload: false,
				});
			}
		} catch (err) {
			dispatch({
				type: LOADING,
				payload: false,
			});
		}
	};
	const registerUser = async (RegisterPayload) => {
		try {
			dispatch({
				type: LOADING,
				payload: true,
			});

			const data = await fetch(
				'https://todos-project-api.herokuapp.com/signup',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						name:RegisterPayload.name,
						email: RegisterPayload.email,
						password: RegisterPayload.password,
						password_confirmation: RegisterPayload.passwordconfirm,
					}),
				},
			).then((data) => data.json());

			if (data.auth_token) {
				localStorage.setItem('dataUser', JSON.stringify(RegisterPayload.name, RegisterPayload.email));
				localStorage.setItem('tokenUser', JSON.stringify(data));
				// console.log(JSON.stringify(RegisterPayload));
				getUser();
			} else {
				dispatch({
					type: LOADING,
					payload: false,
				});
			}
		} catch (err) {
			dispatch({
				type: LOADING,
				payload: false,
			});
		}
	};
	const logoutUser = () => {
		try {
			dispatch({
				type: LOADING,
				payload: true,
			});
			localStorage.clear();
			dispatch({
				type: REMOVEUSER,
				payload: null,
			});
			dispatch({
				type: LOADING,
				payload: false,
			});
		} catch (err) {
			console.log(err);
		}
	};

	// provider
	return (
		<GlobalContext.Provider
			value={{
				// state
				loading,
				dataUser,
				tokenUser,

				// function
				splashLoading,
				getUser,
				registerUser,
				loginUser,
				logoutUser,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalState;
