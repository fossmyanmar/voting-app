import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	Modal,
	ModalBody,
	Button
} from 'reactstrap'

class Header extends Component {
	state = {
		isOpen: false,
		modal: false
	}

	toggle = () => this.setState({ isOpen: !this.state.isOpen })

	toggleModal = () => this.setState({ modal: !this.state.modal })

	renderNavItems = () => {
		switch (this.props.auth) {
			case null:
				return
			case false:
				return (
					<NavLink href="#" onClick={this.toggleModal}>
						<NavItem>Login</NavItem>
					</NavLink>
				)
			default:
				return [
					<NavLink key="logout" eventkey="logout" href="/auth/logout">
						<NavItem>Logout</NavItem>
					</NavLink>
				]
		}
	}

	render() {
		return (
			<div>
				<Navbar light expand="md">
					<NavbarBrand href="/">VoteMole</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar>
							{this.renderNavItems()}
						</Nav>
					</Collapse>
				</Navbar>
				<Modal isOpen={this.state.modal} toggle={this.toggleModal}>
					<ModalBody>
						<Button
							href="/auth/facebook"
							className="btn-facebook"
							outline
							block>
							Login with Facebook
						</Button>
						<Button href="/auth/google" className="btn-google" outline block>
							Login with Google
						</Button>
						<Button className="btn-github" outline block>
							Login with Github
						</Button>
					</ModalBody>
				</Modal>
			</div>
		)
	}
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps)(Header)
