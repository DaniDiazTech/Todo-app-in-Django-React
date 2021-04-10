import { createContext, ReactNode, useState } from 'react';
import { taskInterface } from '../interfaces/appInterfaces';

export const ToDoContext = createContext({
  task: {
    id: null,
    nameTask: '',
    description: '',
    complete: false,
    editing: false,
  },
  setTask: (state: any) => {},
  taskList: {
    data: [],
    loading: true,
  },
  setTaskList: (state: any) => {},
});

type ToDoProviderProps = {
  children: ReactNode;
};

const ToDoProvider = ({ children }: ToDoProviderProps) => {
  const [taskList, setTaskList] = useState({
    data: [],
    loading: true,
  });

  const [task, setTask] = useState<taskInterface>({
    id: null,
    nameTask: '',
    description: '',
    complete: false,
    editing: false,
  });

  return (
    <ToDoContext.Provider
      value={{
        task,
        setTask,
        taskList,
        setTaskList,
      }}
    >
      {children}
    </ToDoContext.Provider>
  );
};

export default ToDoProvider;
