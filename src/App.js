import React from 'react';

import Navigation from './components/Navigation/Navigation';
import LienSearch from './components/LienSearch/LienSearch';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <>
      <Navigation />
      <Layout>
        <LienSearch />
      </Layout>
    </>
  );
}

export default App;
