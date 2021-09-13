import { useState, createContext, useEffect } from "react";

import {MuiThemeProvider, createTheme} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const COLORS = {
  'AQUAMARINE': '#7fffd4',
  'DARK': '#212121',
  'WHITE': '#fff',
  'CHOCOLATE': '#d2691e',
  'GREY': '#E0E0E0'
}

const ThemeContext = createContext({
  theme: createTheme({
    palette: {
      background: {
        default: COLORS.WHITE
      },
      text: {
        primary: COLORS.DARK,
      },
      secondary: {
        main: COLORS.CHOCOLATE,
        light: COLORS.AQUAMARINE,
        dark: COLORS.DARK,
      }
    }
  }),
  onThemeChange: (theme: string) => {},
});

const themePrimary = createTheme({
  palette: {
    background: {
      default: COLORS.WHITE
    },
    text: {
      primary: COLORS.DARK,
    },
    secondary: {
      main: COLORS.CHOCOLATE,
      light: COLORS.AQUAMARINE,
      dark: COLORS.CHOCOLATE,
    }
  }
});

const themeLight = createTheme({
  palette: {
    background: {
      default: COLORS.WHITE
    },
    text: {
      primary: COLORS.DARK
    },
    secondary: {
      main: COLORS.GREY,
      light: COLORS.WHITE,
      dark: COLORS.GREY,
    }
  }
});

const themeDark = createTheme({
  palette: {
    background: {
      default: COLORS.DARK
    },
    text: {
      primary: COLORS.WHITE
    },
    secondary: {
      main: COLORS.GREY,
      light: COLORS.DARK,
      dark: COLORS.GREY,
    }
  }
});

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = (props) => {
  const [theme, setTheme] = useState(themePrimary);

  useEffect(() => {
    const theme = localStorage.getItem('theme')

    switch(theme) {
      case 'light':
        setTheme(themeLight);
        break;
      case 'dark':
        setTheme(themeDark);
        break;
      case 'primary':
      default:
        setTheme(themePrimary);
        break;
    }
  }, [])

  const changeTheme = (themeName: string): void => {
    switch(themeName) {
      case 'light':
        localStorage.setItem('theme', 'light')
        setTheme(themeLight);
        break;
      case 'dark':
        localStorage.setItem('theme', 'dark')
        setTheme(themeDark);
        break;
      case 'primary':
      default:
        localStorage.setItem('theme', 'primary')
        setTheme(themePrimary);
        break;
    }
  }

  const contextValue = {
    theme,
    onThemeChange: changeTheme,
  }

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeContext.Provider value={contextValue}>
        <CssBaseline />
        {props.children}
      </ThemeContext.Provider>
    </MuiThemeProvider>
  );
}

interface ThemeContextProviderProps {}

export default ThemeContext;
