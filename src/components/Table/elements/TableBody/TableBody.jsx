import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

import './tablebody.scss';

const TableBody = ({
	data,
	headers,
	currentPage,
	rowsPerPage,
	selectedRows,
	onDelete,
	onRowSelection,
}) => {
	const [rows, setRows] = useState([]);

	const sliceData = (data) => {
		const startNumber = (currentPage - 1) * rowsPerPage;
		return data.slice(startNumber, startNumber + rowsPerPage);
	};

	useEffect(() => {
		let rowData = sliceData(data);
		setRows(rowData);
	}, [data, currentPage]);

	const deleteRow = (e, row) => {
		e.stopPropagation();

		onDelete(row);
	};

	const handleRowSelection = (e, row) => {
		onRowSelection(row, e.target.checked);
	};

	const clickCheckbox = (e, rowID) => {
		// handle checkbox ui if clicked elsewhere in the row
		if (e.target.id !== `checkbox-${rowID}`) {
			let selectedCheckbox = document.getElementById(`checkbox-${rowID}`);
			selectedCheckbox.click();
		}
	};

	return (
		<tbody className='custom-table-body'>
			{rows?.map((row, index) => (
				<tr
					className='custom-table-row'
					key={`row-${index + (currentPage - 1) * 10}`}
					onClick={(e) => clickCheckbox(e, row['id'])}
				>
					<td className='custom-table-cell checkbox'>
						<input
							className='checkbox'
							type={'checkbox'}
							id={`checkbox-${row.id}`}
							onChange={(e) => handleRowSelection(e, row)}
							checked={selectedRows.indexOf(row) !== -1}
						/>
					</td>
					{headers?.map((header, index) => (
						<td key={`${row[header]}-${index}`} className='custom-table-cell'>
							{row[header]}
						</td>
					))}
					<td className='custom-table-cell actions-cell'>
						<FontAwesomeIcon
							className='trash-icon'
							icon={faTrash}
							id={`delete-${row.id}`}
							onClick={(e) => deleteRow(e, row)}
						/>
						<FontAwesomeIcon
							className='edit-icon'
							icon={faEdit}
							id={`edit-${row.id}`}
						/>
					</td>
				</tr>
			))}
		</tbody>
	);
};

export default TableBody;
