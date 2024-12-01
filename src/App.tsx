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

  const Todo = () => {
  //  getTodoList();
   return <div>TodoList</div>
  }
const [title, setTitle] = useState('');
const addTitle = (e:React.ChangeEvent<HTMLInputElement>) => {
  setTitle(e.target.value);
  console.log(e.target);
}

  const [description, setDescription] = useState('');
  const addDescription = (e:React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  console.log(description);
  };
  const addTodo = () => {
    const todo:Todo = {
      title: title,
      description: description,
    };
    const response = axios.post<number>('/todos',todo);
    console.log(response);
  }

  const delTodo = (todo:Todo) => {
    axios.delete(`/todos/${todo.id}`)
  }

  return (
    <div className="App">
      <Todo />    
      <input type="text" value={title} onChange={addTitle}></input> 
      <input type="text" value={description} onChange={addDescription}></input> 
      <button onClick={addTodo}>追加</button>
      {todoList.map((todo:Todo) => {
    return (
        <div key={todo.id}>
          {todo.id}; {todo.title}; {todo.description}
        <img src="img/dust_box.png"
        className='delete_button'
        alt='削除ボタン'
        onClick={
          (e) => {
            e.stopPropagation();
            delTodo(todo)}}
          />
        </div>
      );
    })}
    </div>
  );
};

export default App;