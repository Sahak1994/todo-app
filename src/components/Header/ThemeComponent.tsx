import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import HighlightIcon from '@material-ui/icons/Highlight';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

const ThemeComponent: React.FC<ThemeComponentProps> = (props) => {
  const {t} = useTranslation();
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const handleClick = (event: React.SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.SyntheticEvent<HTMLElement>) => {
    setAnchorEl(null);

    if (!('value' in event.currentTarget.dataset)) {
      return;
    }

    const themeName = event.currentTarget.dataset.value!;

    props.onThemeChange(themeName)
  };

  return (
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
          style={{background: props.light}}
          onClick={handleClose}>{t('primary')}</MenuItem>
        <MenuItem
          data-value='light' 
          style={{background: props.light}}
          onClick={handleClose}>{t('light')}</MenuItem>
        <MenuItem
          data-value='dark' 
          style={{background: props.light}}
          onClick={handleClose}>{t('dark')}</MenuItem>
      </Menu>
    </div>
  );
}

interface ThemeComponentProps {
  light: string;
  onThemeChange: (themeName: string) => void;
}

export default ThemeComponent;
