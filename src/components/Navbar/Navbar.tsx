import { useContext } from 'react';
import {NavLink} from 'react-router-dom';

import themeContext from 'context/theme-context';

import classes from './Navbar.module.css';

const Navbar = () => {
  const theme = useContext(themeContext);
  const {
    theme: {palette: {secondary: {main, light, dark}}}
  } = theme;

  const activeStyle = {
    backgroundColor: light as string,
    color: dark
  }

  return (
    <div
      style={{background: main}} 
      className={classes.Navbar}>
      
      <div className={classes.Link}>
        <NavLink activeStyle={activeStyle} exact to='/'>Add Todo</NavLink>
      </div>

      <div className={classes.Link}>
        <NavLink activeStyle={activeStyle} to='/lists'>Todo List</NavLink>
      </div>
    </div>
  );
}

export default Navbar;
