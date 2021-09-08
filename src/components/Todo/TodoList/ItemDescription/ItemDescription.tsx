import {useState, useContext, Fragment, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import TodosContext from 'context/todos-context';

import classes from './ItemDescription.module.css';

const ItemDescription = () => {
  const { id }: ParamsType = useParams();
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const { todos, loading, error } = useContext(TodosContext);

  console.log(todos)

  useEffect(() => {
    if (todos && todos.length > 0) {
      const currentTodo = todos.find(todo => todo.id === id);

      if (currentTodo) {
        setCurrentTodo(currentTodo);
      } else {
        setCurrentTodo(null);
      }
    }
  }, [id, todos]);

  let content = null;

  if (loading) {
    content = <div>Loading...</div>
  }

  if (!loading && error) {
    content = <div>{error}</div>
  }

  if (!loading && !error && todos && (todos.length === 0)) {
    content = <div>There are no data to show!</div>
  }

  if (!error && !loading && todos.length > 0 && currentTodo) {
    content = (
      <Fragment>
        <p className={classes.Name}><span>Name: </span>{currentTodo.name}</p>
        <p className={classes.Date}><span>Created at: </span>{currentTodo.date}</p>
        <p className={classes.Status}><span>Status: </span>{currentTodo.status}</p>
      </Fragment>
    );
  }

  return (
    <div className={`${classes.Description} ${loading || error || !currentTodo ? classes.ItemsCenter : ''}`}>
      {content}
    </div>
  );
}

type ParamsType = {
  id: string
}

interface Todo {
  id: string
  name: string
  status: string
  date: string
}

export default ItemDescription;
