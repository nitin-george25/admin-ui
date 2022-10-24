import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faEllipsis,
	faBackwardStep,
	faBackwardFast,
	faForwardStep,
	faForwardFast,
} from '@fortawesome/free-solid-svg-icons';

import './pagination.scss';

const Pagination = ({ noOfPages, currentPage, setCurrentPage }) => {
	const [pageNos, setPageNos] = useState(
		Array.from({ length: noOfPages }, (_, index) => index + 1)
	);

	let restOfPagesFlag = false;

	console.log('pagination', noOfPages, currentPage);

	useEffect(() => {
		console.log('noOfPages changed');
		setPageNos(Array.from({ length: noOfPages }, (_, index) => index + 1));
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
					icon={faBackwardFast}
					onClick={() => goToPage(1)}
				/>
				<FontAwesomeIcon
					className='pagination-icon'
					icon={faBackwardStep}
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
					icon={faForwardStep}
					onClick={() => nextPage()}
				/>
				<FontAwesomeIcon
					className='pagination-icon'
					icon={faForwardFast}
					onClick={() => goToPage(noOfPages)}
				/>
			</ul>
		</nav>
	);
};

export default Pagination;
