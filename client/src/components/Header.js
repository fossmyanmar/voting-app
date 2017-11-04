import React from 'react'
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

import * as actions from '../actions'

const Header = ({
	auth,
	toggle: { showDropdown, showModal },
	toggleDropdown,
	toggleModal
}) => {
	const renderNavItems = () => {
		switch (auth) {
			case null:
				return
			case false:
				return (
					<NavLink href="#" onClick={toggleModal}>
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

	return (
		<div>
			<Navbar light expand="md">
				<NavbarBrand href="/">VoteMole</NavbarBrand>
				<NavbarToggler onClick={toggleDropdown} />
				<Collapse isOpen={showDropdown} navbar>
					<Nav className="ml-auto" navbar>
						{renderNavItems()}
					</Nav>
				</Collapse>
			</Navbar>
			<Modal isOpen={showModal} toggle={toggleModal}>
				<ModalBody>
					<Button href="/auth/facebook" className="btn-facebook" outline block>
						Login with Facebook
					</Button>
					<Button href="/auth/google" className="btn-google" outline block>
						Login with Google
					</Button>
					<Button href="/auth/github" className="btn-github" outline block>
						Login with Github
					</Button>
				</ModalBody>
			</Modal>
		</div>
	)
}

const mapStateToProps = ({ auth, toggle }) => ({ auth, toggle })

export default connect(mapStateToProps, actions)(Header)
