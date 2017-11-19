import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'

export default ({ isOpen, toggle, deletePoll }) => (
	<Modal isOpen={isOpen} toggle={toggle}>
		<ModalHeader>Delete Poll</ModalHeader>
		<ModalBody>Are you sure you want to delete this poll?</ModalBody>
		<ModalFooter>
			<Button outline color="danger" onClick={deletePoll}>
				Delete
			</Button>{' '}
			<Button outline className="btn-black" onClick={toggle}>
				Cancel
			</Button>
		</ModalFooter>
	</Modal>
)
