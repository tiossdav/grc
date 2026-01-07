import { Route, Switch } from "wouter";
import Home from "./pages/Home";
import ToolBox from "./pages/tool-box";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      {/*   <Route path="/hub" component={Hub} /> */}
      <Route path="/toolbox" component={ToolBox} />
    </Switch>
  );
}

export default function App() {
  return (
    <>
      <Router />
    </>
  );
}
