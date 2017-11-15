import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Doughnut } from 'react-chartjs-2'
import { Container, Row, Col, Form, ButtonGroup, Button } from 'reactstrap'

import * as actions from '../../actions'

import RenderSelect from '../presentational/RenderSelect'

class PollDetails extends Component {
	componentWillMount() {
		this.props.getPoll(this.props.match.params.id)
	}

	submit = values => {
		console.log(values, this.props.poll._id)
	}

	renderGraph = () => {
		const colors = [
			['#e6194b', '#eb476f'],
			['#3cb44b', '#5bc868'],
			['#ffe119', '#ffe84c'],
			['#0082c8', '#00a3fb'],
			['#f58231', '#f7a062'],
			['#911eb4', '#b22adb'],
			['#46f0f0', '#75f4f4'],
			['#f032e6', '#f362ec'],
			['#d2f53c', '#ddf76d'],
			['#fabebe', '#feeded'],
			['#008080', '#00b3b3'],
			['#e6beff', '#faf1ff'],
			['#aa6e28', '#d08835'],
			['#fffac8', '#fffffb'],
			['#800000', '#b30000'],
			['#aaffc3', '#ddffe7'],
			['#808000', '#b3b300'],
			['#ffd8b1', '#fff2e4'],
			['#000080', '#0000b3'],
			['#333333', '#4d4d4d']
		]

		const { poll } = this.props

		if (!poll || poll.constructor === Array) {
			return
		} else {
			const labels = poll.pollOptions.map(datum => datum.name)
			const data = poll.pollOptions.map(datum => datum.quantity)

			const backgroundColor = colors.map(color => color[0])
			const hoverBackgroundColor = colors.map(color => color[1])

			const dataset = {
				labels,
				datasets: [
					{
						data,
						backgroundColor,
						hoverBackgroundColor
					}
				]
			}

			return <Doughnut data={dataset} />
		}
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
							component={RenderSelect}
						/>
						<ButtonGroup className="btn-vote" vertical>
							<Button outline color="success">
								Submit
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
					<Col sm={8}>{this.renderGraph()}</Col>
				</Row>
			</Container>
		)
	}
}

const validate = ({ selection }) => {
	const errors = {}
	if (!selection) errors.selection = 'Please select an option'
	return errors
}

const mapStateToProps = ({ poll, form }) => ({ poll, form })

export default reduxForm({
	form: 'vote',
	validate
})(connect(mapStateToProps, actions)(withRouter(PollDetails)))
