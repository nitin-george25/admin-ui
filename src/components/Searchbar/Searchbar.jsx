import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import './searchbar.scss';

const Searchbar = ({ onSearch = () => {}, placeholder }) => {
	const [searchValue, setSearchValue] = useState('');

	useEffect(() => {
		onSearch(searchValue);
	}, [searchValue]);

	const handleSearch = (value) => {
		setSearchValue(value);
	};

	return (
		<div data-testid='search-bar' className='search-bar'>
			<FontAwesomeIcon
				data-testid='search-icon'
				className='search-icon'
				icon={faSearch}
			/>
			<form
				className='search-input'
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<input
					data-testid='search-input'
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
