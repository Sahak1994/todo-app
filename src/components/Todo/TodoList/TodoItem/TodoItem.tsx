import {Link, useLocation} from 'react-router-dom';

import classes from './TodoItem.module.css';

const TodoItem: React.FC<TodoItem> = ({
  id,
  name,
  status,
}) => {
  const location = useLocation();
  const statusClassName = status === 'completed' ? classes.done : classes['no-done'];
  const statusIconClassName = status === 'completed' ? 'fas fa-check' : 'fas fa-times';

  return (
    <div className={classes.TodoItem}>
      <div className={classes.Name}>
        <Link className={classes.Link} to={`${location.pathname}/${id}`}>
          <div>{name}</div>
        </Link>
      </div>
      <div className={classes.Status}>
        <div className={statusClassName}>
          <i className={statusIconClassName}></i>
        </div>
      </div>
    </div>
  );
}

interface TodoItem {
  id: string
  name: string
  status: string
}

export default TodoItem;
