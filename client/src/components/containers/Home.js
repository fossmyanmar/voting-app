import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { connect } from 'react-redux'
import Pagination from 'react-ultimate-pagination-bootstrap-4'

import * as actions from '../../actions'

import RenderPollsList from '../presentational/RenderPollsList'

class Home extends Component {
	state = {
		pageSize: 5,
	}

	onPageChange = page => {
		this.setState({ page })
		this.props.allPolls(this.state.pageSize, (page - 1) * this.state.pageSize)
	}

	componentWillMount() {
		this.props.allPolls(this.state.pageSize, 0)
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
						<RenderPollsList poll={this.props.poll} />
						{this.props.poll &&
							this.props.poll.count &&
							this.state.pageSize < this.props.poll.count && (
								<Pagination
									currentPage={this.state.page || 1}
									totalPages={Math.ceil(
										this.props.poll.count / this.state.pageSize
									)}
									onChange={this.onPageChange}
								/>
							)}
					</Col>
				</Row>
			</Container>
		)
	}
}

const mapStateToProps = ({ poll }) => ({ poll })

export default connect(
	mapStateToProps,
	actions
)(Home)
