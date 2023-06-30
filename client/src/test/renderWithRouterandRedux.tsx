import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import { render, RenderResult } from "@testing-library/react";

import AppRouter from "../components/router/AppRouter";
import { setupStore } from "../store/rtkStore/store";

export const renderWithRouterAndRedux = <T,>(
  component: JSX.Element | null,
  options: {
    initialRoute: string;
    initialState?: any;
  }
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
