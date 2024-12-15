import React, { useState, useEffect, useContext } from 'react';
import './TodoList.css';
import { Todo } from '../model/todo';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { TodoIdContext } from "../store/TodoIdContext";

export const TodoList: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const {setTodoId} = useContext(TodoIdContext);
  const navigate = useNavigate();
  // GET
  useEffect(() => {
    (async () => {
      const response = await axios.get<Todo[]>('/todos');
      setTodoList(response.data)
    })();
  }, [setTodoList]);

  // POST
  const [title, setTitle] = useState<string>('');
  const addTitle = ( e:React.ChangeEvent<HTMLInputElement> ) => {
    setTitle(e.target.value);
  }

  const [description, setDescription] = useState<string>(''); 
  const addDescription = ( e:React.ChangeEvent<HTMLInputElement> ) => {
    setDescription(e.target.value);
  }

  const addTodo = async () => {
    const newTodoList = [...todoList];

    const todo:Todo = {
      title: title, 
      description: description,
    };
    const response = await axios.post<number>('todos', todo);
    todo.id = response.data;
    newTodoList.push(todo);
    setTodoList(newTodoList);
  }

  //Delete
  const delTodo = async (todo: Todo) => {
    const newTodoList = [...todoList];

    axios.delete(`todos/${todo.id}`);
    const index = newTodoList.findIndex((newTodo) => newTodo.id === todo.id);
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }

  const clickedTodoCard = async ( todo: Todo ) => {
    const id = todo.id as number;
    setTodoId(id);
    navigate(`/edit`);
  }

  return (
    <div className="App">
      <input type='text' value={title} onChange={addTitle}></input>
      <input type='text' value={description} onChange={addDescription}></input>
      <button onClick={addTodo}>勉強会追加</button>
      {todoList.map(( todo:Todo ) => {
        return (
          <div key={todo.id} className="todo_card" onClick={() => clickedTodoCard(todo)}>
            <h1>{todo.title}
              <img
                src='img/dust_box.png'
                alt='削除ボタン'
                className='delete_button'
                onClick={
                  (e) => {
                    e.stopPropagation();
                    delTodo(todo)
                  }
                }
              />
            </h1>
            <div>{todo.description}</div>
          </div>
        )
      })}
    </div>
  );
};