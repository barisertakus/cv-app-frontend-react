import React, { useEffect, useState } from 'react';
import MaskedInput from 'react-text-mask';
import { Input } from '@material-ui/core';

function TextMaskCustom(props) {
	const { inputRef, ...other } = props;

	return (
		<MaskedInput
			{...other}
			ref={(ref) => {
				inputRef(ref ? ref.inputElement : null);
			}}
			mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
			placeholderChar={'\u2000'}
			showMask
		/>
	);
}

function FormatInput(props) {

  const [maskValue, setMaskValue] = useState("555");

  const handleChange = (event) => {
    setMaskValue(event.target.value);
    props.handleChange(event)
  };

  useEffect(() => {
		if(props.value) setMaskValue(props.value)
	}, [props.value])
  
	return (
		<Input
			value={maskValue}
			onChange={handleChange}
			name={props.name}
      disabled={props.disabled}
		//	id="formatted-text-mask-input"
			inputComponent={TextMaskCustom}
		/>
	);
}

export default FormatInput;
