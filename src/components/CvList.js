import { CircularProgress } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '../redux/actions/authActions';
import DetailsForm from './DetailsForm';
import Header from './Header';

function CvList() {
	const dispatch = useDispatch();
	const cvs = useSelector((state) => state.auth.cvs);
	const loading = useSelector((state) => state.auth.loading)
	useEffect(() => {
		dispatch(getAll());
	}, [dispatch]);
	return (
		<div className="cv__list">
			<Header />
			<div className="list__content" style={{ padding: '30px' }}>
				<h1>ALL CVS</h1>

				{loading ? (
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<CircularProgress />
					</div>
				) : (
					cvs.map((cv) => {
						return <DetailsForm key={cv.id} cv={cv} disabled />;
					})
				)}
			</div>
		</div>
	);
}

export default CvList;
