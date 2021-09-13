import {
  useState, 
  useContext, 
  Fragment, 
  useEffect,
} from 'react';
import {useParams} from 'react-router-dom';

import TodosContext from 'context/todos-context';
import Loader from 'components/UI/Loader/Loader';

import ThemeContext from 'context/theme-context';

import classes from './ItemDescription.module.css';

const ItemDescription = () => {
  const { id }: ParamsType = useParams();
  const [firstMount, setFirstMount] = useState<boolean>(true);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const { todos, loading, error } = useContext(TodosContext);
  const {theme: {palette: {secondary: {dark}}}} = useContext(ThemeContext)

  useEffect(() => {
    firstMount && setFirstMount(false);
    if (todos && todos.length > 0) {
      const currentTodo = todos.find(todo => todo.id === id);

      if (currentTodo) {
        setCurrentTodo(currentTodo);
      } else {
        setCurrentTodo(null);
      }
    }
  }, [id, todos, firstMount]);

  let content = null;

  if (loading) {
    content = <div className={classes.Loading}><Loader /></div>
  } else if (error) {
    content = <div>{error}</div>
  } else if (todos && (todos.length === 0 || !currentTodo) && !firstMount) {
    content = <div>There is no data to show!</div>
  } else if (todos.length > 0 && currentTodo) {
    content = (
      <Fragment>
        <p className={classes.Name}><span style={{color: dark}}>Name: </span>{currentTodo.name}</p>
        <p className={classes.Date}><span style={{color: dark}}>Created at: </span>{currentTodo.date}</p>
        <p className={classes.Status}><span style={{color: dark}}>Status: </span>{currentTodo.status}</p>
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
