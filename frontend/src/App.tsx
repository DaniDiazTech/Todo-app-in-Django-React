import ToDoProvider, { ToDoContext } from './context/ToDoProvider';
import { TaskItem, Form, Spin } from './components';
import { useContext, useEffect } from 'react';
import { getData } from './helpers/getData/getData';

const App = () => {
  const { taskList, setTaskList } = useContext(ToDoContext);

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
    <div className="container mt-2">
      <h1 className="my-2 text-center primary">Task app</h1>
      <Form />
      <div className="container d-flex justify-content-center align-items-center">
        {taskList.loading ? (
          <Spin />
        ) : (
          <div className="container">
            {taskList.data.map(({ id, nameTask, description, complete }) => (
              <TaskItem
                key={id}
                id={id}
                nameTask={nameTask}
                description={description}
                complete={complete}
              />
            ))}

            {taskList.data.length < 1 && (
              <div className="container h-100">
                <p className="mt-5 primary text-center fs-2">
                  Hurray! You don't have tasks yet
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
