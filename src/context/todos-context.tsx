import React, {useState, useEffect} from 'react';
import axios from 'axios';

interface Todo {
  id: string
  name: string
  date: string
  status: string
}

const TodosContext = React.createContext({
  todos: [{id: '', name: '', status: '', date: ''}],
  loading: false,
  error: null,
  onUpdateTodoStatus: (id: string, status: string) => {},
  onUpdateAddedTodoItem: (todo: Todo) => {},
});



interface TodosContextProviderProps {
  
}

interface TodosContextInterface {
  todos: Todo[];
  loading: boolean;
  error: any;
  onUpdateTodoStatus: (id: string, status: string) => void;
  onUpdateAddedTodoItem: (todo: Todo) => void;
}

export const TodosContextProvider: React.FC<TodosContextProviderProps> = (props) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const updateTodoStatus = (id: string, status: string) => {
    const currentTodo = todos.find(todo => todo.id === id);
    const currentTodoIndex = todos.findIndex(todo => todo.id === id);

    if (currentTodo) {
      setTodos(prevTodos => {
        return [
          ...prevTodos.slice(0, currentTodoIndex),
          {...currentTodo, status },
          ...prevTodos.slice(currentTodoIndex + 1),
        ]
      })
    }
  }

  const updateAddedTodoItem = (todo: Todo) => {
    setTodos(prevTodos => prevTodos.concat(todo));
  }

  useEffect(() => {
    axios('https://todo-app-b3600-default-rtdb.firebaseio.com/todos.json')
      .then(result => {
        const formatedData = [];

        for (const key in result.data) {
          const {name, date, status} = result.data[key];
          formatedData.push({
            id: key,
            name,
            date,
            status,
          });
        }

        setTodos(formatedData);
        setLoading(false);
        setError(null);
      })
      .catch(error => {
        setError(error.message || 'Something went wrong!');
        setLoading(false);
      })
  }, []);

  const value: TodosContextInterface = {
    todos,
    loading,
    error,
    onUpdateTodoStatus: updateTodoStatus,
    onUpdateAddedTodoItem: updateAddedTodoItem,
  }

    return (
      <TodosContext.Provider value={value}>
        {props.children}
      </TodosContext.Provider>
    );
}

export default TodosContext;
