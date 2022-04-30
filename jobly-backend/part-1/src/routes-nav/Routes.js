import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import CompanyList from "../companies/CompanyList";
import JobList from "../jobs/JobList";
import CompanyDetail from "../companies/CompanyDetail";


/** Site-wide routes.
 *
 * Visiting a non-existent route redirects to the homepage.
 */

function Routes() {
  console.debug("Routes");

  return (
    <div className="pt-5">
      <Switch>

        <Route exact path="/">
          <Homepage />
        </Route>

        <Route exact path="/companies">
          <CompanyList />
        </Route>

        <Route exact path="/jobs">
          <JobList />
        </Route>

        <Route exact path="/companies/:handle">
          <CompanyDetail />
        </Route>

        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default Routes;
