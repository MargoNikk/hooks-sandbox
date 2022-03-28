import React, { useState } from 'react';

const HookSwitcher = () => {
    const [bgColor, setBgColor] = useState('lightpink');
    const [fontSize, setFontSize] = useState(16);
    const [person, setPerson] = useState({
        firstName: 'Bob',
        lastName: 'Petersan'
    });

    return (
        <div style={{
            padding: '20px',
            backgroundColor: bgColor,
            fontSize: `${fontSize}px`
        }}>
            <p>{`What an awesome day, ${person.firstName}! Your last name is ${person.lastName}`}</p>
            <button onClick={() => setPerson((person) => {
                return {
                    ...person,
                    firstName: person.firstName === 'Bob' ? 'Paul' : 'Bob',
                }
            })}>Change name</button>
            <button onClick={() => setBgColor('lightpink')}>Pink</button>
            <button onClick={() => setBgColor('darkred')}>Wine</button>
            <button onClick={() => setFontSize((s) => s + 2)}>Increase font</button>
            <button onClick={() => setFontSize((s) => s - 2)}>Decrease font</button>
        </div>
    );
};

export default HookSwitcher;