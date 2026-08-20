import { Switch, Route, useLocation } from "wouter";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import Subscribers from "./pages/Subscribers";
import Donations from "./pages/Donations";
import Partners from "./pages/Partners";
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
