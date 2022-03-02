import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import App from "./App";
import { runWithAdal } from "react-adal";
import { authContext } from "./adalConfig";
import { MyContextProvider } from "./store/MyContext";

const DO_NOT_LOGIN = false;

runWithAdal(
  authContext,
  () => {
    ReactDOM.render(
      <MyContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MyContextProvider>,
      document.getElementById("root")
    );
  },
  DO_NOT_LOGIN
);
