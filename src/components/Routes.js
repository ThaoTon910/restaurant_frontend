import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "components/Home";
import HomeMobile from "components/HomeMobile";
import AuthPage from "components/AuthPage";
import CheckOut from "components/CheckOut/CheckOut";
import Promotions from "components/Promotions";
import Menu from "components/Menu/Menu";
import Menumobile from "components/Menu/MenuMobile";
import Reservation from "components/Reservation/Reservation";
import CustomerOrder from "components/CustomerOrders";
import About from "components/about";
import { isMobile } from "react-device-detect";

const AppRoutes = () => {
  const route_config = [
    // { path: "/", component: Home, exact: true },
    { path: "/login", component: AuthPage, exact: true },
    { path: "/checkout", component: CheckOut, exact: true },
    { path: "/menu", component: Menu, exact: true },
    { path: "/reservation", component: Reservation, exact: true },
    { path: "/Promotions", component: Promotions, exact: true },
    { path: "/orders", component: CustomerOrder, exact: true },
    { path: "/about", component: About, exact: true },
  ];
  if (isMobile) {
    route_config.push({ path: "/", component: HomeMobile, exact: true });
    route_config.push({
      path: "/menumobile",
      component: Menumobile,
      exact: true,
    });
  } else {
    route_config.push({ path: "/", component: Home, exact: true });
  }

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
