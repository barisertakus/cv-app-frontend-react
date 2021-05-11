import { Button, CircularProgress, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import DateControl from './DateControl';
import Dropdown from './Dropdown';
import '../styles/DetailsForm.css';
import FormatInput from './FormatInput';
import CvNotFound from './CvNotFound';
import { useDispatch, useSelector } from 'react-redux';
import { createCV, deleteCv, editCV } from '../redux/actions/authActions';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from 'react-router';

function DetailsForm(props) {

	const cvInit={
		name: '',
		surname: '',
		gender: '',
		phone: '',
		birthDate: new Date(),
	}

	const [cvDetails, setCvDetails] = useState(cvInit);

	const genders = [
		{ value: 'Man', label: 'Man' },
		{ value: 'Woman', label: 'Woman' },
	];
	const [isOpen, setIsOpen] = useState(props.cv?.name ? true : false);
	const loading = useSelector((state) => state.auth.loading);
	const dispatch = useDispatch();
	const userId = props.userId;
	const history = useHistory();

	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (props.cv?.name) {
			dispatch(editCV(cvDetails, props.cv.id));
		} else {
			dispatch(createCV(cvDetails, userId));
		}
	};

	const handleDelete = () => {
		dispatch(deleteCv(props.cv.id));
		handleClose();
		history.push('/');
	};

	const handleChange = (event) => {
		setCvDetails({ ...cvDetails, [event.target.name]: event.target.value });
	};

	const addCv = () => {
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		if (props.cv?.name) {
			setCvDetails(props.cv);
			setIsOpen(props.cv);
		}
		else{
			setCvDetails(cvInit)
		}
		//eslint-disable-next-line
	}, [props.cv]);
	return (
		<div className="details__form">
			{!props.cv ? loading ? <CircularProgress /> : <CvNotFound isOpen={isOpen} submit={addCv} /> : null}
			<div className="cv__details" style={!isOpen ? { display: 'none' } : { display: 'flex' }}>
				<div className="cv__detail" style={props.disabled ? { borderBottom: '1px dashed black' } : null}>
					<div className="cv__headers">
						<h3>Name:</h3>
						<h3>Surname:</h3>
						<h3>Gender:</h3>
						<h3>Phone:</h3>
						<h3>Birth Date:</h3>
					</div>

					<div className="cv__properties">
						<TextField
							name="name"
							disabled={props.disabled}
							label="Name"
							value={cvDetails.name}
							variant="outlined"
							onChange={handleChange}
						/>

						<TextField
							name="surname"
							disabled={props.disabled}
							label="Surname"
							value={cvDetails.surname}
							variant="outlined"
							onChange={handleChange}
						/>

						<Dropdown
							name="gender"
							disabled={props.disabled}
							handleChange={handleChange}
							dropdownList={genders}
							value={cvDetails.gender}
						/>

						<FormatInput
							disabled={props.disabled}
							name="phone"
							value={cvDetails.phone}
							handleChange={handleChange}
						/>

						<DateControl
							name="birthDate"
							disabled={props.disabled}
							handleChange={handleChange}
							currentDate={cvDetails.birthDate}
							label="Date of Birth"
						/>
					</div>
				</div>

				<div className="cv__send" style={loading ? {display:'none'} : null }>
					<Button
						style={props.disabled ? { display: 'none' } : null}
						onClick={handleSubmit}
						variant="contained"
					>
						SAVE
					</Button>

					<Button
						variant="contained"
						color="secondary"
						onClick={handleClickOpen}
						style={!props.cv ? {display:"none"} : null}
					>
						DELETE
					</Button>
				</div>
				{loading && (
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<CircularProgress />
					</div> )}

				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">{'Deleting Cv'}</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							Are you sure you want to delete
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
						<Button onClick={handleDelete} color="primary" autoFocus>
							Delete
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		</div>
	);
}

export default DetailsForm;
