import React from 'react';

import TableBody from './elements/TableBody/TableBody';
import TableHead from './elements/TableHead/TableHead';

import './datatable.scss';

const DataTable = ({
	data,
	setData,
	headCells,
	currentPage,
	rowsPerPage,
	selectedRows,
	onSelectAll,
	onDelete,
	onRowSelection,
}) => {
	const headers = headCells.reduce((prev, curr) => {
		if (prev) {
			prev.push(curr.text);
		}

		return prev;
	}, []);

	return (
		<div className='table-container'>
			<table className='data-table'>
				<TableHead
					headCells={headCells}
					selectedRows={selectedRows}
					rowsPerPage={rowsPerPage}
					onSelectAll={onSelectAll}
				/>
				<TableBody
					data={data}
					setData={setData}
					headers={headers}
					currentPage={currentPage}
					rowsPerPage={rowsPerPage}
					selectedRows={selectedRows}
					onDelete={onDelete}
					onRowSelection={onRowSelection}
				/>
			</table>
		</div>
	);
};

export default DataTable;
