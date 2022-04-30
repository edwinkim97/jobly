import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./routes-nav/Navigation";
import Routes from "./routes-nav/Routes";


/** Jobly application.
 *
 * App -> { Navigation, Routes }
 */


function App() {
  console.debug("App");

  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />
        <Routes />
      </div>
    </BrowserRouter>
  );
}

export default App;
