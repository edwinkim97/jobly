import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import Navigation from "./routes-nav/Navigation";
import Routes from "./routes-nav/Routes";
import LoadingSpinner from "./common/LoadingSpinner";
import JoblyApi from "./api/api";
import UserContext from "./auth/UserContext";
import jwt from "jsonwebtoken";

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "jobly-token";

/** Jobly application.
 *
 * - infoLoaded: has user data been pulled from API?
 *   (this manages spinner for "loading...")
 *
 * - applicationIds: for logged in users, this is a set of application Ids
 *   for applied jobs.
 *
 * - currentUser: user obj from API. This becomes the canonical way to tell
 *   if someone is logged in. This is passed around via context throughout app.
 *
 * - token: for logged in users, this is their authentication JWT.
 *   Is required to be set for most API calls. This is initially read from
 *   localStorage and synced to there via the useLocalStorage hook.
 *
 *  - goRedirect: boolean to indicate whether or not we should redirect.
 *   Redirect to /companies after successful login or signup
 *
 * App -> Routes
 */


function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [goRedirect, setGoRedirect] = useState(false);

  console.debug(
    "App",
    "infoLoaded=", infoLoaded,
    "applicationIds=", applicationIds,
    "currentUser=", currentUser,
    "token=", token,
    "goRedirect=", goRedirect,
  );

  // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependency for this effect.

  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          // put the token on the Api class so it can use it to call the API.
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);

          setCurrentUser(currentUser);
          setApplicationIds(new Set(currentUser.applications));
          setGoRedirect(false);

        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }

    // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false to control the spinner.
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  /** Handles site-wide logout. */
  function logout() {
    setApplicationIds(new Set([]));
    setCurrentUser(null);
    setToken(null);
  }

  /** Handles site-wide signup.
   *
   * Automatically logs them in (set token) upon signup and sets goRedirect
   * state to true.
   *
   * Make sure you await this function to see if any error happens.
   */
  async function signup(signupData) {
    let token = await JoblyApi.signup(signupData);
    setToken(token);
    setGoRedirect(true);
  }

  /** Handles site-wide login.
   *
   * Logs in a user and sets goRedirect state to true.
   *
   * Make sure you await this function to see if any error happens.
   */
  async function login(loginData) {
    let token = await JoblyApi.login(loginData);
    setToken(token);
    setGoRedirect(true);
  }

  /** Checks if a job has been applied for. */
  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  }

  /** Apply to a job: make API call and update set of application IDs. */
  function applyToJob(id) {
    if (hasAppliedToJob(id)) return;
    JoblyApi.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }

  // after login/signup success, redirect to /companies
  if (goRedirect) return <Redirect push to="/companies" />;

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        hasAppliedToJob,
        applyToJob,
      }}>
      <div className="App">
        <Navigation logout={logout} />
        <Routes login={login} signup={signup} />
      </div>
    </UserContext.Provider>
  );
}

export default App;
