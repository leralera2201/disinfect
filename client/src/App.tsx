import React from 'react';
import {Route, Switch} from 'react-router-dom'
import Home from "./pages/Home";
import Table from "./pages/Table";
import PrivateRoute from "./components/PrivateRoute";
import Alert from "./components/Alert";

function App() {
  return (
    <div>
        <Alert/>
      <Switch>
        <Route path={'/'} component={Home} exact/>
        <PrivateRoute path={'/categories'} component={Table} exact/>
        <PrivateRoute path={'/products'} component={Table} exact/>
        <PrivateRoute path={'/orders'} component={Table} exact/>
      </Switch>
    </div>
  );
}

export default App;
