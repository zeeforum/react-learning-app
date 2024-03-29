import React from 'react';
import PropTypes from "prop-types";
import _ from "lodash";

function Pagination({ itemsCount, pageSize, currentPage, onPageChange }) {
	const pagesCount = Math.ceil(itemsCount / pageSize);
	if (pagesCount === 1) return null;

	const pages = _.range(1, pagesCount + 1);

	return <ul className="pagination">
		{pages.map(page => <li key={"page-" + page} className={page === currentPage ? 'page-item cursor-pointer active' : 'page-item cursor-pointer'}>
			< span className="page-link" onClick={() => onPageChange(page)}>{page}</span>
		</li >)
		}
	</ul >;
}

Pagination.propTypes = {
	itemsCount: PropTypes.number.isRequired,
	pageSize: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired
};

export default Pagination;