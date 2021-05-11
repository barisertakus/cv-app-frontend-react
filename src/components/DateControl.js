import React, { useEffect, useState } from 'react';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

function DateControl(props) {
	const [selectedDate, setSelectedDate] = useState(new Date());

	const handleDateChange = (date) => {
		setSelectedDate(date);

		props.handleChange({ target: { name: props.name, value: date } });
	};

	useEffect(() => {
		setSelectedDate(props.currentDate);
	}, [props.currentDate]);


	return (
		<div className="date__control">
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<KeyboardDatePicker
				//	id="date-picker-dialog"
					name={props.name}
					label={props.label}
					inputVariant="outlined"
					value={selectedDate}
					onChange={handleDateChange}
					disableFuture={true}
					disabled = {props.disabled}
					format="MM/dd/yyyy"
					KeyboardButtonProps={{
						'aria-label': 'change date',
					}}
				/>
			</MuiPickersUtilsProvider>
		</div>
	);
}

export default DateControl;
