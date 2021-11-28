import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "components/Home";
import AuthPage from "components/AuthPage";
import CheckOut from "components/CheckOut/CheckOut";
import Promotions from "components/Promotions";
import Menu from "components/Menu/Menu";
import Reservation from "components/Reservation/Reservation";
import CustomerOrder from "components/CustomerOrders";
import About from "components/about";

const AppRoutes = () => {
  const route_config = [
    { path: "/", component: Home, exact: true },
    { path: "/login", component: AuthPage, exact: true },
    { path: "/checkout", component: CheckOut, exact: true },
    { path: "/menu", component: Menu, exact: true },
    { path: "/reservation", component: Reservation, exact: true },
    { path: "/Promotions", component: Promotions, exact: true },
    { path: "/orders", component: CustomerOrder, exact: true },
    { path: "/about", component: About, exact: true },
  ];

  return (
    <Router>
      <Switch>
        {route_config.map((route, index) => (
          <Route
            key={index}
            exact={route.exact}
            path={route.path}
            component={route.component}
          />
        ))}
      </Switch>
    </Router>
  );
};

export default AppRoutes;
