import React from 'react'
import { connect } from 'react-redux'
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink
} from 'reactstrap'

import * as actions from '../actions'

import LoginModal from './LoginModal'

const Header = ({
	auth,
	toggle: { showDropdown, showLoginModal },
	toggleDropdown,
	toggleLoginModal
}) => {
	const renderNavItems = () => {
		switch (auth) {
			case null:
				return
			case false:
				return (
					<NavLink href="#" onClick={toggleLoginModal}>
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
			<LoginModal isOpen={showLoginModal} toggle={toggleLoginModal} />
		</div>
	)
}

const mapStateToProps = ({ auth, toggle }) => ({ auth, toggle })

export default connect(mapStateToProps, actions)(Header)
