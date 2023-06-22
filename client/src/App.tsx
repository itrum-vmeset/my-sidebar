import { useEffect } from "react";

import Header from "./components/layout/header/Header";
import Sidebar from "./components/layout/sidebar/Sidebar";
import AppRouter from "./components/router/AppRouter";
import Loader from "./components/UI/loader/Loader";
import { menuItems } from "./helpers/helpers";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { checkAC } from "./store/rtkStore/reducers/ActionCreators";
import { authSlice } from "./store/rtkStore/reducers/AuthSlice";

import styles from "./App.module.css";

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const { isLoading, isAuth } = useAppSelector((state) => state.authReducer);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      dispatch(checkAC());
    } else {
      dispatch(authSlice.actions.setIsLoading(false));
    }
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.layout}>
        {isAuth && (
          <>
            <Header className={styles.header} />
            <Sidebar className={styles.sidebar} menuItems={menuItems} />
          </>
        )}
        <div className={styles.body}>
          <AppRouter />
        </div>
      </div>
    </div>
  );
}

export default App;
