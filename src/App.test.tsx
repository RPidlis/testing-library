import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import { mocked } from "ts-jest/utils";
import React from 'react';

import App from './App';
import { getUser } from "./get-user";
import userEvent from "@testing-library/user-event";

jest.mock('./get-user');
const mockGetUser = mocked(getUser, true);

describe('When everything is OK', () => {
    beforeEach(async () => {
        render(<App/>);
        await waitFor(() => expect(mockGetUser).toHaveBeenCalled())
    });

    test('should render the app without crashing', () => {
        screen.debug();
    });

    test('should select the children that is being passed to the CustomInput', () => {
        screen.getAllByText(/input/i);
    });

    test('should select the input element by role', () => {
        const input = screen.getAllByRole('textbox');
        expect(input[0]).toBeInTheDocument();
        expect(input.length).toEqual(1);
    });

    test('should select a label element by its text', () => {
        const label = screen.getByLabelText('Input:');
        expect(label).toBeInTheDocument();
    });

    test('should select a input element by placeholder text', () => {
        const input = screen.getAllByPlaceholderText('Example');
        expect(input[0]).toBeInTheDocument();
    });

    test('should not find the role "whatever" in our component', () => {
        expect(screen.queryByRole('whatever')).toBeNull();
    });
});

describe('when the component fetches the user successfully', () => {
    beforeEach(() => {
        mockGetUser.mockClear();
    });

    test('should call getUser once', async () => {
        render(<App/>);
        await waitFor(() => expect(mockGetUser).toHaveBeenCalledTimes(1));
    });

    test('should render the  username passed', async () => {
        const name = 'Jordan'
        mockGetUser.mockResolvedValueOnce({ id: '1', name } );
        render(<App/>);
        expect(screen.queryByText(/Username/i)).toBeNull();
        expect(await screen.findByText(/username/i)).toBeInTheDocument();
        expect(await screen.findByText(/name/)).toBeInTheDocument();
    });
});

describe('When the user enters some text in the input element', () => {
    test('should display the text in the screen', async () => {
        render(<App/>);
        await waitFor(() => expect(mockGetUser).toHaveBeenCalled());
        expect(screen.getByText(/You typed:.../i))

        await userEvent.type(screen.getByRole('textbox'), 'David');
        // fireEvent.change(screen.getByRole('textbox'), {target: {value:'davidH'}});

        expect(screen.getByText(/You typed:David/i))
    });
});
