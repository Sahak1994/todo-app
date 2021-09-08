import {Fragment} from 'react';

import Header from "components/Header/Header";
import Navbar from 'components/Navbar/Navbar';

import classes from './Layout.module.css';

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <Fragment>
      <Header />
      <main className={classes.Content}>
        <Navbar />
        {props.children}
      </main>
    </Fragment>
  );
}

export default Layout;

interface LayoutProps {

}
