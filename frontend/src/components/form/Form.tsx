import React, { useContext } from 'react';
import { sendData } from '../../helpers/sendData/sendData';
import { fieldsInterface } from '../../interfaces/appInterfaces';
import { getData } from '../../helpers/getData/getData';
import { ToDoContext } from '../../context/ToDoProvider';

const Form = () => {
  const { setTaskList,task,setTask } = useContext(ToDoContext);
  
  const handleInputChange = (e: any) => {
    const { name, value }: fieldsInterface = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    let url = ""
    let action = "";

    if(task.editing){
      url = `http://localhost:8000/api/task-update/${task.id}/`
      action = 'PUT'
      await sendData(url, task, action);
    }else {
       url = 'http://localhost:8000/api/task-create/'
       action = 'POST';
       await sendData(url, task, action);
    }
  
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
    <form className="container-fluid" onSubmit={ handleSubmit }>
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
      <button className="btn btn-primary">{task.editing ? 'Edit'  : 'Submit'}</button>
    </form>
  );
};

export default React.memo(Form);
