import React, { FC, useEffect, useState } from 'react';

import './App.css';

import { getUser, User } from "./get-user";


const App = () => {
    const [text, setText] = useState('');
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUser();
            setUser(user)
        }
        fetchUser();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
    };
    return (
        <div>
            {user && <p>Username: {user.name}</p>}
            <CustomInput value={text} onChange={handleChange}>
                Input:
            </CustomInput>
            <p>You typed:{text ? text : '...'}</p>
        </div>
    );
};

export default App;

type PropsType = {
    children: React.ReactNode;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const CustomInput: FC<PropsType> = ({children, value, onChange}) => {
    return (
        <div>
            <label htmlFor="search">{children}</label>
            <input placeholder="Example" id="search" type="text" value={value} onChange={onChange}/>
        </div>
    )
}
