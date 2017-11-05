import React from 'react'
import { Input, InputGroup, InputGroupButton, Button } from 'reactstrap'
import FontAwesome from 'react-fontawesome'

export default ({
	input,
	type,
	deleteOption,
	index,
	placeholder,
	meta: { error, touched }
}) => {
	let valid
	touched ? (error ? (valid = false) : (valid = true)) : (valid = null)
	return (
		<div>
			<InputGroup className="input-skill">
				<Input
					{...input}
					id={input.name}
					type={type}
					valid={valid}
					placeholder={placeholder}
				/>
				<InputGroupButton>
					<Button
						className="btn-remove-option"
						outline
						onClick={() => deleteOption.remove(index)}>
						<FontAwesome size="2x" name="close" />
					</Button>
				</InputGroupButton>
			</InputGroup>
			{touched && error && <div className="error">{error}</div>}
		</div>
	)
}
