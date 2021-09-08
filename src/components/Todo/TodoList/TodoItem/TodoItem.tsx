import {useContext, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { injectStyle } from "react-toastify/dist/inject-style";

import classes from './TodoItem.module.css';
import TodosContext from 'context/todos-context';
import Loader from 'components/UI/Loader/Loader';

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  name,
  status,
}) => {
  const [statusLoading, setStatusLoading] = useState<boolean>(false);
  const location = useLocation();
  const {onUpdateTodoStatus} = useContext(TodosContext);
  let statusClassName = status === 'completed' ? classes.done : classes['no-done'];
  const statusIconClassName = status === 'completed' ? 'fas fa-check' : 'fas fa-times';

  if (typeof window !== "undefined") {
    injectStyle();
  }

  const statusChangeToggle = () => {
    setStatusLoading(true);
    axios.patch(`https://todo-app-b3600-default-rtdb.firebaseio.com/todos/${id}.json`, {
      status: status === 'completed' ? 'incompleted' : 'completed',
    })
      .then(result => {
        if (result.status === 200) {
          setStatusLoading(false);
          onUpdateTodoStatus(id, status === 'completed' ? 'incompleted' : 'completed');
          toast.success("Status changed", {
            autoClose: 2000,
            position: 'bottom-right',
          });
        }
      })
      .catch(error => {
        setStatusLoading(false);
        toast.error(error?.message || 'Something went wrong!', {
          autoClose: 2000,
          position: 'bottom-right',
        });
      })
  }

  const statusContent = !statusLoading ? (
    <div className={statusClassName}>
      <i className={statusIconClassName}></i>
    </div>
  ): <Loader />

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
        {statusContent}
      </div>
      <ToastContainer />
    </div>
  );
}

interface TodoItemProps {
  id: string
  name: string
  status: string
}

export default TodoItem;
