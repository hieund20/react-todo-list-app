import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

TodoList.propTypes = {
    tasks: PropTypes.array,
    checkStatus: PropTypes.string,
    onTaskClick: PropTypes.func,
    onRemoveTaskClick: PropTypes.func,
    onRemoveAllClick: PropTypes.func
};

TodoList.defaultProps = {
    tasks: [],
    checkStatus: '',
    onTaskClick: null,
    onRemoveTask: null,
    onRemoveAllTask: null
}

function TodoList(props) {
    const {
        tasks,
        checkStatus,
        onTaskClick,
        onRemoveTask,
        onRemoveAllTask } = props;
    const [reRender, setReRender] = useState(1);

    useEffect((task) => {
        //Re-render to update status of checkbox
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, reRender);

    function handleTaskClick(task) {
        if (onTaskClick !== null) {
            if (checkStatus !== 'Completed') {
                if (!task.isActive) { task.isActive = true; }
                else task.isActive = false;
                onTaskClick(task);
            }
            else {
                task.isActive = true;
                onTaskClick(task);
            }
            setReRender(reRender === 1 ? 0 : 1);
        }
    };

    function handleRemoveClick(task) {
        if (onRemoveTask !== null) {
            onRemoveTask(task);
        }
    }

    function handleRemoveAllTaskClick() {
        if (onRemoveAllTask !== null) {
            onRemoveAllTask();
        }
    }


    return (
        <div className="list">
            {
                checkStatus === 'All' &&
                tasks.map(task => (
                    <div className="list-todo">
                        <input
                            className="list-todo-checkbox"
                            type="checkbox"
                            key={task.key}
                            onClick={() => handleTaskClick(task)}
                            checked={task.isActive === false ? true : false}
                        />
                        <span className={`list-todo-text ${task.isActive}`}>
                            {task.title}
                        </span>
                    </div>
                ))
            }
            {
                checkStatus === 'Active' &&
                tasks.filter(task => {
                    return task.isActive === true;
                }).map(task => (
                    <div className="list-todo" >
                        <input
                            className="list-todo-checkbox"
                            type="checkbox"
                            key={task.key}
                            onClick={() => handleTaskClick(task)}
                            checked={task.isActive === false ? true : false}
                        />
                        <span className={`list-todo-text ${task.isActive}`}>
                            {task.title}
                        </span>
                    </div>
                ))
            }
            {
                checkStatus === 'Completed' &&
                tasks.filter(task => {
                    return task.isActive === false;
                }).map(task => (
                    <div className="list-todo" >
                        <input
                            className="list-todo-checkbox"
                            type="checkbox"
                            key={task.key}
                            onClick={() => handleTaskClick(task)}
                            checked={task.isActive === false ? true : false}
                        />
                        <span className={`list-todo-text ${task.isActive}`}>
                            {task.title}
                        </span>
                        <span
                            className="material-icons"
                            onClick={() => handleRemoveClick(task)}>
                            delete_outline
                        </span>
                    </div>
                ))
            }
            {
                checkStatus === 'Completed' &&
                tasks.some(task => task.isActive === false) === true &&
                <button
                    className="list-delete"
                    onClick={() => handleRemoveAllTaskClick()}>
                    <span className="material-icons">delete_outline</span>
                    <span className="list-delete-text">delete all</span>
                </button>
            }
        </div >
    );
}

export default TodoList;