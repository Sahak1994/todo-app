import {useState, useEffect} from 'react';

import {getTodos} from 'api/todos/actions';

const useFetchTodos = () => {
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

  const fetchTodos = () => {
    getTodos('/todos.json')
      .then(formatedData => {
        setTodos(formatedData);
        setLoading(false);
        setError(null);
      })
      .catch(error => {
        setError(error.message || 'Something went wrong!');
        setLoading(false);
      })
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  return {
    todos,
    loading,
    error,
    updateTodoStatus,
    updateAddedTodoItem,
    getTodos: fetchTodos,
  }
}

interface Todo {
  id: string
  name: string
  date: string
  status: string
}

export default useFetchTodos;
