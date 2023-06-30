import { act } from "react-dom/test-utils";
import * as reactTable from "react-table";

import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ORDERS_ROUTE } from "../../helpers/consts";
import { renderWithRouterAndRedux } from "../../test/renderWithRouterandRedux";

describe("Orders page", () => {
  jest.spyOn(reactTable, "useAsyncDebounce").mockReturnValue(() => null);
  it("success response", async () => {
    renderWithRouterAndRedux(null, {
      initialRoute: ORDERS_ROUTE,
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

  it("click to edit order", async () => {
    await act(async () =>
      renderWithRouterAndRedux(null, {
        initialRoute: ORDERS_ROUTE,
        initialState: {
          authReducer: {
            isAuth: true,
          },
        },
      })
    );
    const tableRows = await screen.findAllByTestId("tableRow");

    tableRows.forEach((row) => {
      const rowTitle: string =
        within(row).getAllByTestId("rowTitle")[0].innerHTML;

      userEvent.click(row);
      expect(screen.getByTestId("addForm")).toBeInTheDocument();

      const formInputs = within(screen.getByTestId("addForm")).getAllByRole(
        "textbox"
      );
      expect((formInputs[0] as HTMLInputElement).value).toBe(rowTitle);
    });
  });
});
