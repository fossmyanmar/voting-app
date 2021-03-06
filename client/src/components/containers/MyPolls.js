import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import Pagination from 'react-ultimate-pagination-bootstrap-4'

import * as actions from '../../actions'

import RenderPollsList from '../presentational/RenderPollsList'

class MyPolls extends Component {
	state = {
		pageSize: 5,
	}

	componentDidMount() {
		if (this.props.poll && this.props.poll.constructor !== Array) {
			this.props.getMyPolls(this.props.auth._id, this.state.pageSize, 0)
		}
	}

	componentWillReceiveProps(nextProps) {
		if (!this.props.auth && nextProps.auth) {
			this.props.getMyPolls(nextProps.auth._id, this.state.pageSize, 0)
		}
	}

	componentWillUnmount() {
		this.props.clearPoll()
	}

	onPageChange = page => {
		this.setState({ page })
		this.props.getMyPolls(
			this.props.auth._id,
			this.state.pageSize,
			(page - 1) * this.state.pageSize
		)
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
						<RenderPollsList poll={this.props.poll} />
						{this.props.poll &&
						this.props.poll.count &&
						this.state.pageSize < this.props.poll.count ? (
							<Pagination
								currentPage={this.state.page || 1}
								totalPages={Math.ceil(
									this.props.poll.count / this.state.pageSize
								)}
								onChange={this.onPageChange}
							/>
						) : null}
					</Col>
				</Row>
			</Container>
		)
	}
}

const mapStateToProps = ({ auth, poll }) => ({ auth, poll })

export default connect(
	mapStateToProps,
	actions
)(MyPolls)
