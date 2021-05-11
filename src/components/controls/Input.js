import React from 'react';
import { TextField } from '@material-ui/core';

export default function Input(props) {
	const { name, label, value, type, error = null, onChange } = props;
	return (
		<TextField
        style={{width:"100%"}}
			variant="outlined"
			label={label}
			name={name}
            margin="normal"
			value={value}
            type={type || "text"}
			fullWidth
            required
			onChange={onChange}
			{...(error && { error: true, helperText: error })}
		/>
	);
}
