import { useEffect } from "react";

import AppRouter from "./components/AppRouter";
import Loader from "./components/UI/loader/Loader";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { checkAC } from "./store/rtkStore/reducers/ActionCreators";
import { authSlice } from "./store/rtkStore/reducers/AuthSlice";

import styles from "./App.module.css";

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.authReducer);

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
      <AppRouter />
    </div>
  );
}

export default App;
