import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { ReactComponent as EyeIcon } from "../../assets/icons/eye.svg";
import { Button } from "../../components/UI/button/Button";
import { Input } from "../../components/UI/input/Input";
import { Typography } from "../../components/UI/typography/Typography";
import {
  LOGIN_ROUTE,
  PRODUCTS_ROUTE,
  REGISTER_ROUTE,
} from "../../helpers/consts";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  loginAC,
  registerAC,
} from "../../store/rtkStore/reducers/ActionCreators";

import styles from "./Auth.module.css";

function Auth(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const { error, isAuth } = useAppSelector((state) => state.authReducer);

  const navigate = useNavigate();

  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;

  const handleClickShowPassword = (): void => setShowPassword(!showPassword);

  const handleClickAuth = async () => {
    if (isLogin) {
      dispatch(loginAC(email, password));
      navigate(PRODUCTS_ROUTE);
    } else {
      if (password === checkPassword) {
        dispatch(registerAC(email, password));
        navigate(PRODUCTS_ROUTE);
      } else {
        alert("пароли не совпадают!");
      }
    }
    setEmail("");
    setPassword("");
    setCheckPassword("");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>
        {isLogin ? (
          <h2>Вход в учётную запись</h2>
        ) : (
          <h2>Создание учетной записи</h2>
        )}
        <Typography>E-mail</Typography>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.fullWidth}
          placeholder="Введите свой e-mail"
        />
        <Typography>Пароль</Typography>
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.fullWidth}
          type={showPassword ? "text" : "password"}
          placeholder="Введите пароль"
        />
        <EyeIcon
          className={styles.showPassword}
          onClick={handleClickShowPassword}
        />
        {isLogin ? (
          <div className={styles.check}>
            <Input className={styles.chkBox} type="checkbox" />
            <span>Запомнить меня</span>
          </div>
        ) : (
          <div>
            <Typography>Повторите пароль</Typography>
            <Input
              value={checkPassword}
              onChange={(e) => setCheckPassword(e.target.value)}
              placeholder="Повторите пароль"
              className={styles.fullWidth}
              type={showPassword ? "text" : "password"}
            />
            <EyeIcon
              className={styles.showPasswordCheck}
              onClick={handleClickShowPassword}
            />
          </div>
        )}
        <Button
          appearance="filled"
          className={styles.button}
          onClick={handleClickAuth}
        >
          {isLogin ? <span>Войти</span> : <span>Регистрация</span>}
        </Button>
        <Typography className={styles.links}>
          {isLogin ? (
            <NavLink to={REGISTER_ROUTE}>{"У меня еще нет аккаунта"}</NavLink>
          ) : (
            <NavLink to={LOGIN_ROUTE}>{"У меня уже есть аккаунт"}</NavLink>
          )}
        </Typography>
        <Typography className={styles.error}>{error}</Typography>
      </div>
    </div>
  );
}

export default Auth;
