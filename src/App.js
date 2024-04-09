import Register from "./components/Register";
import ipConfig from "./ipConfig.json";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Thanks from "./components/Thanks"
import Products from "./components/Products";
import React from 'react';
// import { ThemeProvider } from '@material-ui/core';
import { ThemeProvider } from "@mui/system";
import theme from "./theme";
import { BrowserRouter } from "react-router-dom"
import Checkout from "./components/Checkout";


export const config = {
  endpoint: `https://qkart-frontend-ayub.onrender.com/api/v1`,
};

function App() {
  return (
    <div className="App">
      {/* TODO: CRIO_TASK_MODULE_LOGIN - To add configure routes and their mapping */}
      <BrowserRouter>
          <ThemeProvider theme={theme}>
            <Switch>
              <Route path="/register">
                <Register />
              </Route>

              <Route path="/login">
                <Login />
              </Route>

            <Route path="/checkout">
                <Checkout />
            </Route>
            
            <Route path="/thanks">
                <Thanks />
            </Route>

              <Route path="/">
                <Products />
            </Route>
            
            </Switch>
          </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
