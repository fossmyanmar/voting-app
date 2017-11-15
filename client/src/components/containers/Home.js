import React, { Component } from 'react'
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import * as actions from '../../actions'

class Home extends Component {
	componentWillMount() {
		this.props.allPolls()
	}

	componentWillUnmount() {
		this.props.clearPoll()
	}

	renderPolls = () => {
		return this.props.poll && this.props.poll.constructor === Array
			? this.props.poll.map((poll, i) => (
					<ListGroupItem className="poll-list-item" key={i}>
						<Link className="poll-link" to={`/poll/${poll.id}`}>
							{poll.pollQuestion}
						</Link>
					</ListGroupItem>
				))
			: ''
	}

	render() {
		return (
			<Container fluid>
				<h1 className="text-center">VoteMole</h1>
				<h2 className="text-center">Can You Dig It?</h2>
				<Row className="logo-row">
					<Col
						lg={{ size: '6', offset: 3 }}
						md={{ size: '8', offset: 2 }}
						sm={{ size: '10', offset: 1 }}
						xs="12">
						<img
							className="logo-home"
							src="https://res.cloudinary.com/avatarhzh/image/upload/v1509887327/build-a-voting-app/logo.svg"
							alt="Vote Mole logo"
						/>
					</Col>
				</Row>
				<Row className="logo-row">
					<Col
						lg={{ size: '6', offset: 3 }}
						md={{ size: '8', offset: 2 }}
						sm={{ size: '10', offset: 1 }}
						xs="12">
						<ListGroup>{this.renderPolls()}</ListGroup>
					</Col>
				</Row>
			</Container>
		)
	}
}

const mapStateToProps = ({ poll }) => ({ poll })

export default connect(mapStateToProps, actions)(Home)
