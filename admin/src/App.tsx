import { Switch, Route, useLocation } from "wouter";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import Courses from "./pages/Courses";
import Podcasts from "./pages/Podcasts";
import BoardMembers from "./pages/BoardMembers";
import Subscribers from "./pages/Subscribers";
import Donations from "./pages/Donations";
import Partners from "./pages/Partners";
import Publications from "./pages/Publications";
import ResearchProjects from "./pages/ResearchProjects";
import Scholars from "./pages/Scholars";
import SidebarLayout from "./components/SidebarLayout";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token && location !== "/login") {
      setLocation("/login");
    } else if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [location, setLocation]);

  if (location === "/login") {
    return <Login />;
  }

  return (
    <SidebarLayout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/events" component={Events} />
        <Route path="/courses" component={Courses} />
        <Route path="/podcasts" component={Podcasts} />
        <Route path="/board-members" component={BoardMembers} />
        <Route path="/publications" component={Publications} />
        <Route path="/research-projects" component={ResearchProjects} />
        <Route path="/scholars" component={Scholars} />
        <Route path="/subscribers" component={Subscribers} />
        <Route path="/donations" component={Donations} />
        <Route path="/partners" component={Partners} />
        <Route>
          <div className="flex items-center justify-center h-full">
            <h1 className="text-2xl font-bold text-gray-500">404 - Page Not Found</h1>
          </div>
        </Route>
      </Switch>
    </SidebarLayout>
  );
}

export default App;
