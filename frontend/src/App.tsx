import { useEffect, useState, createContext } from 'react';
import { getData } from './helpers/getData';
import { TaskItem, Form, Spin } from './components';
import ToDoProvider from './context/ToDoProvider';

const App = () => {
  
  useEffect(() => {
    getData()
      .then((data) =>
        setTaskList({
          data,
          loading: false,
        })
      )
      .catch((e) => console.warn(e));
  }, []);

  return (
    <ToDoProvider>
      <div className="container mt-2">
        <h1 className="my-2">Task app</h1>
        <Form />
        <div className="container d-flex justify-content-center align-items-center">
          {taskList.loading ? (
            <Spin />
          ) : (
            <div className="container">
              {taskList.data.map(({ id, nameTask }) => (
                <TaskItem key={id} id={id} nameTask={nameTask} />
              ))}
            </div>
          )}
        </div>
      </div>
    </ToDoProvider>
  );
};

export default App;
