import * as reactTable from "react-table";

import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ORDERS_ROUTE, PRODUCTS_ROUTE } from "../../../helpers/consts";
import { menuItems } from "../../../helpers/helpers";
import { renderWithRouterAndRedux } from "../../../test/renderWithRouterandRedux";

import Sidebar from "./Sidebar";

describe("sidebar test", () => {
  jest.spyOn(reactTable, "useAsyncDebounce").mockReturnValue(() => null);

  test("click page", () => {
    renderWithRouterAndRedux(<Sidebar menuItems={menuItems} />, {
      initialRoute: ORDERS_ROUTE,
      initialState: {
        authReducer: {
          isAuth: true,
        },
      },
    });
    const productLink = screen.getByTestId(PRODUCTS_ROUTE);
    userEvent.click(productLink);
    expect(screen.getByTestId("products-page")).toBeInTheDocument();
    expect(productLink).toHaveClass("selectedMenuItem");
  });
});
