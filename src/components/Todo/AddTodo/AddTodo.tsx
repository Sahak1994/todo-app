import React, {useState} from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { injectStyle } from "react-toastify/dist/inject-style";

import classes from './AddTodo.module.css';

const AddTodo = () => {
  const [todoText, setTodoText] = useState<string>('');

  if (typeof window !== "undefined") {
    injectStyle();
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text:string = e.target.value;

    setTodoText(text);
  }

  const todoSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (!todoText.trim()) {
      return;
    }

    const date: string = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();

    const result:{name: string, status: string, date: string,} = {
      name: todoText,
      status: 'incompleted',
      date,
    }

    axios.post('https://todo-app-b3600-default-rtdb.firebaseio.com/todos.json', result)
      .then(result => {
        setTodoText('');
        
        toast.success("Todo Added Successfully", {
          autoClose: 2000,
          position: 'bottom-right',
        });
      })
      .catch(error => {
        setTodoText('');

        toast.error(error?.message || 'Something went wrong!', {
          autoClose: 2000,
          position: 'bottom-right',
        });
      });
  }

  return (
    <div className={classes.AddTodo}>
      <form 
        className={classes.Form}
        onSubmit={todoSubmitHandler}>
        <input 
          type='text' 
          value={todoText} 
          onChange={onInputChange} />
        <button>Add</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AddTodo;