import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import LienSearch from './components/LienSearch/LienSearch';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <>
      <Navigation />
      <Layout>
        <Switch>
          <Route path='/' component={LienSearch} />
        </Switch>
      </Layout>
    </>
  );
}

export default App;
