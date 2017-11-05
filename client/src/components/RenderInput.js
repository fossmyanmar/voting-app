import React from 'react'
import { FormGroup, Input, Label } from 'reactstrap'

export default ({
	input,
	label,
	type,
	placeholder,
	meta: { touched, error }
}) => {
	let valid
	touched ? (error ? (valid = false) : (valid = true)) : (valid = null)
	return (
		<FormGroup>
			<Label htmlFor={input.name}>{label}</Label>
			<Input valid={valid} {...input} type={type} placeholder={placeholder} />
			{touched && error && <div className="error">{error}</div>}
		</FormGroup>
	)
}
