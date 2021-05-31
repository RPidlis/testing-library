import React, {FC, useState} from 'react';
import './App.css';

function App() {
    const [text, setText] = useState('')
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
    }
    return (
        <div>
            <CustomInput value={text} onChange={handleChange}>
                Input:
            </CustomInput>
            <p>You typed:{text ?? '...'}</p>
        </div>
    );
}

export default App;

type PropsType = {
    children: React.ReactNode;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>)=> void;
};

const CustomInput: FC<PropsType> = ({children, value, onChange}) => {
    return (
        <div>
            <label htmlFor="search">{children}</label>
            <input placeholder="Example" id="search" type="text" value={value} onChange={onChange}/>
        </div>
    )
}
