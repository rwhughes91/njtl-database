import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navigation from './components/Navigation/Navigation';
import Layout from './components/Layout/Layout';
import LienSearch from './containers/LienSearch/LienSearch';
import LienDetail from './containers/LienDetail/LienDetail';
import SubBatch from './containers/SubBatch/SubBatch.js';
import UploadLiens from './containers/UploadLiens/UploadLiens';
import Reports from './containers/Reports/Reports';
import Auth from './containers/Auth/Auth';
import * as actions from './store/actions/index';
import Logout from './containers/Auth/Logout/Logout';

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    dispatch(actions.authCheckState());
  }, [dispatch]);
  let routes = (
    <Switch>
      <Route path='/' exact>
        <Auth />
      </Route>
      <Redirect to='/' />
    </Switch>
  );
  if (token) {
    routes = (
      <Switch>
        <Route path='/lien/:lien_id' exact>
          <LienDetail />
        </Route>
        <Route path='/subs'>
          <SubBatch />
        </Route>
        <Route path='/upload'>
          <UploadLiens />
        </Route>
        <Route path='/reports'>
          <Reports />
        </Route>
        <Route path='/logout'>
          <Logout />
        </Route>
        <Route path='/'>
          <LienSearch />
        </Route>
      </Switch>
    );
  }
  return (
    <>
      <Navigation />
      <Layout>{routes}</Layout>
    </>
  );
}

export default App;
