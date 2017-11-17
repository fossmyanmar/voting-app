import React, { Component } from 'react'
import { Container, Row, Col, ListGroup } from 'reactstrap'
import { connect } from 'react-redux'

import * as actions from '../../actions'

import RenderPolls from '../presentational/RenderPolls'

class Home extends Component {
	componentWillMount() {
		this.props.allPolls()
	}

	componentWillUnmount() {
		this.props.clearPoll()
	}

	render() {
		return (
			<Container fluid>
				<h1 className="text-center">VoteMole</h1>
				<h2 className="text-center">Can You Dig It?</h2>
				<Row className="margin-top-15">
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
				<Row className="margin-top-15">
					<Col
						lg={{ size: '6', offset: 3 }}
						md={{ size: '8', offset: 2 }}
						sm={{ size: '10', offset: 1 }}
						xs="12">
						<ListGroup>
							<RenderPolls polls={this.props.poll} />
						</ListGroup>
					</Col>
				</Row>
			</Container>
		)
	}
}

const mapStateToProps = ({ poll }) => ({ poll })

export default connect(mapStateToProps, actions)(Home)
