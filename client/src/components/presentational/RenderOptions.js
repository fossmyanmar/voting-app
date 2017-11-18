import React from 'react'
import { Field } from 'redux-form'
import { Button } from 'reactstrap'

import RenderExtraOption from './RenderExtraOption'

export default ({ fields, meta: { error, pristine } }) => {
	return (
		<div className="text-center">
			<Button
				outline
				className="btn-black btn-add-option"
				onClick={() => fields.push()}>
				Add Option
			</Button>
			{!pristine && error && <div className="error">{error}</div>}
			{fields.map((field, index) => (
				<Field
					key={index}
					name={field}
					component={RenderExtraOption}
					deleteOption={fields}
					index={index}
					placeholder={`Option ${index + 1}`}
				/>
			))}
		</div>
	)
}
