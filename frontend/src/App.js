import React from "react";
import AllDisplay from "./views/AllDisplay";
import AddPOI from "./views/AddPOI";
import Welcome from "./components/Welcome";
import { BrowserRouter } from "react-router-dom";
import { BrowserRouter as Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Welcome} />
        <Route path="/" exact component={AllDisplay} />
        <Route path="/add" exact component={AddPOI} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
