import {useContext, Fragment} from 'react';
import { useTranslation } from 'react-i18next';

import TodosContext from 'context/todos-context';

import TodoItem from 'components/Todo/TodoList/TodoItem/TodoItem';
import Loader from 'components/UI/Loader/Loader';

import classes from './TodoList.module.css';

const TodoList = () => {
  const {t} = useTranslation();
  const {
    todos, 
    loading, 
    error,
  } = useContext(TodosContext);

  let content = null;

  if (loading) {
    content = <div className={classes.Loading}><Loader /></div>
  } else if (error) {
    content = <div className={classes.Error}>{error}</div>
  } else if (todos && todos.length === 0) {
    content = <div className={classes.Empty}>There is no data to show!</div>
  } else if (todos && todos.length > 0) {
    content = (
      <Fragment>
        <div className={classes.Header}>
          <span>{t('name')}</span>
          <span>{t('status')}</span>
        </div>
        <ul className={classes.Lists}>
          {todos.map(todo => {
            return (
              <li
                key={todo.id} 
                className={classes.Element}>
                <TodoItem
                  id={todo.id}
                  name={todo.name}
                  status={todo.status} />
              </li>
            );
          })}
        </ul>
      </Fragment>
    );
  }

  return (
   <div className={`${classes.TodoList} ${loading || error || todos.length === 0 ? classes.Grow : ''}`}>
     {content}
   </div>
);
}

export default TodoList;
