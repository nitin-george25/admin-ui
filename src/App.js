import { useEffect, useState } from 'react';

import DataTable from './components/Table/DataTable';
import Toolbar from './components/Toolbar/Toolbar';
import { getUsers } from './services/getUsers';

import './App.scss';
import Pagination from './components/Pagination/Pagination';

export const App = () => {
	const noOfRowsPerPage = 10;
	const [rows, setRows] = useState([]);
	const [selectedRows, setSelectedRows] = useState([]);
	const [loading, setLoading] = useState(true);
	// const [noOfPages, setNoOfPages] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	let noOfPages = Math.ceil(rows?.length / noOfRowsPerPage);

	const headCells = [{ text: 'name' }, { text: 'email' }, { text: 'role' }];

	useEffect(() => {
		getUsers()
			.then((res) => {
				setRows(res.sort((a, b) => (a.name > b.name ? 1 : -1)));
				setLoading(false);
			})
			.catch((err) => {
				console.log('Error in fetching data', err);
			});
	}, []);

	useEffect(() => {
		if (rows?.length > 0) {
			console.log('changing no of pages');
			// setNoOfPages(Math.ceil(rows?.length / noOfRowsPerPage));
		}
	}, [rows]);

	const handleSearch = (value) => {};

	return (
		<div className='App-container'>
			<Toolbar
				headerText={'Users'}
				onSearch={handleSearch}
				searchPlaceholder={'Search by name, email or role'}
			/>
			{loading ? (
				<p>Loading...</p>
			) : (
				<DataTable
					data={rows}
					setData={setRows}
					headCells={headCells}
					currentPage={currentPage}
					rowsPerPage={noOfRowsPerPage}
					selectedRows={selectedRows}
					setSelectedRows={setSelectedRows}
				/>
			)}
			<div className='table-footer'>
				<button className='delete'>Delete Selected</button>
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
