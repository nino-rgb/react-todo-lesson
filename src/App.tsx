import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { Todo } from './model/todo';

axios.defaults.baseURL = 'http://localhost:4000/api/';

const App:React.FC = () => {
  const [todoList,setTodoList] = useState<Todo[]>([]);
  // get
 useEffect(() => {
  (async () => {
    const response = await axios.get<Todo[]>('/todos');
    setTodoList(response.data)
  })()
 })


// POST





//  delete
const deleteTodo = (todo: Todo) => {
  axios.delete(`/${todo.id}`);
    console.log(todo.id);
  }


  const Todo = () => {
  //  getTodoList();
   return <div>TodoList</div>
  }
console.log(deleteTodo);

  // const getTodoList = async () => {
  //   const newtodoList = await axios.get<Todo[]>('todos');
  //   setTodoList(newtodoList.data);
  // }

  return (
    <div className="App">
      <Todo />    
      {todoList.map((todo:Todo) => {
    return (
    <div key={todo.id}>{todo.id}; {todo.title}; {todo.description}</div>
      );
    })}
    </div>
  );
};

export default App;
