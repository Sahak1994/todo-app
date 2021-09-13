import React from 'react';

import useFetchTodos from 'api/todos';

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
  onGetTodos: () => {},
});

interface TodosContextProviderProps {}

interface TodosContextInterface {
  todos: Todo[];
  loading: boolean;
  error: any;
  onUpdateTodoStatus: (id: string, status: string) => void;
  onUpdateAddedTodoItem: (todo: Todo) => void;
  onGetTodos: () => void;
}

export const TodosContextProvider: React.FC<TodosContextProviderProps> = (props) => {
  const {
    todos,
    loading,
    error,
    updateAddedTodoItem,
    updateTodoStatus,
    getTodos,
  } = useFetchTodos();

  
  const value: TodosContextInterface = {
    todos,
    loading,
    error,
    onUpdateTodoStatus: updateTodoStatus,
    onUpdateAddedTodoItem: updateAddedTodoItem,
    onGetTodos: getTodos,
  }

    return (
      <TodosContext.Provider value={value}>
        {props.children}
      </TodosContext.Provider>
    );
}

export default TodosContext;
