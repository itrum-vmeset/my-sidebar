import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { ReactComponent as EyeIcon } from "../../assets/icons/eye.svg";
import { Button } from "../../components/UI/button/Button";
import { Input } from "../../components/UI/input/Input";
import { Typography } from "../../components/UI/typography/Typography";
import { LOGIN_ROUTE, REGISTER_ROUTE } from "../../helpers/consts";

import styles from "./Auth.module.css";

function Auth(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;

  const handleClickShowPassword = (): void => setShowPassword(!showPassword);

  return (
    <div className={styles.wrapper}>
      <form action="" className={styles.form}>
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
        <Button appearance="filled" className={styles.button}>
          Войти
        </Button>
        <Typography className={styles.links}>
          {isLogin ? (
            <NavLink to={REGISTER_ROUTE}>{"У меня еще нет аккаунта"}</NavLink>
          ) : (
            <NavLink to={LOGIN_ROUTE}>{"У меня уже есть аккаунт"}</NavLink>
          )}
        </Typography>
      </form>
    </div>
  );
}

export default Auth;
