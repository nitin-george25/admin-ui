import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import './searchbar.scss';

const Searchbar = ({ onSearch, placeholder }) => {
	const [searchValue, setSearchValue] = useState('');

	useEffect(() => {
		console.log('search value changed', searchValue);
		onSearch(searchValue);
	}, [searchValue]);

	const handleSearch = (value) => {
		console.log(value);
		onSearch(value);
	};

	return (
		<div className='search-bar'>
			<FontAwesomeIcon className='search-icon' icon={faSearch} />
			<form
				className='search-input'
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<input
					className='search-input'
					type='text'
					placeholder={placeholder || 'Start Typing...'}
					onChange={(e) => handleSearch(e.currentTarget.value)}
				/>
			</form>
		</div>
	);
};

Searchbar.propTypes = {
	searchFunction: PropTypes.func,
};

export default Searchbar;
