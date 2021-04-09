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

  console.log(taskList);
  return (
    <div className="container mt-2">
      <h1 className="my-2">Task app</h1>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
