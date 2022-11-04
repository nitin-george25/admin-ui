import React, { useEffect, useState } from 'react';

import DataTable from './components/Table/DataTable';
import Toolbar from './components/Toolbar/Toolbar';
import Pagination from './components/Pagination/Pagination';

import { getUsers } from './services/getUsers';

import './App.scss';

export const App = () => {
	const [noOfRowsPerPage] = useState(10);
	const [searchParams] = useState(['name', 'role', 'email']);
	const [rows, setRows] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [selectedRows, setSelectedRows] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [noOfPages, setNoOfPages] = useState(
		Math.ceil(filteredData?.length / noOfRowsPerPage)
	);

	const headCells = [{ text: 'name' }, { text: 'email' }, { text: 'role' }];

	useEffect(() => {
		getUsers()
			.then((res) => {
				const data = res.sort((a, b) => (a.name > b.name ? 1 : -1));
				setRows(data);
				setFilteredData(data);
				setLoading(false);
			})
			.catch((err) => {
				console.log('Error in fetching data', err);
			});
	}, []);

	useEffect(() => {
		setFilteredData(rows);
	}, [rows]);

	useEffect(() => {
		if (filteredData?.length > 0) {
			setNoOfPages(Math.ceil(filteredData?.length / noOfRowsPerPage));
		}
	}, [filteredData]);

	useEffect(() => {
		setSelectedRows([]);
	}, [currentPage]);

	const handleRowSelection = (row, isChecked) => {
		var updatedSelectedRows = [...selectedRows];
		var selectedRow = row;

		let selectedRowIndex = selectedRows.indexOf(selectedRow);

		if (isChecked) {
			updatedSelectedRows?.push(selectedRow);
		} else {
			updatedSelectedRows.splice(selectedRowIndex, 1);
		}

		setSelectedRows(updatedSelectedRows);
	};

	const handleDelete = (row) => {
		let updatedData = [...rows];
		let deleteIndex = updatedData.indexOf(row);

		console.log('deleting index', deleteIndex, row);

		if (selectedRows.indexOf(row) !== -1) {
			handleRowSelection(row.id);
		}

		updatedData.splice(deleteIndex, 1);
		setRows(updatedData);
	};

	const deleteSelected = () => {
		let updatedRows = [...rows];

		while (selectedRows.length > 0) {
			let row = selectedRows.pop();
			updatedRows.splice(updatedRows.indexOf(row), 1);
		}

		console.log('Deleting rows...', updatedRows);

		setRows(updatedRows);
	};

	const selectAll = (value) => {
		if (value) {
			let updatedSelectedRows = [...selectedRows];

			rows.map((row, index) => {
				if (updatedSelectedRows.indexOf(row) === -1 && index < 10) {
					updatedSelectedRows.push(row);
				}
			});

			setSelectedRows(updatedSelectedRows);
		} else {
			setSelectedRows([]);
		}
	};

	const handleSearch = (value) => {
		let newFilteredData = [...rows];

		if (value !== '') {
			newFilteredData = newFilteredData.filter((row) => {
				return searchParams.some((param) => {
					return (
						row[param].toString().toLowerCase().indexOf(value.toLowerCase()) >
						-1
					);
				});
			});
		}

		setFilteredData(newFilteredData);
	};

	return (
		<div className='App-container' data-testid='app'>
			<Toolbar
				headerText={'Users'}
				onSearch={handleSearch}
				searchPlaceholder={'Search by name, email or role'}
			/>
			{loading ? (
				<p>Loading...</p>
			) : (
				<DataTable
					data={filteredData}
					headCells={headCells}
					currentPage={currentPage}
					rowsPerPage={noOfRowsPerPage}
					selectedRows={selectedRows}
					onRowSelection={handleRowSelection}
					onSelectAll={selectAll}
					onDelete={handleDelete}
				/>
			)}
			<div className='table-footer'>
				{selectedRows.length > 0 ? (
					<button
						className='delete'
						onClick={() => {
							deleteSelected();
						}}
					>
						Delete Selected
					</button>
				) : (
					<></>
				)}
				{noOfPages && noOfPages > 0 && (
					<Pagination
						noOfPages={noOfPages}
						noOfRowsPerPage={noOfRowsPerPage}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
					/>
				)}
			</div>
		</div>
	);
};

export default App;
