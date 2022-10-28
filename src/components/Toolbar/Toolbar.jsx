import React from 'react';
import PropTypes from 'prop-types';

import './toolbar.scss';
import Searchbar from '../Searchbar/Searchbar';

const Toolbar = ({ headerText, onSearch, searchPlaceholder }) => {
	return (
		<nav className='table-toolbar'>
			<h3 className='table-header'>{headerText}</h3>
			<Searchbar onSearch={onSearch} placeholder={searchPlaceholder} />
		</nav>
	);
};

Toolbar.propTypes = {
	headerText: PropTypes.string,
	onSearch: PropTypes.func,
};

export default Toolbar;
