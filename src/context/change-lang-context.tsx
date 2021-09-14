import React, {useState, useEffect} from 'react';
import cookies from 'js-cookie';
import { useHistory, useLocation } from 'react-router-dom';

const ChangeLangContext = React.createContext({
  lang: 'en',
  onChangeLang: (lang: string): void => {},
});

export const ChangeLangPrvider: React.FC<ChangeLangPrviderProps> = (props) => {
  const [lang, setLang] = useState<string>(cookies.get('i18next') || 'en');
  const history = useHistory();
  const {pathname} = useLocation();
  const secondSlashIndex = pathname.indexOf('/', 1);

  useEffect(() => {
    cookies.set('i18next', lang);
  }, [lang])

  const changeLangage = (lang: string) => {
    setLang(lang);
    if (secondSlashIndex === -1) {
      history.replace('/' + lang);
    } else {
      history.replace('/' + lang + pathname.slice(secondSlashIndex));
    }
  }

  return (
    <ChangeLangContext.Provider value={{
      lang,
      onChangeLang: changeLangage
    }}>
      {props.children}
    </ChangeLangContext.Provider>
  );
}

interface ChangeLangPrviderProps {}

export default ChangeLangContext;
