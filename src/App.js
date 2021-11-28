import AppRoutes from "./components/Routes";
// import {useEffect} from 'react';
import { Provider } from "react-redux";
import Amplify from "aws-amplify";
import awsconfig from "aws-exports";
import store from "./store";
import AuthProvider from "components/AuthProvider";
import RestaurantProvider from "components/RestaurantProvider";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

Amplify.configure(awsconfig);
let persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <RestaurantProvider>
            <AppRoutes />
          </RestaurantProvider>
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
