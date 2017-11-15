import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap'

import * as actions from '../../actions'

class MyPolls extends Component {
	componentDidMount() {
		if (this.props.poll && this.props.poll.constructor !== Array) {
			this.props.getMyPolls(this.props.auth._id)
		}
	}

	shouldComponentUpdate(nextProps) {
		if (!nextProps.poll) {
			nextProps.getMyPolls(nextProps.auth._id)
		}
		return true
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
				<h1 className="text-center">My Polls</h1>
				<Row className="margin-top-15">
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

const mapStateToProps = ({ auth, poll }) => ({ auth, poll })

export default connect(mapStateToProps, actions)(MyPolls)
