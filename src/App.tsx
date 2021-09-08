import {Switch, Route} from 'react-router-dom';

import Layout from 'components/Layout/Layout';
import AddTodo from 'components/Todo/AddTodo/AddTodo';
import TodoList from 'components/Todo/TodoList/TodoList';
import ItemDescription from 'components/Todo/TodoList/ItemDescription/ItemDescription';
import EmptyPage from 'components/EmptyPage/EmptyPage';
import {TodosContextProvider} from 'context/todos-context';

function App() {

  const routes = (
      <TodosContextProvider>
    <Switch>
      <Route path='/' exact>
        <AddTodo />
      </Route>
        <Route path='/lists' exact>
            <TodoList />
        </Route>
        <Route path='/lists/:id'>
          <ItemDescription />
        </Route>
      <Route>
        <EmptyPage />
      </Route>
    </Switch>
      </TodosContextProvider>
  );

  return (
    <Layout>
      {routes}
    </Layout>
  );
}

export default App;
