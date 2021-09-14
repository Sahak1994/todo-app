import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import { i18next } from 'i18n';

import Auxiliay from 'hoc/auxiliary';
import Loader from 'components/UI/Loader/Loader';

import './index.css';
import App from './App';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
{const _ = i18next}


ReactDOM.render(
  <Suspense fallback={<Loader />}>
      <Router>
    <Auxiliay>
        <App />
    </Auxiliay>
      </Router>
  </Suspense>,
  document.getElementById('root')
);
