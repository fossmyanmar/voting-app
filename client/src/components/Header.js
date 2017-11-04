import React, { Component } from 'react'
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

export default class Header extends Component {
	state = {
		isOpen: false,
		modal: false
	}
	toggle = () => this.setState({ isOpen: !this.state.isOpen })
	toggleModal = () => this.setState({ modal: !this.state.modal })
	render() {
		return (
			<div>
				<Navbar light expand="md">
					<NavbarBrand href="/">VoteMole</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar>
							<NavLink href="#" onClick={this.toggleModal}>
								<NavItem>Login</NavItem>
							</NavLink>
						</Nav>
					</Collapse>
				</Navbar>
				<Modal isOpen={this.state.modal} toggle={this.toggleModal}>
					<ModalBody>
						<Button className="btn-facebook" outline block>
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
