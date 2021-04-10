import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ToDoProvider from './context/ToDoProvider';

ReactDOM.render(
  <React.StrictMode>
    <ToDoProvider>
      <App />
    </ToDoProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
