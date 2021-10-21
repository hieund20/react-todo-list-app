import { useState } from 'react';
import './App.scss';
import Header from './components/Header';
import Todo from './components/Todo';
import TodoList from './components/TodoList';

function App() {
  const [status, setStatus] = useState('All');
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks") || "[]")
  );

  function handleAddNewTodo(task) {
    const newTasks = [...tasks];
    newTasks.push(task);
    setTasks(newTasks);
    saveDataToLocalStorage(newTasks);
  }

  function handleTickOnTask(task) {
    console.log(task);
    const newTasks = [...tasks];
    newTasks.forEach(item => {
      if (item.key === task.key) {
        item.isActive = task.isActive
      }
    })
    setTasks(newTasks);
    saveDataToLocalStorage(newTasks);
  }

  function handleRemoveTask(task) {
    console.log(task);
    const index = tasks.findIndex(taskItem => taskItem.key === task.key);
    console.log(index);
    if (index !== -1) {
      let newTasks = [...tasks];
      newTasks.splice(index, 1);
      setTasks(newTasks);
      saveDataToLocalStorage(newTasks);
    }
  }

  function handleRemoveAllTask() {
    const newTasks = [];
    tasks.forEach(task => {
      if (task.isActive === false)
        console.log(task);
      else
        newTasks.push(task);
    })
    console.log(newTasks);
    setTasks(newTasks);
    saveDataToLocalStorage(newTasks);
  }

  function saveDataToLocalStorage(data) {
    localStorage.setItem("tasks", JSON.stringify(data));
  }

  return (
    <div className="app">
      <Header />
      <Todo
        tasks={tasks}
        activeButton={status}
        setActiveButton={(status) => setStatus(status)}
        onTodoSubmit={handleAddNewTodo} />
      <TodoList
        tasks={tasks}
        checkStatus={status}
        onTaskClick={handleTickOnTask}
        onRemoveTask={handleRemoveTask}
        onRemoveAllTask={handleRemoveAllTask}
      />
    </div>
  );
}

export default App;
