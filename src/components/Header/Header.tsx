import {useContext} from 'react';
import {useTranslation} from 'react-i18next';

import ThemeContext from 'context/theme-context';

import ThemeComponent from 'components/Header/ThemeComponent';
import LanguageComponent from 'components/Header/LanguageComponent';

import classes from './Header.module.css';

const Header: React.FC = () => {
  const { t } = useTranslation();
 
  const {
    theme: {palette: {secondary: {light}}},
    onThemeChange,
  } = useContext(ThemeContext);

  

  return (
    <div
      style={{background: light}} 
      className={classes.Header}>
      {t('heading')}

      <div className={classes.Icons}>
        <ThemeComponent 
          light={light} 
          onThemeChange={onThemeChange} 
        />

        <LanguageComponent
          light={light} />
      </div>
    </div>
  );
}

export default Header;
