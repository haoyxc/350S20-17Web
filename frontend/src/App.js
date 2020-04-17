import React from "react";
import AllDisplay from "./views/AllDisplay";
import UserPOISubmissions from "./views/UserPOISubmissions";
import AddPOI from "./views/AddPOI";
import SelectType from "./views/SelectType";
import Welcome from "./components/Welcome";
import { BrowserRouter } from "react-router-dom";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import EditPOI from "./views/EditPOI";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Welcome} />
        <Route path="/" exact component={AllDisplay} />
        <Route path="/add" exact component={SelectType} />
        <Route path="/addSelect" exact component={SelectType} />
        <Route path="/approveReqs" exact component={UserPOISubmissions} />
        <Route path="/edit" exact component={EditPOI} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
