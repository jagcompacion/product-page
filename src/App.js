import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import Products from './containers/Products';
import NewProduct from './containers/NewProduct';

const App = () => (
  <Router>
    <Fragment>
      <Route path="/" exact component={Products} />
      <Route path="/new-product" exact component={NewProduct} />
    </Fragment>
  </Router>
);

export default App;
