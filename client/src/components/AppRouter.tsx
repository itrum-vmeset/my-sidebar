import { Route, Routes } from "react-router-dom";

import { authRoutes, publicRoutes } from "../helpers/routes";
import { useAppSelector } from "../hooks/reduxHooks";

function AppRouter(): JSX.Element {
  const { isAuth } = useAppSelector((state) => state.authReducer);

  return (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      {isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} element={<Component />} path={path} />
        ))}
      {/* <Route
        path="*"
        element={
          isAuth ? (
            <Navigate to={PRODUCTS_ROUTE} />
          ) : (
            <Navigate to={LOGIN_ROUTE} />
          )
        }
      /> */}
    </Routes>
  );
}

export default AppRouter;
