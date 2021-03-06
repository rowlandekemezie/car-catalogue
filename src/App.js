import React, { lazy, Suspense } from "react";
import Placeholder from "react-placeholder";
import { Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { Router } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import configureStore from "./redux/store/configureStore";
import colors from "./static/colors";

import "react-placeholder/lib/reactPlaceholder.css";
import GlobalStyles from "./static/globalStyle";

// Lazy load components
const CarsView = lazy(() => import("./components/Pages/Cars"));
const CarDetailView = lazy(() => import("./components/Pages/CarDetails"));
const NotFound = lazy(() => import("./components/NotFound"));

const store = configureStore();

// Async render
const AsyncRenderFn = Component => {
  return props => (
    <Suspense
      fallback={
        <Placeholder ready={false} type="media" rows={7} delay={200}>
          <div />
        </Placeholder>
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

// History
const history = createHistory();

function App() {
  return (
    <Provider store={store}>
      <GlobalStyles color={colors.BLACK} />
      <ThemeProvider theme={colors}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={AsyncRenderFn(CarsView)} />
            <Route
              path="/cars/:carId"
              component={AsyncRenderFn(CarDetailView)}
            />
            <Route path="*" component={AsyncRenderFn(NotFound)} />
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
