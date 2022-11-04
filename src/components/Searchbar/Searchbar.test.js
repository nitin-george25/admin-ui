import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Searchbar from './Searchbar';

afterEach(cleanup);

it('should render search bar', () => {
	const { getByTestId } = render(<Searchbar />);
	expect(getByTestId('search-bar')).toBeInTheDocument();
});

it('search input to be empty', () => {
	const { getByTestId } = render(<Searchbar />);
	expect(getByTestId('search-input')).toHaveTextContent('');
});
