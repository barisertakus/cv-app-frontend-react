import React, { useEffect } from 'react';
import '../styles/Home.css';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import { Button, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../redux/actions/authActions';

function Home() {
	const user = useSelector((state) => state.auth.user);
	const loading = useSelector((state) => state.auth.loading);
	const dispatch = useDispatch();
	const role = user.role;
	useEffect(() =>{
		dispatch(getCurrentUser(user.email))

	},[dispatch,user.email])
	return (
		<div className="home">
			<Header />
			<div className="home__content">
				<h1> Welcome </h1>
				{loading ? (
					<CircularProgress />
				) : (
					<>
						<h2>
							{user?.cv
								? user?.cv.name + ' ' + user?.cv.surname
								: user?.email}
						</h2>
						{role === "USER" ?
						<Link to="/details">
							<Button variant="contained" color="secondary">
								View My CV
							</Button>
						</Link>
						: role === "ADMIN" ?
						<Link to="/cvs">
						<Button variant="contained" color="secondary">
							Go All CVs
						</Button>
					</Link>
					:null}
					</>
				)}
			</div>
		</div>
	);
}

export default Home;
