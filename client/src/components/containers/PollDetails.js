import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import axios from 'axios'
import Alert from 'react-s-alert'
import { Container, Row, Col, Form, ButtonGroup, Button } from 'reactstrap'

import * as actions from '../../actions'

import RenderSelect from '../presentational/RenderSelect'
import RenderInput from '../presentational/RenderInput'
import RenderGraph from '../presentational/RenderGraph'
import DeleteModal from '../presentational/DeleteModal'

class PollDetails extends Component {
	componentWillMount() {
		this.props.getPoll(this.props.match.params.id)
	}

	submit = values => {
		this.props.vote(values, this.props.poll, Alert)
	}

	delete = id => {
		axios
			.delete(`/poll/delete/${id}`)
			.then(({ data }) => {
				if (data.status === 'ok') this.props.history.push('/')
			})
			.catch(err => {
				Alert.error(err.response.data.error)
			})
		this.props.toggleDeleteModal()
	}

	tweet = () => {
		const url = `https://twitter.com/intent/tweet?text=Come%20vote%20on%20my%20poll!%20-%20${
			this.props.poll.pollQuestion
		}%0A${window.location}`
		window.open(
			url,
			'twitter',
			'location,status,scrollbars,resizable,width=640, height=250, left=320, top=125'
		)
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
							{poll.userID === this.props.auth._id && [
								<Button
									key="tweet"
									className="btn-tweet"
									onClick={this.tweet}
									outline>
									Tweet
								</Button>,
								<Button
									key="delete"
									onClick={this.props.toggleDeleteModal}
									outline
									color="danger">
									Delete
								</Button>
							]}
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
				<DeleteModal
					isOpen={this.props.toggle.showDeleteModal}
					toggle={this.props.toggleDeleteModal}
					deletePoll={this.delete.bind(null, [this.props.match.params.id])}
				/>
			</Container>
		)
	}
}

const validate = ({ selection, customSelection }) => {
	const errors = {}
	if (!selection) errors.selection = 'Please select an option'

	if (selection === "I'd like a custom option" && !customSelection) {
		errors.customSelection = 'Please enter your custom selection'
	}
	return errors
}

const mapStateToProps = ({ poll, form, auth, toggle }) => ({
	poll,
	form,
	auth,
	toggle
})

export default reduxForm({
	form: 'vote',
	validate
})(connect(mapStateToProps, actions)(withRouter(PollDetails)))
