import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class TableHeader extends Component {
	raiseSort = path => {
		const sortColumn = { ...this.props.sortColumn };

		if (sortColumn.path === path)
			sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
		else {
			sortColumn.path = path;
			sortColumn.order = 'asc';
		}

		this.props.onSort(sortColumn);
	};

	renderSortIcon = column => {
		if (!column.path || column.path !== this.props.sortColumn.path) return null;

		if (this.props.sortColumn.order === 'asc') return <FontAwesomeIcon icon={['fas', 'sort-up']} />

		return <FontAwesomeIcon icon={['fas', 'sort-down']} />;
	}

	render() {
		return (<thead>
			<tr>
				{this.props.columns.map(column => (
					<th className={column.path ? 'cursor-pointer' : ''} key={'table-' + (column.path || column.key)} onClick={() => column.path ? this.raiseSort(column.path) : false}>
						{column.label} {this.renderSortIcon(column)}
					</th>
				))}
			</tr>
		</thead>);
	}
}

export default TableHeader;