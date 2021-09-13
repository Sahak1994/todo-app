import {useState, useContext} from 'react';

import ThemeContext from 'context/theme-context';

import HighlightIcon from '@material-ui/icons/Highlight';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import classes from './Header.module.css';

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const {
    theme: {palette: {secondary: {light}}},
    onThemeChange,
  } = useContext(ThemeContext);

  const handleClick = (event: React.SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.SyntheticEvent<HTMLElement>) => {
    setAnchorEl(null);

    if (!('value' in event.currentTarget.dataset)) {
      return;
    }

    const themeName = event.currentTarget.dataset.value!;

    onThemeChange(themeName)
  };

  return (
    <div
      style={{background: light}} 
      className={classes.Header}>
      My Todo App

      <div>
        <Button onClick={handleClick}>
          <HighlightIcon />
        </Button>
        <Menu
          id="simple-menu"
          getContentAnchorEl={null}
          anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
          transformOrigin={{vertical: 'top', horizontal: 'center'}}
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
        <MenuItem
          data-value='primary' 
          style={{background: light}}
          onClick={handleClose}>Primary</MenuItem>
        <MenuItem
          data-value='light' 
          style={{background: light}}
          onClick={handleClose}>Light</MenuItem>
        <MenuItem
          data-value='dark' 
          style={{background: light}}
          onClick={handleClose}>Dark</MenuItem>
      </Menu>
      </div>
    </div>
  );
}

export default Header;
