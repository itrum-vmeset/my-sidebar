import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { CITIES_ROUTE } from "../../helpers/consts";
import { renderWithRouterAndRedux } from "../../test/renderWithRouterandRedux";

describe("Clients page", () => {
  test("success response", async () => {
    renderWithRouterAndRedux(null, {
      initialRoute: CITIES_ROUTE,
      initialState: {
        authReducer: {
          isAuth: true,
        },
      },
    });
    const tableRows = await screen.findAllByTestId("tableRow");
    expect(tableRows).toHaveLength(6);
    expect(tableRows[0]).toBeInTheDocument();
  });

  test("click delete city icon", async () => {
    await act(async () =>
      renderWithRouterAndRedux(null, {
        initialRoute: CITIES_ROUTE,
        initialState: {
          authReducer: {
            isAuth: true,
          },
        },
      })
    );
    await screen.findAllByTestId("tableRow");
    const delIcons = await screen.findAllByTestId("delIcon");
    userEvent.click(delIcons[0]);
    expect(screen.queryByTestId("deleteModal")).toBeInTheDocument();
  });

  test("click city row", async () => {
    await act(async () =>
      renderWithRouterAndRedux(null, {
        initialRoute: CITIES_ROUTE,
        initialState: {
          authReducer: {
            isAuth: true,
          },
        },
      })
    );
    const tableRows = await screen.findAllByTestId("tableRow");
    tableRows.forEach((row) => {
      userEvent.click(row);
      expect(screen.queryByTestId("addForm")).not.toBeInTheDocument();
    });
  });
});
