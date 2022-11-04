import React from 'react';
import { render, cleanup } from '@testing-library/react';
import App from './App';

afterEach(cleanup);

it('renders learn react link', () => {
	const { getByTestId } = render(<App />);
	expect(getByTestId('app').toBeInTheDocument());
});
