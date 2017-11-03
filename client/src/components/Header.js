import React, { Component } from 'react'
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem
} from 'reactstrap'

export default class Header extends Component {
	state = {
		isOpen: false
	}
	toggle = () => this.setState({ isOpen: !this.state.isOpen })
	render() {
		return (
			<Navbar light expand="md">
				<NavbarBrand href="/">VoteMole</NavbarBrand>
				<NavbarToggler onClick={this.toggle} />
				<Collapse isOpen={this.state.isOpen} navbar>
					<Nav className="ml-auto" navbar>
						<NavItem>Login</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		)
	}
}
