import React, {useState, useEffect} from 'react';
import axios from 'axios';

interface Todos {
  id: string
  name: string
  date: string
  status: string
}

const TodosContext = React.createContext({
  todos: [{id: '', name: '', status: '', date: ''}],
  loading: false,
  error: null,
});



interface TodosContextProviderProps {
  
}

interface TodosContextInterface {
  todos: Todos[],
  loading: boolean;
  error: any,
}

export const TodosContextProvider: React.FC<TodosContextProviderProps> = (props) => {
  const [todos, setTodos] = useState<Todos[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
  }

    return (
      <TodosContext.Provider value={value}>
        {props.children}
      </TodosContext.Provider>
    );
}

export default TodosContext;
