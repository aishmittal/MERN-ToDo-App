import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = props => (
    <tr>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_responsible}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</td>
        <td>
            <Link to={"/edit/"+props.todo._id}> 
                <button>Edit</button>
            </Link>
            <button class='deleteButton' onClick={() => props.onDelete(props.todo._id)}>Delete</button>
        </td>
    </tr>
)

export default class TodosList extends Component {

    constructor(props) {
        super(props);
        this.state = {todos: []};
        this.onDelete = this.onDelete.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos/')
            .then(response => {
                this.setState({ todos: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    onDelete(id) {
        console.log(id);
        axios.delete('http://localhost:4000/todos/delete/'+id)
            .then(res => {
                console.log("Todo deleted successfully!");
                window.location.reload();
        });
    }


    todoList(onDelete) {
        return this.state.todos.map(function(currentTodo, i){
            return <Todo todo={currentTodo} onDelete={onDelete} key={i} />;
        })
    }
    


    render() {
        return (
            <div>
                <h3>Todos List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList(this.onDelete) }
                    </tbody>
                </table>
            </div>
        )
    }
}