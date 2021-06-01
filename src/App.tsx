import { ChangeEvent, useEffect, useState } from 'react';

import {CustomInput} from "./components/CustomInput";

import { getUser, User } from "./api/get-user";
import './App.css';


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

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
