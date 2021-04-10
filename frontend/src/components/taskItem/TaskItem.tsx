import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { getData } from '../../helpers/getData/getData';
import { ToDoContext } from '../../context/ToDoProvider';

type TaskItemProps = {
  id: number;
  nameTask: string;
  description: string;
  complete: boolean;
};

const TaskItem = ({ id, nameTask, description, complete }: TaskItemProps) => {
  const { setTaskList, setTask } = useContext(ToDoContext);

  const handleUpdate = (id: number, nameTask: string, description: string) => {
    setTask({
      id,
      nameTask,
      description,
      complete: false,
      editing: true,
    });
  };

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
    <div className="card my-3 animate__animated  animate__bounceIn" key={id}>
      <div className="card-content">
        <div className="card-body">
          <div className="media d-flex">
            <div className="media-body text-left">
              <h3 className="primary">
                {complete ? <s> {nameTask}</s> : <p> {nameTask}</p>}
              </h3>
              <span>
                <p>{description}</p>
              </span>
            </div>
            <div className="align-self-center">
              <button
                className="btn btn-primary mr-3"
                onClick={() => handleUpdate(id, nameTask, description)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TaskItem.propTypes = {
  id: PropTypes.number.isRequired,
  nameTask: PropTypes.string.isRequired,
};

export default React.memo(TaskItem);
