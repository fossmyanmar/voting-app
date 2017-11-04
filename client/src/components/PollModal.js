import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'

export default ({ isOpen, toggle }) => (
	<Modal isOpen={isOpen} toggle={toggle}>
		<ModalHeader toggle={toggle}>Add Poll</ModalHeader>
		<ModalBody>Form</ModalBody>
		<ModalFooter>
			<Button color="success">Submit</Button>{' '}
			<Button color="danger" onClick={toggle}>
				Cancel
			</Button>
		</ModalFooter>
	</Modal>
)
