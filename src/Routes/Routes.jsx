import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Records from "../Pages/Records/Records";

const Stands = React.lazy(() => {
  return import('../Pages/Stands/Stands');
});

const Baths = React.lazy(() => {
  return import('../Pages/Baths/Baths');
});

const Archives = React.lazy(() => {
  return import('../Pages/Records/Records');
});

const Login = React.lazy(() => {
  return import('../Pages/Login/Login');
});

const Clients = React.lazy(() => {
  return import('../Pages/Clients/Clients');
});

const Detail = React.lazy(() => {
  return import('../Pages/Details/Details');
});

const Order = React.lazy(() => {
  return import('../Pages/Orders/Orders');
});



const Routes = () => {
  const token = useSelector((state) => state.auth.token !== null);

  let routes = (
    <Switch>
      <Route path="/login" exact render={(props) => <Login {...props} />} />
    </Switch>
  );

  if (token) {
    routes = (
      <Switch>
        <Route
          path="/stanowiska"
          exact
          render={(props) => <Stands {...props} />}
        />
        <Route path="/wanny" exact render={(props) => <Baths {...props} />} />
        <Route
          path="/archiwum"
          exact
          render={(props) => <Archives {...props} />}
        />
        <Route path="/klient" exact render={props => <Clients {...props}/>}/>
        <Route path="/detale" exact render={(props) => <Detail {...props} />} />
        <Route path="/zamowienia" exact render={(props) => <Order {...props} />} />
        <Route path="/login" exact render={(props) => <Login {...props} />} />
      </Switch>
    );
  }

  return <Suspense fallback={<p>Ładowanie...</p>}>{routes}</Suspense>;
};

export default Routes;
