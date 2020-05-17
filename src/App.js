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
import FlashMessage, {
  FlashMessageContainer,
} from './components/UI/FlashMessage/FlashMessage';

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const justLoggedIn = useSelector((state) => state.auth.justLoggedIn);
  useEffect(() => {
    dispatch(actions.authCheckState());
  }, [dispatch]);

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
        <Layout
          flashContainer={flashContainer}
          desktopPages={desktopPages}
          mobilePages={mobilePages}
        />
      </>
    );
  }
  return pages;
}

export default App;
