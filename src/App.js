import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Layout from './components/Layout/Layout';
import LienSearch from './containers/LienSearch/LienSearch';
import LienDetail from './containers/LienDetail/LienDetail';
import SubBatch from './containers/SubBatch/SubBatch.js';

function App() {
  return (
    <>
      <Navigation />
      <Layout>
        <Switch>
          <Route path='/lien/:lien_id' exact>
            <LienDetail />
          </Route>
          <Route path='/subs'>
            <SubBatch />
          </Route>
          <Route path='/'>
            <LienSearch />
          </Route>
        </Switch>
      </Layout>
    </>
  );
}

export default App;
