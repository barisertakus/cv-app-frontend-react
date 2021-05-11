import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCv } from '../redux/actions/authActions';

import DetailsForm from './DetailsForm';
import Header from './Header';

function Details() {
  const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCv(user.id))
	}, [dispatch,user.id]);

	return (
		<div className="details">
			<Header />
			<DetailsForm cv={user.cv || undefined} userId={user.id} />
		</div>
	);
}

export default Details;
