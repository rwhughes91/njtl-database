import React, { Suspense, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navigation from './components/Navigation/Navigation';
import Layout from './components/Layout/Layout';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import Dashboard from './containers/Dashboard/Dashboard';
import UploadLiens from './containers/UploadLiens/UploadLiens';
import Spinner from './components/UI/Spinner/Spinner';
import LazyLoadingErrorBoundary from './errorBoundaries/LazyLoadingErrorBoundary';
import Bus from './utils/Bus';
import Flash from './components/UI/FlashMessage/Flash';
import classes from './components/Layout/Layout.module.css';

const LienSearch = React.lazy(() =>
  import('./containers/LienSearch/LienSearch')
);
const LienDetail = React.lazy(() =>
  import('./containers/LienDetail/LienDetail')
);
const SubBatch = React.lazy(() => import('./containers/SubBatch/SubBatch'));
const Reports = React.lazy(() => import('./containers/Reports/Reports'));

window.flash = (message, type) => Bus.emit('flash', { message, type });

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const justLoggedIn = useSelector((state) => state.auth.justLoggedIn);
  useEffect(() => {
    dispatch(actions.authCheckState());
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      if (justLoggedIn) {
        window.flash(justLoggedIn, 'success');
      }
    }
  });

  let loading = (
    <div className={classes.Main}>
      <Spinner />
    </div>
  );

  let pages = (
    <>
      <Flash />
      <Switch>
        <Route path='/'>
          <Auth />
        </Route>
        <Redirect to='/' />
      </Switch>
    </>
  );
  if (token) {
    const desktopPages = (
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
        <Route path='/dashboard'>
          <Dashboard />
        </Route>
        <Route path='/'>
          <LienSearch />
        </Route>
      </Switch>
    );
    const mobilePages = (
      <Switch>
        <Route path='/lien/:lien_id' exact>
          <LienDetail />
        </Route>
        <Route path='/logout'>
          <Logout />
        </Route>
        <Route path='/'>
          <LienSearch />
        </Route>
      </Switch>
    );
    pages = (
      <>
        <Flash top='7rem' />
        <Navigation />
        <LazyLoadingErrorBoundary>
          <Suspense fallback={loading}>
            <Layout desktopPages={desktopPages} mobilePages={mobilePages} />
          </Suspense>
        </LazyLoadingErrorBoundary>
      </>
    );
  }
  return pages;
}

export default App;
