import * as reactTable from "react-table";

import { act, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SEMINARS_ROUTE } from "../../helpers/consts";
import { renderWithRouterAndRedux } from "../../test/renderWithRouterandRedux";

describe("Seminars page", () => {
  jest.spyOn(reactTable, "useAsyncDebounce").mockReturnValue(() => null);
  test("success response", async () => {
    renderWithRouterAndRedux(null, {
      initialRoute: SEMINARS_ROUTE,
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

  global.alert = jest.fn();

  test("click to edit seminar on future tab", async () => {
    renderWithRouterAndRedux(null, {
      initialRoute: SEMINARS_ROUTE,
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
      expect((formInputs[0] as HTMLInputElement).value).toBe(rowTitle);
    });
  });

  test("checkbox click on future tab", async () => {
    await act(async () =>
      renderWithRouterAndRedux(null, {
        initialRoute: SEMINARS_ROUTE,
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

  test("click delete seminar icon on future tab", async () => {
    await act(async () =>
      renderWithRouterAndRedux(null, {
        initialRoute: SEMINARS_ROUTE,
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

  test("click history navItem", async () => {
    await act(async () =>
      renderWithRouterAndRedux(null, {
        initialRoute: SEMINARS_ROUTE,
        initialState: {
          authReducer: {
            isAuth: true,
          },
        },
      })
    );

    const navItems = screen.getAllByTestId("navItem");
    userEvent.click(navItems[1]);

    const tableRows = await screen.findAllByTestId("tableRow");

    expect(tableRows).toHaveLength(2);
    expect(tableRows[0]).toContainHTML(
      "Конференция для врачей всех специализаций и косметологов"
    );
  });

  test("click request navItem", async () => {
    await act(async () =>
      renderWithRouterAndRedux(null, {
        initialRoute: SEMINARS_ROUTE,
        initialState: {
          authReducer: {
            isAuth: true,
          },
        },
      })
    );

    const navItems = screen.getAllByTestId("navItem");
    userEvent.click(navItems[2]);

    const tableRows = await screen.findAllByTestId("tableRow");
    expect(tableRows[0]).toContainHTML("Семинар Académie в Ростове-на-Дону");
  });

  test("checkbox click on history tab", async () => {
    await act(async () =>
      renderWithRouterAndRedux(null, {
        initialRoute: SEMINARS_ROUTE,
        initialState: {
          authReducer: {
            isAuth: true,
          },
        },
      })
    );

    const navItems = screen.getAllByTestId("navItem");
    userEvent.click(navItems[1]);
    await screen.findAllByTestId("tableRow");

    const checkAll = screen.getByTestId("checkAll");
    const checkBoxes = screen.getAllByTestId("checkbox");
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

  test("no checkbox on request tab", async () => {
    await act(async () =>
      renderWithRouterAndRedux(null, {
        initialRoute: SEMINARS_ROUTE,
        initialState: {
          authReducer: {
            isAuth: true,
          },
        },
      })
    );

    const navItems = screen.getAllByTestId("navItem");
    userEvent.click(navItems[2]);
    await screen.findAllByTestId("tableRow");

    expect(screen.queryByTestId("checkAll")).not.toBeInTheDocument();
    expect(screen.queryByTestId("checkbox")).not.toBeInTheDocument();
  });

  test("click to edit seminar on history tab", async () => {
    await act(async () =>
      renderWithRouterAndRedux(null, {
        initialRoute: SEMINARS_ROUTE,
        initialState: {
          authReducer: {
            isAuth: true,
          },
        },
      })
    );

    const navItems = screen.getAllByTestId("navItem");
    userEvent.click(navItems[1]);

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

  test("try to edit seminar on request tab", async () => {
    await act(async () =>
      renderWithRouterAndRedux(null, {
        initialRoute: SEMINARS_ROUTE,
        initialState: {
          authReducer: {
            isAuth: true,
          },
        },
      })
    );

    const navItems = screen.getAllByTestId("navItem");
    userEvent.click(navItems[2]);

    const tableRows = await screen.findAllByTestId("tableRow");
    tableRows.forEach((row) => {
      userEvent.click(row);
      expect(screen.queryByTestId("addForm")).not.toBeInTheDocument();
    });
  });

  test("click delete seminar icon on history tab", async () => {
    await act(async () =>
      renderWithRouterAndRedux(null, {
        initialRoute: SEMINARS_ROUTE,
        initialState: {
          authReducer: {
            isAuth: true,
          },
        },
      })
    );
    const navItems = screen.getAllByTestId("navItem");
    userEvent.click(navItems[1]);

    const tableRows = await screen.findAllByTestId("tableRow");
    const delIcons = await screen.findAllByTestId("delIcon");
    userEvent.click(delIcons[0]);
    expect(screen.queryByTestId("deleteModal")).toBeInTheDocument();
  });

  test("click shape icon on history tab", async () => {
    await act(async () =>
      renderWithRouterAndRedux(null, {
        initialRoute: SEMINARS_ROUTE,
        initialState: {
          authReducer: {
            isAuth: true,
          },
        },
      })
    );
    const navItems = screen.getAllByTestId("navItem");
    userEvent.click(navItems[1]);

    await screen.findAllByTestId("tableRow");
    const shapeIcons = await screen.findAllByTestId("shapeIcon");
    userEvent.click(shapeIcons[0]);
    expect(window.alert).toBeCalled();
  });
});
