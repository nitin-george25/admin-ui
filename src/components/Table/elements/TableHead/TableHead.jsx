import React from 'react';

import { capitalize } from '../../../../utils/capitalize';

import './tablehead.scss';

const TableHead = ({ headCells, selectedRows, rowsPerPage, onSelectAll }) => {
	const handleSelectAll = (e) => {
		const isChecked = e.target.checked;

		onSelectAll(isChecked);
	};

	return (
		<thead className='custom-table-head'>
			<tr>
				<th className='custom-table-header checkbox'>
					<input
						className='checkbox'
						type={'checkbox'}
						onChange={(e) => handleSelectAll(e)}
						checked={selectedRows?.length === rowsPerPage}
					/>
				</th>
				{headCells?.map((cell, index) => (
					<th className='custom-table-header' key={`${cell.text}-${index}`}>
						{capitalize(cell.text)}
					</th>
				))}
				<th className='custom-table-header'>Actions</th>
			</tr>
		</thead>
	);
};

export default TableHead;
