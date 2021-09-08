import {NavLink} from 'react-router-dom';

import classes from './Navbar.module.css';

const Navbar = () => {
  return (
    <div className={classes.Navbar}>
      
      <div className={classes.Link}>
        <NavLink activeClassName={classes.ActiveClass} exact to='/'>Add Todo</NavLink>
      </div>

      <div className={classes.Link}>
        <NavLink activeClassName={classes.ActiveClass} to='/lists'>Todo List</NavLink>
      </div>
    </div>
  );
}

export default Navbar;
