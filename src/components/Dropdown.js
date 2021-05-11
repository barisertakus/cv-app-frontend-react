import { MenuItem, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

function Dropdown(props) {
	const [select, setSelect] = useState("");

	const handleChange = (event) => {
		setSelect(event.target.value);
		props.handleChange(event);
	};

	useEffect(() => {
		if(props.value) setSelect(props.value)
	}, [props.value])

	return (
		<TextField 
      id="standard-select-currency"
			name={props.name}
      select variant="outlined" 
      value={select} 
      onChange={handleChange}
			disabled={props.disabled}>
			{props.dropdownList.map((option) => (
				<MenuItem key={option.value} value={option.value}>
					{option.label}
				</MenuItem>
			))}
		</TextField>
	);
}

export default Dropdown;
