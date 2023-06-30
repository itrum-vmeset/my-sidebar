import * as reactTable from "react-table";

import { act, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { PRODUCTS_ROUTE } from "../../helpers/consts";
import { renderWithRouterAndRedux } from "../../test/renderWithRouterandRedux";

describe("Products page", () => {
  jest.spyOn(reactTable, "useAsyncDebounce").mockReturnValue(() => null);
  test("success response", async () => {
    renderWithRouterAndRedux(null, {
      initialRoute: PRODUCTS_ROUTE,
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

  test("click to edit product", async () => {
    renderWithRouterAndRedux(null, {
      initialRoute: PRODUCTS_ROUTE,
      initialState: {
        authReducer: {
          isAuth: true,
        },
      },
    });
    const tableRows = await screen.findAllByTestId("tableRow");

    tableRows.forEach((row) => {
      const rowTitle: string =
        within(row).getAllByTestId("rowTitle")[0].innerHTML;

      userEvent.click(row);
      expect(screen.getByTestId("addForm")).toBeInTheDocument();

      const formInputs = within(screen.getByTestId("addForm")).getAllByRole(
        "textbox"
      );
      expect((formInputs[1] as HTMLInputElement).value).toBe(rowTitle);
    });
  });

  test("checkbox click", async () => {
    await act(async () =>
      renderWithRouterAndRedux(null, {
        initialRoute: PRODUCTS_ROUTE,
        initialState: {
          authReducer: {
            isAuth: true,
          },
        },
      })
    );
    await screen.findAllByTestId("tableRow");

    const checkAll = screen.getByTestId("checkAll");
    const checkBoxes = screen.getAllByTestId("checkbox");
    expect(checkBoxes).toHaveLength(10);
    screen.queryByTestId("checkBoxAlert");

    userEvent.click(checkAll);
    const checkBoxAlert = screen.getByTestId("checkBoxAlert");
    expect(checkBoxAlert).toBeInTheDocument();

    checkBoxes.forEach((checkbox: any) => {
      expect(checkbox.checked).toBe(true);
    });

    userEvent.click(checkAll);
    expect(checkBoxAlert).not.toBeInTheDocument();

    checkBoxes.forEach((checkbox: any) => {
      expect(checkbox.checked).toBe(false);
      userEvent.click(checkbox);
      expect(checkbox.checked).toBe(true);
    });
  });
});
