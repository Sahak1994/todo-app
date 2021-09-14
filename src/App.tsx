import { useContext } from 'react';

import {Switch, Route, Redirect} from 'react-router-dom';

import {TodosContextProvider} from 'context/todos-context';
import {ThemeContextProvider} from 'context/theme-context';

import Layout from 'components/Layout/Layout';
import AddTodo from 'components/Todo/AddTodo/AddTodo';
import TodoList from 'components/Todo/TodoList/TodoList';
import ItemDescription from 'components/Todo/TodoList/ItemDescription/ItemDescription';
import EmptyPage from 'components/EmptyPage/EmptyPage';
import ChangeLangContext from 'context/change-lang-context';

function App() {
  const {lang} = useContext(ChangeLangContext);

  const routes = (
    <TodosContextProvider>
      <Switch>
        <Route path={`/${lang}`} exact>
          <AddTodo />
        </Route>
        <Route path={`/${lang}/lists`} exact>
            <TodoList />
        </Route>
        <Route path={`/${lang}/lists/:id`}>
          <ItemDescription />
        </Route>
        <Route path='/'>
          <Redirect to={`/${lang}`} />
        </Route>
        <Route>
          <EmptyPage />
        </Route>
      </Switch>
  </TodosContextProvider>
  );

  return (
    <ThemeContextProvider>
      <Layout>
        {routes}
      </Layout>
    </ThemeContextProvider>
  );
}

export default App;
