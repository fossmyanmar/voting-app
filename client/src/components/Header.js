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
	NavDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Modal,
	ModalBody,
	Button
} from 'reactstrap'

class Header extends Component {
	state = {
		isOpen: false,
		modal: false,
		dropdownOpen: false
	}

	toggle = () => this.setState({ isOpen: !this.state.isOpen })

	toggleModal = () => this.setState({ modal: !this.state.modal })

	toggleDropDown = () =>
		this.setState({ dropdownOpen: !this.state.dropdownOpen })

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
				return (
					<NavDropdown
						isOpen={this.state.dropdownOpen}
						toggle={this.toggleDropDown}>
						<DropdownToggle nav caret>
							{this.props.auth.name}
						</DropdownToggle>
						<DropdownMenu>
							<DropdownItem>
								<NavLink href="auth/logout">Logout</NavLink>
							</DropdownItem>
						</DropdownMenu>
					</NavDropdown>
				)
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

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps)(Header)
