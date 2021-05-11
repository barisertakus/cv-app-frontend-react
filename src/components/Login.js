import React, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/actions/authActions';
import { CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Form, useForm } from './useForm';
import Input from './controls/Input';
import { clearMessage } from '../redux/actions/messageActions';
import LockOpenIcon from '@material-ui/icons/LockOpen';

const useStyles = makeStyles((theme) => ({
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		backgroundColor:"white",
		minWidth: "280px",
		padding: "60px",
		borderRadius: "10px"
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	login:{
		backgroundColor:"#B4C5E4",
		height:"100vh",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	}
}));

export default function Login() {
	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();
	const authenticated = useSelector((state) => state.auth.authenticated);
	const loading = useSelector((state) => state.auth.loading);
	const message = useSelector((state) => state.message.message);

	const loginData = {
		email: '',
		password: '',
	};

	const validate = (fieldValues = values) => {
		let temp = { ...errors };
		if ('email' in fieldValues) temp.email = /$^|.+@.+..+/.test(fieldValues.email) ? '' : 'Email is not valid.';
		if ('password' in fieldValues)
			temp.password = !(fieldValues.password.length < 5 || fieldValues.password.length > 40)
				? ''
				: 'The password must be between 5 and 50 characters.';
		setErrors({
			...temp,
		});

		if (fieldValues === values) return Object.values(temp).every((x) => x === '');
	};

	const {
		values,
		//setValues,
		errors,
		setErrors,
		handleInputChange,
		//resetForm,
	} = useForm(loginData, true, validate);


	const handleSubmit = (event) => {
		event.preventDefault(); 
		if (validate()) dispatch(loginUser(values, history));
	};

	const checkValid = () => {
		let error = false;
		Object.keys(errors).map((key) => {
			if (errors[key] !== '') error = true;
			return key;
		});
		return error;
	};

	useEffect(() => {
		dispatch(clearMessage());
		if (authenticated === true) history.push('/');
	}, [authenticated, history, dispatch]);
	return (
		<div className={classes.login}>
			<Container component="main" maxWidth="xs">
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOpenIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Login Page
					</Typography>
					<Form onSubmit={handleSubmit}>
						<Input
							label="Email"
							name="email"
							value={values.email}
							onChange={handleInputChange}
							error={errors.email}
							variant="outlined"
						/>

						<Input
							label="Password"
							name="password"
							type="password"
							value={values.password}
							onChange={handleInputChange}
							variant="outlined"
							error={errors.password}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							disabled={checkValid()}
						>
							Sign In
						</Button>
						<Link to="/signup" variant="body2">
							Don't have an account? Sign Up
						</Link>

						{message && (
							<div className="form-group">
								<div className="alert alert-danger" role="alert">
									{message}
								</div>
							</div>
						)}
					</Form>
					{loading && <CircularProgress />}
				</div>
			</Container>
		</div>
	);
}
