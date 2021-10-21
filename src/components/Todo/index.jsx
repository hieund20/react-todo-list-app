import React, { useState } from 'react';
import { uuid } from 'uuidv4';
import PropTypes from 'prop-types';
import './style.scss';

Todo.propTypes = {
    tasks: PropTypes.array,
    activeButton: PropTypes.string,
    setActiveButton: PropTypes.func,
    onTodoSubmit: PropTypes.func
};

Todo.defaultProps = {
    tasks: [],
    activeButton: '',
    setActiveButton: null,
    onTodoSubmit: null
}

function Todo(props) {
    const { activeButton, setActiveButton, onTodoSubmit } = props;
    const [title, setTitle] = useState('');

    function handleChange(e) {
        setTitle(e.target.value);
    }

    function handleAddNewTask() {
        //Do not something if onTodoSubmit = null
        if (onTodoSubmit === null) return;
        if (title === '') {
            alert("You don't input new task !!");
            return;
        }
        const task = {
            key: uuid(),
            title: title,
            isActive: true
        }
        //Send input value to parent
        onTodoSubmit(task);
        //Reset input value when add a new todo
        setTitle('');
    }

    function handleCLickAdd(e) {
        e.preventDefault();
        handleAddNewTask();
    }

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            handleAddNewTask();
        }
    }

    return (
        <div className="todo">
            <div className="todo-nav">
                <ul>
                    <li className={`todo-nav-item ${activeButton === 'All' ? 'active' : ''}`}
                        onClick={() => setActiveButton('All')}>
                        All
                    </li>
                    <li className={`todo-nav-item ${activeButton === 'Active' ? 'active' : ''}`}
                        onClick={() => setActiveButton('Active')}>
                        Active
                    </li>
                    <li className={`todo-nav-item ${activeButton === 'Completed' ? 'active' : ''}`}
                        onClick={() => setActiveButton('Completed')}>
                        Completed
                    </li>
                </ul>
            </div>
            {
                activeButton !== 'Completed' &&
                <div className="todo-add">
                    <input
                        className="todo-add-input"
                        type="text"
                        placeholder="add details"
                        value={title}
                        onChange={(e) => handleChange(e)}
                        onKeyPress={(e) => handleKeyPress(e)} />
                    <button
                        className="todo-add-button"
                        onClick={(e) => handleCLickAdd(e)}>Add</button>
                </div>
            }
        </div >
    );
}

export default Todo;