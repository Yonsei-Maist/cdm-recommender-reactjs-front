/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.09.16
 */
import React, { useEffect } from "react";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import GlobalErrorNotification from "./components/GlobalErrorNotification/GlobalErrorNotification";
import HomePage from "./pages/HomePage";
import EmrCdmWordsViewerPage from "./pages/EmrCdmWordsViewerPage";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import NotFoundPage from "./pages/NotFountPage";
import AppNavbar from "./components/AppNavbar/AppNavbar";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

import { useDispatch, useSelector } from "react-redux";
import { getSimilarWordsSuccess } from "./actions/wordAction";

import "./App.css";

/**
 * Renders Application Component
 *
 * ### Usage
 *
 * ```
 * import App from './App';
 * ```
 *
 * @component
 * @category Components
 * @requires react
 * @requires './components/Header/Header'
 * @requires './components/Footer/Footer'
 * @requires './components/GlobalErrorNotification/GlobalErrorNotification'
 * @requires './pages/HomePage'
 * @requires './pages/EmrCdmWordsViewerPage'
 * @param {Function} useDispatch the dispatch function that triggers an action
 * @param {Function} useSelector the selector function that returns state.userData.inputText
 * @param {Function} useState react useState hook for states: show
 */
const App = ({ history }) => {
  const isAuthenticated = true;
  const dispatch = useDispatch();

  useEffect(() => {
    const unlisten = history.listen((location, action) => {
      // on route change
      // reset the cdm list
      dispatch(getSimilarWordsSuccess({}));
    });
    return () => unlisten();
  }, [dispatch, history]);

  return (
    <div className="mx-auto mt-3 d-flex flex-column vh-95">
      <GlobalErrorNotification />
      <Header />
      <AppNavbar />
      <div className="flex-grow-1">
        <Switch>
          <Route exact path="/cdm">
            <HomePage />
          </Route>
          <Route exact path="/emr-cdm-relationship">
            <EmrCdmWordsViewerPage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/register">
            <SignUpPage />
          </Route>
          <Route
            exact
            path="/"
            render={() => {
              return isAuthenticated ? (
                <Redirect to="/cdm" />
              ) : (
                <Redirect to="/login" />
              );
            }}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default withRouter(App);
