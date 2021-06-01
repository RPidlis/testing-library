import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import React from 'react';

import { CustomInput } from "../components/CustomInput";

describe('When everything is OK', () => {
    test('should call the onChange callback handler when using fireEvent func', () => {
        const onChange = jest.fn();
        render(
            <CustomInput value="" onChange={onChange}>
                Input:
            </CustomInput>
        );
        fireEvent.change(screen.getByRole('textbox'),{target:{value:'David'}});
        expect(onChange).toBeCalledTimes(1);
    });

    test('should call the onChange callback handler when using the userEvent Api', async () => {
        const onChange = jest.fn();
        render(
            <CustomInput value="" onChange={onChange}>
                Input:
            </CustomInput>
        );
        await userEvent.type(screen.getByRole('textbox'), 'David');
        expect(onChange).toBeCalledTimes(5);
    });
});
