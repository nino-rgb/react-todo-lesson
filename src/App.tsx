import React from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TodoList } from "./pages/TodoList";
import { TodoEdit } from "./pages/TodoEdit";
import { TodoIdProvider } from "./store/TodoIdContext";

axios.defaults.baseURL = 'http://localhost:4000/api/';

const App: React.FC = () => {
  return (
    <TodoIdProvider>
      <BrowserRouter>
        <div className="content">
          <Routes>
            <Route path="/" element={<TodoList />} />
            <Route path="/edit" element={<TodoEdit />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TodoIdProvider>
  );
}

export default App;