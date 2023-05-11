import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Repositorios from "./pages/Repositorios.jsx";

export const RoutesApp = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/repositorios/:repositorio",
    element: <Repositorios />,
  },
]);
