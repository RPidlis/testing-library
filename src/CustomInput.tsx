import { ChangeEvent, FC, ReactNode } from "react";

type PropsType = {
    children: ReactNode;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

 export const CustomInput: FC<PropsType> = ({
    children,
    value, onChange
 }) => (
        <div>
            <label htmlFor="search">{children}</label>
            <input placeholder="Example" id="search" type="text" value={value} onChange={onChange}/>
    </div>
);
