import { Route, Switch } from "wouter";
import Home from "./pages/Home";
import ToolBox from "./pages/tool-box";
import Hub from "./pages/hub";
import Support from "./pages/find-support";
import Voices from "./pages/voice";
import LearningHub from "./pages/learning-hub";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/hub" component={Hub} />
      <Route path="/toolbox" component={ToolBox} />
      <Route path="/support" component={Support} />
      <Route path="/voice" component={Voices} />
      <Route path="/learning-hub" component={LearningHub} />
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
