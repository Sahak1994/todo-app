import { useContext } from 'react';
import {NavLink} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import themeContext from 'context/theme-context';
import ChangeLangContext from 'context/change-lang-context';

import classes from './Navbar.module.css';

const Navbar = () => {
  const {t} = useTranslation();
  const {lang} =useContext(ChangeLangContext)
  const theme = useContext(themeContext);
  const {
    theme: {palette: {secondary: {main, light, dark}}}
  } = theme;

  const activeStyle = {
    color: dark
  }

  return (
    <div
      style={{background: main}} 
      className={classes.Navbar}>
      
      <div style={{background: light}} className={classes.Link}>
        <NavLink activeStyle={activeStyle} exact to='/'>{t('nav_add')}</NavLink>
      </div>

      <div style={{background: light}} className={classes.Link}>
        <NavLink activeStyle={activeStyle} to={`/${lang}/lists`}>{t('nav_list')}</NavLink>
      </div>
    </div>
  );
}

export default Navbar;
