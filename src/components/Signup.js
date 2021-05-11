import React, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../redux/actions/authActions';
import { Form, useForm } from './useForm';
import { CircularProgress, Grid } from '@material-ui/core';
import Input from './controls/Input';
import { clearMessage } from '../redux/actions/messageActions';

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
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	signup:{
		backgroundColor:"#B4C5E4",
		height:"100vh",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	}
}));

export default function SignUp() {
	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();
	const loading = useSelector((state) => state.auth.loading);
	const message = useSelector((state) =>state.message.message)
	const signupData = {
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
	} = useForm(signupData, true, validate);

	const checkValid = () => {
		let error = false;
		Object.keys(errors).map((key) => {
			if (errors[key] !== '') error = true;
			return key;
		});
		return error;
	};

	const handleSubmit = (event) => {
		event.preventDefault(); 
		dispatch(signupUser(values, history));
	};

	useEffect(() => {
		dispatch(clearMessage());
	}, [dispatch])

	return (
		<div className={classes.signup}>
					<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Avatar className={classes.avatar}></Avatar>
				<Typography component="h1" variant="h5">
					Sign up
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
						color="secondary"
						className={classes.submit}
						disabled={checkValid()}
					>
						Sign Up
					</Button>

					<Grid container justify="flex-end">
						<Grid item>
							<Link to="/login" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>

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
