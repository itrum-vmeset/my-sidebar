import cn from "classnames";
import { useNavigate } from "react-router-dom";

import { LOGIN_ROUTE } from "../../../helpers/consts";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { logoutAC } from "../../../store/rtkStore/reducers/ActionCreators";
import { Button } from "../../UI/button/Button";
import { Typography } from "../../UI/typography/Typography";

import { HeaderProps } from "./Header.props";

import styles from "./Header.module.css";

function Header({ className, ...props }: HeaderProps): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.authReducer);

  const isAuth = true;

  const logout = (): void => {
    dispatch(logoutAC());
    navigate(LOGIN_ROUTE);
  };

  return (
    <div className={cn(styles.header, className)} {...props}>
      {isAuth ? (
        <>
          <Button color="inherit" onClick={logout} appearance="filled">
            LOGOUT
          </Button>
          <Typography className={styles.username}>
            {user?.email}{" "}
            {user?.isActivated ? <></> : <span>(не активирован)</span>}
          </Typography>
        </>
      ) : (
        <Button color="inherit" onClick={() => navigate(LOGIN_ROUTE)}>
          Login
        </Button>
      )}
    </div>
  );
}

export default Header;
