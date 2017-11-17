import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Container, Row, Col, Form, ButtonGroup, Button } from 'reactstrap'
import Alert from 'react-s-alert'

import * as actions from '../../actions'

import RenderSelect from '../presentational/RenderSelect'
import RenderInput from '../presentational/RenderInput'
import RenderGraph from '../presentational/RenderGraph'

class PollDetails extends Component {
	componentWillMount() {
		this.props.getPoll(this.props.match.params.id)
	}

	submit = values => {
		this.props.vote(values, this.props.poll, Alert)
	}

	delete = test => {
		console.log(test)
	}

	renderForm = () => {
		const { poll } = this.props

		if (!poll || poll.constructor === Array) {
			return
		} else {
			return (
				<Col sm={4}>
					<h1>{poll.pollQuestion}</h1>
					<Form
						onSubmit={this.props.handleSubmit(values => this.submit(values))}
						id="vote">
						<Field
							name="selection"
							type="select"
							label="I'd like to vote for..."
							pollOptions={poll.pollOptions}
							auth={this.props.auth}
							component={RenderSelect}
						/>
						{this.props.form.vote.values &&
						this.props.form.vote.values.selection ===
							"I'd like a custom option" ? (
							<Field
								name="customSelection"
								type="text"
								label="Vote with my own option:"
								placeholder="Custom option"
								component={RenderInput}
							/>
						) : (
							''
						)}
						<ButtonGroup className="btn-vote" vertical>
							<Button outline color="success">
								Submit
							</Button>
							<Button outline>Tweet</Button>
							<Button
								onClick={this.delete.apply(null, [this.props.match.params.id])}
								outline
								color="danger">
								Delete
							</Button>
						</ButtonGroup>
					</Form>
				</Col>
			)
		}
	}

	render() {
		return (
			<Container>
				<Row>
					{this.renderForm()}
					<Col className="graph-container" sm={8}>
						<RenderGraph poll={this.props.poll} />
					</Col>
				</Row>
			</Container>
		)
	}
}

const validate = ({ selection, customSelection }, props) => {
	const errors = {}
	if (!selection) errors.selection = 'Please select an option'

	if (selection === "I'd like a custom option" && !customSelection) {
		errors.customSelection = 'Please enter your custom selection'
	}
	return errors
}

const mapStateToProps = ({ poll, form, auth }) => ({ poll, form, auth })

export default reduxForm({
	form: 'vote',
	validate
})(connect(mapStateToProps, actions)(withRouter(PollDetails)))
