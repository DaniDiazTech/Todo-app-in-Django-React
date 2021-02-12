import React, { useEffect, useState } from 'react'
import './App.css';

const App = () => {

    const [task, setTask] = useState({
        id: null,
        nameTask: '',
        description: '',
        completed: false,
        editing: false,
    })

    const [taskList, setaskList] = useState([])

    const handleInputChange = ({ target }) => {
        const { name, value } = target
        setTask({
            ...task,
            [name]: value
        })
    }

    const getTask = async () => {
        try {
            const url = "http://127.0.0.1:8000/api/task-list/"
            const response = await fetch(url)
            const data = await response.json()
            setaskList(data)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getTask()
    }, [])

    // Send data
    const handleSubmit = (e) => {
        e.preventDefault()
        const url = "http://127.0.0.1:8000/api/task-create/"
        fetch(url,{
            method:'POST',
            headers:{
                'Content-type': 'application/json',
            },
            body: JSON.stringify(task)
        }).then(
            getTask(),
            setTask({
                id: null,
                nameTask: '',
                description: '',
                completed: false,
                editing: false,
            })
        ).catch(error=>console.error(error))
    }

   


    return (
        <div className="container mt-2">
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
                        rows="3"
                        value={task.description}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
            {
                taskList.map(({ id, nameTask, description}) => (
                   <div key={id} className="border m-2">
                        <p>title: {nameTask}</p>
                    <p>description: {description}</p>
                    <button className="btn btn-primary mr-3">Editar</button>
                    <button className="btn btn-danger">Eliminar</button>
                   </div>
                ))
            }
        </div>
    )
}

export default App;
