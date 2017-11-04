import React from 'react'
import { Modal, ModalBody, Button } from 'reactstrap'

export default ({ isOpen, toggle }) => (
	<Modal isOpen={isOpen} toggle={toggle}>
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
)
