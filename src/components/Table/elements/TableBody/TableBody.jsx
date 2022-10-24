import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

import './tablebody.scss';

const TableBody = ({ data, setData, headers, currentPage, rowsPerPage }) => {
	const [rows, setRows] = useState([]);

	useEffect(() => {
		let rowData = sliceData(data);
		setRows(rowData);
	}, [currentPage]);

	const deleteRow = async (e, index) => {
		let newData = data;
		newData.splice(index, 1);

		setData(newData);
		setRows(sliceData(newData));
	};

	const sliceData = (data) => {
		const startNumber = (currentPage - 1) * rowsPerPage;
		return data.slice(startNumber, startNumber + rowsPerPage);
	};

	return (
		<tbody className='custom-table-body'>
			{rows?.map((row, index) => (
				<tr className='custom-table-row' key={`row-${index}`}>
					<td className='custom-table-cell checkbox'>
						<input className='checkbox' type={'checkbox'} />
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
							onClick={(e) => deleteRow(e, index)}
						/>
						<FontAwesomeIcon className='edit-icon' icon={faEdit} />
					</td>
				</tr>
			))}
		</tbody>
	);
};

export default TableBody;
