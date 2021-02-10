import React from 'react'
import './App.css';


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            todoList: [],
            activeItem: {
                id: null,
                title: '',
                description: '',
                completed: false,
            },
            editing: false,
        }
        this.fetchTasks = this.fetchTasks.bind(this)
    }

    componentWillMount(){
        this.fetchTasks()
    }

    fetchTasks(){
        console.log("fetching ..")
    }

    render() {
        return (
            <div className="container">
                <div id="task-container">
                    <div id="form-wrapper">
                        <form id="form">
                            <div className="flex-wrapper">
                                <div style={{ flex: 6 }}>
                                    <input className="form-control" id="title" type="text" placeholder="Add Task" />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <input className="btn btn-grad" id="submit" type="submit" name="add" value="Add" />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div id="list-wrapper">


                    </div>
                </div>
            </div>

        )
    }

}

export default App;