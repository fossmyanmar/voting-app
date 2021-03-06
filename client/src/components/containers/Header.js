import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink
} from 'reactstrap'

import * as actions from '../../actions'

import PollModal from './PollModal'
import LoginModal from '../presentational/LoginModal'

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
					<NavLink key="my_polls" tag={Link} to="/my_polls">
						<NavItem>My Polls</NavItem>
					</NavLink>,
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
		<Navbar id="header" light expand="md">
			<NavbarBrand tag={Link} to="/">
				<img
					src="https://res.cloudinary.com/avatarhzh/image/upload/v1509887327/build-a-voting-app/logo.svg"
					alt="vote mole logo"
				/>
				VoteMole
			</NavbarBrand>
			<NavbarToggler
				className={showDropdown ? 'active' : ''}
				onClick={toggleDropdown}
			/>
			<Collapse isOpen={showDropdown} navbar>
				<Nav className="ml-auto" navbar>
					{renderNavItems()}
				</Nav>
			</Collapse>
			<LoginModal isOpen={showLoginModal} toggle={toggleLoginModal} />
			<PollModal isOpen={showPollModal} toggle={togglePollModal} />
		</Navbar>
	)
}

const mapStateToProps = ({ auth, toggle }) => ({ auth, toggle })

export default connect(mapStateToProps, actions)(Header)
