import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import { render, RenderResult } from "@testing-library/react";

import AppRouter from "../components/router/AppRouter";
import { ORDERS_ROUTE, PRODUCTS_ROUTE } from "../helpers/consts";
import { setupStore } from "../store/rtkStore/store";

export const renderWithRouterAndRedux = (
  component: JSX.Element,
  options: any
): RenderResult => {
  const store = setupStore(options?.initialState);

  return render(
    <MemoryRouter initialEntries={[options?.initialRoute]}>
      <Provider store={store}>
        <AppRouter />
        {component}
      </Provider>
    </MemoryRouter>
  );
};
