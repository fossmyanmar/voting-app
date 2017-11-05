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
import PollModal from './PollModal'

const Header = ({
	auth,
	toggle: { showDropdown, showLoginModal, showPollModal },
	toggleDropdown,
	toggleLoginModal,
	togglePollModal
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
					<NavLink key="add_poll" href="#" onClick={togglePollModal}>
						<NavItem>Add Poll</NavItem>
					</NavLink>,
					<NavLink key="logout" href="/auth/logout">
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
			<PollModal isOpen={showPollModal} toggle={togglePollModal} />
		</div>
	)
}

const mapStateToProps = ({ auth, toggle }) => ({ auth, toggle })

export default connect(mapStateToProps, actions)(Header)
