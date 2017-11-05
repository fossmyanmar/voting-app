import React from 'react'
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Form
} from 'reactstrap'
import { reduxForm, Field, FieldArray } from 'redux-form'
import { connect } from 'react-redux'

import RenderInput from './RenderInput'
import RenderOptions from './RenderOptions'

const PollModal = ({
	isOpen,
	toggle,
	handleSubmit,
	pristine,
	reset,
	submitting
}) => {
	const cancel = () => {
		reset()
		toggle()
	}

	const submit = values => {
		reset()
	}

	return (
		<Modal isOpen={isOpen} toggle={toggle}>
			<ModalHeader toggle={cancel}>Add Poll</ModalHeader>
			<ModalBody>
				<Form onSubmit={handleSubmit(values => submit(values))} id="add_poll">
					<Field
						name="pollQuestion"
						type="text"
						label="Poll Question"
						placeholder="Enter your poll question"
						component={RenderInput}
					/>
					<FieldArray name="options" component={RenderOptions} />
				</Form>
			</ModalBody>
			<ModalFooter>
				<Button outline type="submit" form="add_poll" color="success">
					Submit
				</Button>{' '}
				<Button
					outline
					className="btn-clear-form"
					disabled={pristine || submitting}
					onClick={reset}>
					Clear Values
				</Button>
				<Button outline color="danger" onClick={cancel}>
					Cancel
				</Button>
			</ModalFooter>
		</Modal>
	)
}

const validate = ({ pollQuestion, options }) => {
	const errors = {}
	if (!pollQuestion) errors.pollQuestion = 'Poll question is required'
	if (!options || options.length < 2) {
		errors.options = { _error: 'Poll must have at least 2 options' }
	} else if (options && options.length > 20) {
		errors.options = { _error: 'No more than 20 options allowed' }
	} else {
		const optionsArrayErrors = []
		options.forEach((option, i) => {
			if (!option || !option.length) {
				optionsArrayErrors[i] = 'Please fill out all options fields'
			}
		})
		if (optionsArrayErrors.length) {
			errors.options = optionsArrayErrors
		}
	}
	if (options && options[0]) {
		const unique = [...new Set(options)]
		if (unique.length !== options.length) {
			errors.options = { _error: 'Options must be unique' }
		}
	}
	return errors
}

const mapStateToProps = ({ form }) => ({ form })

export default reduxForm({
	form: 'add_poll',
	validate
})(connect(mapStateToProps)(PollModal))
