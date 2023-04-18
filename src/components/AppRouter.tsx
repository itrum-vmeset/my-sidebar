import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PRODUCTS_ROUTE } from "../helpers/consts";
import { publicRoutes } from "../helpers/routes";

function AppRouter() {

  return (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route
        path="*"
        element={<Navigate to={PRODUCTS_ROUTE} />
        }
      />
    </Routes>
  );
}

export default AppRouter;
