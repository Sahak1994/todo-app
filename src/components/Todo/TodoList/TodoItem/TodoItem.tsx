import {useContext} from 'react';
import {Link, useLocation} from 'react-router-dom';
import axios from 'axios';

import classes from './TodoItem.module.css';
import TodosContext from 'context/todos-context';

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  name,
  status,
}) => {
  const location = useLocation();
  const {onUpdateTodoStatus} = useContext(TodosContext);
  const statusClassName = status === 'completed' ? classes.done : classes['no-done'];
  const statusIconClassName = status === 'completed' ? 'fas fa-check' : 'fas fa-times';

  const statusChangeToggle = () => {
    console.log(id)
    axios.patch(`https://todo-app-b3600-default-rtdb.firebaseio.com/todos/${id}.json`, {
      status: status === 'completed' ? 'incompleted' : 'completed',
    })
      .then(result => {
        if (result.status === 200) {
          onUpdateTodoStatus(id, status === 'completed' ? 'incompleted' : 'completed')
        }
      })
      .catch(error => console.log(error.message))
  }

  return (
    <div className={classes.TodoItem}>
      <div className={classes.Name}>
        <Link className={classes.Link} to={`${location.pathname}/${id}`}>
          <div>{name}</div>
        </Link>
      </div>
      <div
        onClick={statusChangeToggle}
        className={classes.Status}>
        <div className={statusClassName}>
          <i className={statusIconClassName}></i>
        </div>
      </div>
    </div>
  );
}

interface TodoItemProps {
  id: string
  name: string
  status: string
}

export default TodoItem;
