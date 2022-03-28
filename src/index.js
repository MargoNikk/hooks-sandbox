import React from 'react';
import ReactDOM from 'react-dom';
import HookSwitcher from './use-state';
import HookContext from './use-context';
import HookEffect from './use-effect';

const App = () => {
  return (
    <div>
      <h1>Use useState()</h1>
      <HookSwitcher />
      <br />
      <h1>Use useContext()</h1>
      <HookContext />
      <h1>Use useEffect()</h1>
      <HookEffect />
    </div>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);