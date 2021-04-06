import React, { useContext, useState } from 'react';
import { sendData } from '../helpers/sendData';
import { fieldsInterface, taskInterface } from '../interfaces/appInterfaces';
import { getData } from '../helpers/getData';
import { ToDoContext } from '../App';

const Form = () => {
  const { setTaskList } = useContext(ToDoContext);
  const [task, setTask] = useState<taskInterface>({
    id: null,
    nameTask: '',
    description: '',
    completed: false,
    editing: false,
  });

  const handleInputChange = (e: any) => {
    const { name, value }: fieldsInterface = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await sendData('http://localhost:8000/api/task-create/', task);
    setTask({
      id: null,
      nameTask: '',
      description: '',
      completed: false,
      editing: false,
    });
    getData().then(data => setTaskList({
      data,
      loading: false
    }))
  };

  return (
    <form className="container-fluid" onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          type="text"
          name="nameTask"
          className="form-control"
          placeholder="Task name"
          value={task.nameTask}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <textarea
          className="form-control"
          name="description"
          placeholder="Task description"
          value={task.description}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default React.memo(Form);
