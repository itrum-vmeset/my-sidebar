import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { PRODUCTS_ROUTE, PROMOCODE_ROUTE } from "../../../helpers/consts";
import { menuItems } from "../../../helpers/helpers";
import { IUser } from "../../../models/IResponse";
import { renderWithRouterAndRedux } from "../../../tests/renderWithRouterandRedux";

import Sidebar from "./Sidebar";

describe("sidebar test", () => {
  test("click page", () => {
    renderWithRouterAndRedux(<Sidebar menuItems={menuItems} />, {
      initialRoute: PRODUCTS_ROUTE,
      initialState: {
        user: {
          email: "string",
          id: "string",
          isActivated: true,
        },
        isAuth: true,
        isLoading: false,
        error: "",
        clients: [],
      },
    });
    const productLink = screen.getByTestId(PRODUCTS_ROUTE);
    userEvent.click(productLink);
    expect(screen.getByTestId("products-page")).toBeInTheDocument();
    screen.debug();
  });

  // test("click page", () => {
  //   renderWithRouterAndRedux(<Sidebar menuItems={menuItems} />, null);
  //   const promocodeLink = screen.getByTestId(PROMOCODE_ROUTE);
  //   userEvent.click(promocodeLink);
  //   expect(screen.getByTestId("promocodes-page")).toBeInTheDocument();
  //   screen.debug();
  // });
});
