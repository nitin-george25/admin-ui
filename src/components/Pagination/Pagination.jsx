import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faEllipsis,
	faAngleLeft,
	faAnglesLeft,
	faAngleRight,
	faAnglesRight,
} from '@fortawesome/free-solid-svg-icons';

import { getRange } from '../../utils/getRange';

import './pagination.scss';

const Pagination = ({ noOfPages, currentPage, setCurrentPage }) => {
	const [pageNos, setPageNos] = useState(getRange(1, noOfPages));

	let restOfPagesFlag = false;

	useEffect(() => {
		setPageNos(getRange(1, noOfPages));

		if (noOfPages < currentPage) {
			setCurrentPage(noOfPages);
		}
	}, [noOfPages]);

	const nextPage = () => {
		if (currentPage < noOfPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const previousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const goToPage = (pageNo) => {
		setCurrentPage(pageNo);
	};

	return (
		<nav className='pagination-container'>
			<ul className='pagination'>
				<FontAwesomeIcon
					className='pagination-icon'
					icon={faAnglesLeft}
					onClick={() => goToPage(1)}
				/>
				<FontAwesomeIcon
					className='pagination-icon'
					icon={faAngleLeft}
					onClick={() => previousPage()}
				/>
				{pageNos.map((pageNo) => {
					if (
						noOfPages >= 5 &&
						((pageNo > currentPage + 1 && pageNo < noOfPages - 1) ||
							(pageNo < currentPage && pageNo > 3))
					) {
						if (restOfPagesFlag) {
							return;
						} else {
							restOfPagesFlag = true;
							return (
								<li className='page-numbers' key={pageNo}>
									<FontAwesomeIcon icon={faEllipsis} />
								</li>
							);
						}
					} else
						return (
							<li
								className={`page-numbers${
									pageNo === currentPage ? ' active' : ''
								}`}
								key={pageNo}
								onClick={() => goToPage(pageNo)}
							>
								{pageNo}
							</li>
						);
				})}
				<FontAwesomeIcon
					className='pagination-icon'
					icon={faAngleRight}
					onClick={() => nextPage()}
				/>
				<FontAwesomeIcon
					className='pagination-icon'
					icon={faAnglesRight}
					onClick={() => goToPage(noOfPages)}
				/>
			</ul>
		</nav>
	);
};

export default Pagination;
