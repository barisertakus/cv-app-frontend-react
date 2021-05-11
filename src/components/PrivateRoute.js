import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, roles, ...rest }) {
	const authenticated = useSelector((state) => state.auth.authenticated);
	return (
		<Route
			{...rest}
			render={(props) => {
				if (!authenticated) {
					// not logged in so redirect to login page with the return url
					return <Redirect to={{ pathname: '/login' }} />;
				}
				// logged in so return component
				return <Component {...props} />;
			}}
		/>
	);
}

export { PrivateRoute };
