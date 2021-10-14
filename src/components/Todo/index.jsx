import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

Todo.propTypes = {
    activeButton: PropTypes.string,
    setActiveButton: PropTypes.func,
    onTodoSubmit: PropTypes.func
};

Todo.defaultProps = {
    activeButton: '',
    setActiveButton: null,
    onTodoSubmit: null
}


function Todo(props) {
    const { activeButton, setActiveButton, onTodoSubmit } = props;
    const [value, setValue] = useState('');

    function handleChange(e) {
        setValue(e.target.value);
    }

    function handleAddNewTodo(e) {
        e.preventDefault();
        //Do not something if onTodoSubmit = null
        if (onTodoSubmit === null) return;

        const todo = {
            content: value,
            checked: false
        }
        //Send input value to parent
        onTodoSubmit(todo);

        //Reset input value when add a new todo
        setValue('');
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
                        value={value}
                        onChange={(e) => handleChange(e)} />
                    <button
                        className="todo-add-button"
                        onClick={(e) => handleAddNewTodo(e)}>Add</button>
                </div>
            }

        </div >
    );
}

export default Todo;