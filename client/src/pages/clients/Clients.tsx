import { useEffect } from "react";

import { withLayout } from "../../components/layout/Layout";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchAC } from "../../store/reducers/ActionCreators";

function Clients(): JSX.Element {
  const dispatch = useAppDispatch();
  const { clients } = useAppSelector((state) => state.authReducer);

  useEffect(() => {
    dispatch(fetchAC());
  }, []);

  return (
    <div>
      clients
      {clients.map((cl) => (
        <div key={cl.id}>{cl.email}</div>
      ))}
    </div>
  );
}

export default withLayout(Clients);
