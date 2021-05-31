import { render, screen } from '@testing-library/react';
import React from 'react';

import App from './App';

describe('When everything is OK', () => {
    beforeEach(() => {
        render(<App/>);
    });
    it('should render the app without crashing', () => {
        screen.debug();
    });

    it('should select the children that is being passed to the CustomInput', () => {
        screen.getByText(/input/i);
    });

    it('should select the input element by role', () => {
        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument()
    });

    it('should select a label element by its text', () => {
        const label = screen.getByLabelText('Input:');
        expect(label).toBeInTheDocument();
    });

    it('should select a input element by placeholder text', () => {
        const input = screen.getByPlaceholderText('Example');
        expect(input).toBeInTheDocument();
    });
});
