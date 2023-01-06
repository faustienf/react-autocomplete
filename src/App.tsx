import { Switch, Route } from "wouter";

import { InputPage } from "./pages/input-page";

export const App = () => {
  return (
    <div className="app">
      <div>
        <a href="/">Input</a>
      </div>
      <Switch>
        <Route path="/" component={InputPage} />
      </Switch>
    </div>
  );
};
