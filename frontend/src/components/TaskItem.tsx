import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { getData } from '../helpers/getData';
import { taskInterface } from '../interfaces/appInterfaces';
import { ToDoContext } from '../App';

type TaskItemProps = {
  id: number;
  nameTask: string;
};

const TaskItem = ({ id, nameTask }: TaskItemProps) => {
  const { setTaskList } = useContext(ToDoContext);
  const handleUpdate = async (id:number,task:taskInterface) => {
    try {
      await fetch(`http://localhost:8000/api/task-update/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      getData().then((data) =>
        setTaskList({
          data,
          loading: false,
        })
      );
    } catch (e) {
      console.warn(e);
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:8000/api/task-delete/${id}/`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
      });
      getData().then((data) =>
        setTaskList({
          data,
          loading: false,
        })
      );
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <div key={id} className="border m-2">
      <p>title: {nameTask}</p>
      <button className="btn btn-primary mr-3">Editar</button>
      <button className="btn btn-danger" onClick={() => handleDelete(id)}>
        Eliminar
      </button>
    </div>
  );
};

TaskItem.propTypes = {
  id: PropTypes.number.isRequired,
  nameTask: PropTypes.string.isRequired,
};

export default React.memo(TaskItem);
