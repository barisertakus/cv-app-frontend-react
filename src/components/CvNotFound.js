import { Button } from '@material-ui/core';
import React from 'react';

function CvNotFound({submit, isOpen}) {
	return (
		<div className="cv-not-found">
			<h1>You do not have a CV record.</h1>
			<Button onClick={submit} disabled={isOpen && true} variant="contained" color="primary">
				Add a CV
			</Button>
		</div>
	);
}

export default CvNotFound;
