import React from 'react';

const ListGroup = ({
	items,
	onItemSelect,
	textProperty,
	valueProperty,
	selectedItem
}) => {
	return (<ul className="list-group">
		{
			items.map(item =>
				<li
					key={'item-' + item[valueProperty]}
					className={'list-group-item cursor-pointer ' + (item === selectedItem ? 'active' : '')}
					onClick={() => onItemSelect(item)}
				>
					{item[textProperty]}
				</li>)
		}
	</ul>);
}

ListGroup.defaultProps = {
	textProperty: "name",
	valueProperty: "_id"
};

export default ListGroup;