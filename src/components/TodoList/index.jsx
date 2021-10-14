import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

TodoList.propTypes = {
    todos: PropTypes.array,
    activeTodos: PropTypes.array,
    completedTodos: PropTypes.array,
    checkStatus: PropTypes.string,
    onTodoClick: PropTypes.func,
    onActiveTodoClick: PropTypes.func,
    onRemoveToDoClick: PropTypes.func,
    onRemoveAllClick: PropTypes.func
};

TodoList.defaultProps = {
    todos: [],
    activeTodos: [],
    completedTodos: [],
    checkStatus: '',
    onTodoClick: null,
    onActiveTodoClick: null,
    onRemoveToDoClick: null,
    onRemoveAllClick: null
}

function TodoList(props) {
    const {
        todos,
        activeTodos,
        completedTodos,
        checkStatus,
        onTodoClick,
        onActiveTodoClick,
        onRemoveToDoClick,
        onRemoveAllClick } = props;

    function handleClick(todo) {
        if (onTodoClick !== null) {
            onTodoClick(todo);
        }
    };

    function handleActiveClick(activeTodo) {
        if (onActiveTodoClick !== null) {
            onActiveTodoClick(activeTodo);
        }
    }

    function handleRemoveClick(completedTodo) {
        if (onRemoveToDoClick !== null) {
            onRemoveToDoClick(completedTodo);
        }
    }

    function handleRemoveAllClick() {
        if (onRemoveAllClick !== null) {
            onRemoveAllClick();
        }
    }

    return (
        <div className="list">
            {
                checkStatus === 'All' &&
                todos.map(todo => (
                    <div className="list-todo">
                        {todo.checked === true &&
                            <input
                                className="list-todo-checkbox"
                                type="checkbox"
                                key={todo.id}
                                onClick={() => handleClick(todo)}
                                checked
                            />
                        }
                        {
                            todo.checked === false &&
                            <input
                                className="list-todo-checkbox"
                                type="checkbox"
                                key={todo.id}
                                onClick={() => handleClick(todo)}
                            />
                        }
                        <span className={`list-todo-text ${todo.checked === true ? 'check' : ''}`}>
                            {todo.content}
                        </span>
                    </div>
                ))
            }
            {
                checkStatus === 'Active' &&
                activeTodos.map(activeTodo => (
                    <div className="list-todo">
                        <input
                            className="list-todo-checkbox"
                            type="checkbox"
                            key={activeTodo.id}
                            onClick={() => handleActiveClick(activeTodo)}
                        />
                        <span className="list-todo-text">{activeTodo.content}</span>
                    </div>
                ))
            }
            {
                checkStatus === 'Completed' &&
                completedTodos.map(completedTodo => (
                    <div className="list-todo">
                        <input
                            className="list-todo-checkbox"
                            type="checkbox"
                            key={completedTodo.id}
                            checked
                        />
                        <span className={`list-todo-text ${completedTodo.checked === true ? 'check' : ''}`}>
                            {completedTodo.content}
                        </span>
                        <span
                            className="material-icons"
                            onClick={() => handleRemoveClick(completedTodo)}>
                            delete_outline
                        </span>
                    </div>
                ))
            }
            {
                checkStatus === 'Completed' && completedTodos.length > 0 &&
                <button
                    className="list-delete"
                    onClick={handleRemoveAllClick}>
                    <span className="material-icons">delete_outline</span>
                    <span className="list-delete-text">delete all</span>
                </button>
            }
        </div >
    );
}

export default TodoList;