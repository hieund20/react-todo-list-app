import { useState } from 'react';
import './App.scss';
import Header from './components/Header';
import Todo from './components/Todo';
import TodoList from './components/TodoList';

function App() {
  const [status, setStatus] = useState('All');
  //Convert JSON type to JavaScript
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem("todo_list") || "[]")
  );
  const [activeTodoList, setActiveTodoList] = useState(
    JSON.parse(localStorage.getItem("todo_active_list") || "[]")
  );
  const [completedTodoList, setCompletedTodoList] = useState(
    JSON.parse(localStorage.getItem("todo_completed_list") || "[]")
  );

  function handleTodoClick(todo) {
    let stopFlag = 0;

    //Update new Todo List
    console.log(todo.checked);
    var todos = JSON.parse(localStorage.todo_list);
    console.log(1);
    for (var i = 0; i < todos.length; i++) {
      if (todo.id === todos[i].id) {
        if (todos[i].checked === true) {
          console.log(true);
          todos[i].checked = false;
          break;
        }
        if (todos[i].checked === false) {
          console.log(false);
          todos[i].checked = true;
          break;
        }
      }
    }
    setTodoList(todos);
    localStorage.setItem("todo_list", JSON.stringify(todos));

    //handle When lick todo again (uncompleted)
    if (completedTodoList.length > 0) {
      completedTodoList.forEach(completedTodo => {
        if (todo.id === completedTodo.id) {
          const newActiveTodo = {
            id: activeTodoList.length + 1,
            content: todo.content,
            checked: false
          };
          const activeTodoListClone = [...activeTodoList];
          activeTodoListClone.push(newActiveTodo);
          setActiveTodoList(activeTodoListClone);
          //Convert JavaScript to JSON type
          localStorage.setItem("todo_active_list", JSON.stringify(activeTodoListClone));
          stopFlag = 1;
        }
      })
    };

    if (stopFlag === 1) return;

    // //Add completed todo to completedTodoList
    const completedTodoListClone = [...completedTodoList];
    completedTodoListClone.push(todo);
    setCompletedTodoList(completedTodoListClone);
    //Convert JavaScript to JSON type
    localStorage.setItem("todo_completed_list", JSON.stringify(completedTodoListClone));

    // //Remove todo from Active todos
    const index = activeTodoList.findIndex(x => x.id === todo.id);
    if (index < 0) return;

    //Set again active todo
    const activeTodoListClone = [...activeTodoList];
    activeTodoListClone.splice(index, 1);
    setActiveTodoList(activeTodoListClone);
    //Convert JavaScript to JSON type
    localStorage.setItem("todo_active_list", JSON.stringify(activeTodoListClone));
  }

  function handleRemoveTodoClick(completedTodo) {
    const indexCompleted = completedTodoList.findIndex(x => x.id === completedTodo.id);
    const indexAllTodo = todoList.findIndex(x => x.id === completedTodo.id);
    if (indexCompleted < 0 || indexCompleted < 0) return;

    //Completed todo list
    const newCompletedTodoListClone = [...completedTodoList];
    newCompletedTodoListClone.splice(indexCompleted, 1);
    setCompletedTodoList(newCompletedTodoListClone);
    //Convert JavaScript to JSON type
    localStorage.setItem("todo_completed_list", JSON.stringify(newCompletedTodoListClone));

    //Set again All Todo list
    const newTodoListClone = [...todoList];
    newTodoListClone.splice(indexAllTodo, 1);
    setTodoList(newTodoListClone);
    //Save on local Storage
    localStorage.setItem("todo_list", JSON.stringify(newTodoListClone));
  }

  function handleActiveTodoClick(activeTodo) {
    const indexActive = activeTodoList.findIndex(x => x.id === activeTodo.id);
    if (indexActive < 0) return;

    //Active todo list
    const newActiveTodoListClone = [...activeTodoList];
    newActiveTodoListClone.splice(indexActive, 1);
    setActiveTodoList(newActiveTodoListClone);
    //Convert JavaScript to JSON type
    localStorage.setItem("todo_active_list", JSON.stringify(newActiveTodoListClone));
  }

  function handleRemoveAllTodoClick() {
    //Remove all completed todo
    const newCompletedTodoListClone = [...completedTodoList];
    newCompletedTodoListClone.splice(0, completedTodoList.length);
    setCompletedTodoList(newCompletedTodoListClone);
    //Convert JavaScript to JSON type
    localStorage.setItem("todo_completed_list", JSON.stringify(newCompletedTodoListClone));

    //Remove todo list have id equals removed todo
    completedTodoList.forEach(completedTodo => {
      todoList.forEach(todo => {
        if (todo.id === completedTodo.id) {
          const indexAllTodo = todoList.findIndex(x => x.id === completedTodo.id);
          todoList.splice(indexAllTodo, 1);
        }
      })
    });
    setTodoList(todoList);
    //Save on local Storage
    localStorage.setItem("todo_list", JSON.stringify(todoList));
  }

  function handleTodoSubmit(todo) {
    if (todo.content === '') {
      alert('You are not input task !!');
      return;
    }

    const newTodo = {
      id: todoList.length + 1,
      //inputValue is a Object, not String
      content: todo.content,
      checked: false
    }

    //Add to All todo
    const newTodoListClone = [...todoList];
    newTodoListClone.push(newTodo);
    setTodoList(newTodoListClone);
    //Convert JavaScript to JSON type
    localStorage.setItem("todo_list", JSON.stringify(newTodoListClone));

    //Add to active todo
    const activeTodoListClone = [...activeTodoList];
    activeTodoListClone.push(newTodo);
    setActiveTodoList(activeTodoListClone);
    //Convert JavaScript to JSON type
    localStorage.setItem("todo_active_list", JSON.stringify(activeTodoListClone));
  }

  return (
    <div className="app">

      <Header />
      <Todo
        activeButton={status}
        setActiveButton={(status) => setStatus(status)}
        onTodoSubmit={handleTodoSubmit}
      />
      <TodoList
        todos={todoList}
        activeTodos={activeTodoList}
        completedTodos={completedTodoList}
        checkStatus={status}
        onTodoClick={handleTodoClick}
        onActiveTodoClick={handleActiveTodoClick}
        onRemoveToDoClick={handleRemoveTodoClick}
        onRemoveAllClick={handleRemoveAllTodoClick}
      />
    </div>
  );
}

export default App;
