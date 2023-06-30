import * as reactTable from "react-table";

import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { CLIENTS_ROUTE } from "../../helpers/consts";
import { renderWithRouterAndRedux } from "../../test/renderWithRouterandRedux";

describe("Clients page", () => {
  jest.spyOn(reactTable, "useAsyncDebounce").mockReturnValue(() => null);

  it("success response", async () => {
    renderWithRouterAndRedux(null, {
      initialRoute: CLIENTS_ROUTE,
      initialState: {
        authReducer: {
          isAuth: true,
        },
      },
    });
    const tableRows = await screen.findAllByTestId("tableRow");
    expect(tableRows).toHaveLength(10);
    expect(tableRows[0]).toBeInTheDocument();
  });
});

it("click client row", async () => {
  renderWithRouterAndRedux(null, {
    initialRoute: CLIENTS_ROUTE,
    initialState: {
      authReducer: {
        isAuth: true,
      },
    },
  });
  const tableRows = await screen.findAllByTestId("tableRow");
  tableRows.forEach((row) => {
    userEvent.click(row);
    expect(screen.queryByTestId("addForm")).not.toBeInTheDocument();
  });
});
