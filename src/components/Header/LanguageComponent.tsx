import React, { useState, useContext } from "react";
import i18next from "i18next";

import LanguageIcon from '@material-ui/icons/Language';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import ChangeLangContext from 'context/change-lang-context'

type langType = {code: string, language: string}[];

const LANGUAGES: langType = [
  {
    code: 'en',
    language: 'English',
  },
  {
    code: 'fr',
    language: 'Français',
  },
  {
    code: 'ru',
    language: 'Русский',
  }
];

const LanguageComponent: React.FC<LanguageComponentProps> = (props) => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const {onChangeLang} = useContext(ChangeLangContext)

  const handleClick = (event: React.SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.SyntheticEvent<HTMLElement>) => {
    setAnchorEl(null);

    // const themeName = event.currentTarget.dataset.value!;

    // props.onThemeChange(themeName)
  };

  const changeLaguage = (event: React.SyntheticEvent<HTMLElement>, code: string) => {
    i18next.changeLanguage(code);

    onChangeLang(code);

    handleClose(event);
  }

  return (
    <div>
      <Button onClick={handleClick}>
        <LanguageIcon />
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
        {LANGUAGES.map(lang => {
          return (
            <MenuItem
              key={lang.code}
              data-value={lang.code} 
              style={{background: props.light}}
              onClick={(e) => changeLaguage(e, lang.code)}>{lang.language}</MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}

interface LanguageComponentProps {
  light: string;
}

export default LanguageComponent;
