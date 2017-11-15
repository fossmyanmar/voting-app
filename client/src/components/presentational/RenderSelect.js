import React from 'react'
import { FormGroup, Input, Label } from 'reactstrap'

export default ({
	input,
	label,
	type,
	pollOptions,
	meta: { touched, error }
}) => {
	let valid
	touched ? (error ? (valid = false) : (valid = true)) : (valid = null)

	const renderOptions = () => {
		return pollOptions.map(({ name }, i) => <option key={i}>{name}</option>)
	}

	return (
		<FormGroup>
			<Label htmlFor={input.name}>{label}</Label>
			<Input valid={valid} {...input} type={type}>
				<option disabled />
				{renderOptions()}
			</Input>
			{touched && error && <div className="error">{error}</div>}
		</FormGroup>
	)
}
