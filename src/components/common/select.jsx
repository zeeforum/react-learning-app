import React from 'react';

const Select = ({ name, label, options, textProperty, valueProperty, error, ...rest }) => {
	return (<div className="form-group">
		<label htmlFor={name}>{label}</label>
		<select
			{...rest}
			name={name}
			id={name}
			className="form-control"
		>
			<option value="" />
			{
				options.map(option => (
					<option key={`select-${option[valueProperty]}`} value={option[valueProperty]}>{option[textProperty]}</option>
				))
			}
		</select>
		{error && <div className="alert alert-danger">
			{error}
		</div>}
	</div>);
};

Select.defaultProps = {
	valueProperty: '_id',
	textProperty: 'name'
};

export default Select;