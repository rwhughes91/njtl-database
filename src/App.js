import React, { Suspense, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navigation from './components/Navigation/Navigation';
import Layout from './components/Layout/Layout';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import FlashMessage, {
  FlashMessageContainer,
} from './components/UI/FlashMessage/FlashMessage';
import Spinner from './components/UI/Spinner/Spinner';
import LazyLoadingErrorBoundary from './errorBoundaries/LazyLoadingErrorBoundary';

const LienSearch = React.lazy(() =>
  import('./containers/LienSearch/LienSearch')
);
const LienDetail = React.lazy(() =>
  import('./containers/LienDetail/LienDetail')
);
const SubBatch = React.lazy(() => import('./containers/SubBatch/SubBatch'));
const UploadLiens = React.lazy(() =>
  import('./containers/UploadLiens/UploadLiens')
);
const Reports = React.lazy(() => import('./containers/Reports/Reports'));

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const justLoggedIn = useSelector((state) => state.auth.justLoggedIn);
  useEffect(() => {
    dispatch(actions.authCheckState());
  }, [dispatch]);

  const mainSpinner = (
    <div
      style={{
        position: 'fixed',
        top: '10rem',
        left: '50%',
      }}
    >
      <Spinner />
    </div>
  );

  let pages = (
    <Switch>
      <Route path='/'>
        <Auth />
      </Route>
      <Redirect to='/' />
    </Switch>
  );
  if (token) {
    let flashMessage = null;
    if (justLoggedIn) {
      flashMessage = <FlashMessage type='success' message={justLoggedIn} />;
    }
    const flashContainer = (
      <FlashMessageContainer top='7rem'>{flashMessage}</FlashMessageContainer>
    );
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
        <Navigation />
        <LazyLoadingErrorBoundary>
          <Suspense fallback={mainSpinner}>
            <Layout
              flashContainer={flashContainer}
              desktopPages={desktopPages}
              mobilePages={mobilePages}
            />
          </Suspense>
        </LazyLoadingErrorBoundary>
      </>
    );
  }
  return pages;
}

export default App;
