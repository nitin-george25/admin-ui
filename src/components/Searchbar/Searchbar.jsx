import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import './searchbar.scss';

const Searchbar = ({ searchFunction, placeholder }) => {
	const [searchValue, setSearchValue] = useState('');

	useEffect(() => {
		searchFunction(searchValue);
	}, [searchValue]);

	const onSearch = (value) => {
		if (searchValue !== '') {
			setSearchValue(value);
		}
	};

	return (
		<div className='search-bar'>
			<FontAwesomeIcon className='search-icon' icon={faSearch} />
			<form className='search-input'>
				<input
					className='search-input'
					type='text'
					placeholder={placeholder || 'Start Typing...'}
					onChange={(e) => onSearch(e.currentTarget.value)}
				/>
			</form>
		</div>
	);
};

Searchbar.propTypes = {
	searchFunction: PropTypes.func,
};

export default Searchbar;
