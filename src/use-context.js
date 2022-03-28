import React, { useContext } from 'react';

const MyContext = React.createContext();

const HookContext = () => {
    return (
        <MyContext.Provider value="This is context be React hooks :)">
            <Child />
        </MyContext.Provider>
    );
};

const Child = () => {
    const value = useContext(MyContext);
    return (
        <p> {value} </p>
    );
};

export default HookContext;