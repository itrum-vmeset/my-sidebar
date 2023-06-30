import { act, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { PROTOCOLS_ROUTE } from "../../helpers/consts";
import { renderWithRouterAndRedux } from "../../test/renderWithRouterandRedux";

import Protocols from "./Protocols";
import { protocolCategoriesMockData } from "./ProtocolsMockData";

jest.mock("axios", () => {
  return {
    get: jest.mock,
    create: () => {
      return {
        interceptors: {
          request: { eject: jest.fn(), use: jest.fn() },
          response: { eject: jest.fn(), use: jest.fn() },
        },
      };
    },
  };
});

global.alert = jest.fn();

describe("Categories page", () => {
  test("fetchData", async () => {
    renderWithRouterAndRedux(null, {
      initialRoute: PROTOCOLS_ROUTE,
      initialState: {
        authReducer: {
          isAuth: true,
        },
      },
    });
    const listItems = await screen.findAllByTestId("listItem");
    expect(listItems).toHaveLength(protocolCategoriesMockData.length);
    expect(listItems[0]).toBeInTheDocument();
  });

  test("click delete protocol icon", async () => {
    await act(async () =>
      renderWithRouterAndRedux(null, {
        initialRoute: PROTOCOLS_ROUTE,
        initialState: {
          authReducer: {
            isAuth: true,
          },
        },
      })
    );
    await screen.findAllByTestId("listItem");
    const delIcons = await screen.findAllByTestId("delIcon");
    userEvent.click(delIcons[0]);
    expect(screen.queryByTestId("deleteModal")).toBeInTheDocument();
  });

  test("click edit protocolCategory icon", async () => {
    await act(async () =>
      renderWithRouterAndRedux(null, {
        initialRoute: PROTOCOLS_ROUTE,
        initialState: {
          authReducer: {
            isAuth: true,
          },
        },
      })
    );
    await screen.findAllByTestId("listItem");
    const editIcons = await screen.findAllByTestId("editIcon");
    userEvent.click(editIcons[0]);
    expect(screen.getByTestId("confirmIcon")).toBeInTheDocument();
    expect(screen.getByTestId("closeIcon")).toBeInTheDocument();

    userEvent.click(screen.getByTestId("closeIcon"));
    expect(screen.queryByTestId("confirmIcon")).not.toBeInTheDocument();
    expect(screen.queryByTestId("closeIcon")).not.toBeInTheDocument();
  });

  test("click edit protocol icon", async () => {
    await act(async () =>
      renderWithRouterAndRedux(null, {
        initialRoute: PROTOCOLS_ROUTE,
        initialState: {
          authReducer: {
            isAuth: true,
          },
        },
      })
    );
    const protocolCategoriesItems = await within(
      screen.getByTestId("protocolCategoriesBlock")
    ).findAllByTestId("listItem");
    userEvent.click(protocolCategoriesItems[0]);

    const editIcons = await within(
      screen.getByTestId("protocolsBlock")
    ).findAllByTestId("editIcon");
    userEvent.click(editIcons[0]);
    expect(screen.getByTestId("confirmIcon")).toBeInTheDocument();
    expect(screen.getByTestId("closeIcon")).toBeInTheDocument();

    userEvent.click(screen.getByTestId("closeIcon"));
    expect(screen.queryByTestId("confirmIcon")).not.toBeInTheDocument();
    expect(screen.queryByTestId("closeIcon")).not.toBeInTheDocument();
  });

  test("click delete subCategory icon", async () => {
    await act(async () =>
      renderWithRouterAndRedux(null, {
        initialRoute: PROTOCOLS_ROUTE,
        initialState: {
          authReducer: {
            isAuth: true,
          },
        },
      })
    );
    const protocolCategoriesItems = await within(
      screen.getByTestId("protocolCategoriesBlock")
    ).findAllByTestId("listItem");
    userEvent.click(protocolCategoriesItems[0]);

    const delIcons = await within(
      screen.getByTestId("protocolsBlock")
    ).findAllByTestId("delIcon");
    userEvent.click(delIcons[0]);
    expect(screen.queryByTestId("deleteModal")).toBeInTheDocument();
  });

  test("click category row and set protocols", async () => {
    await act(async () =>
      renderWithRouterAndRedux(null, {
        initialRoute: PROTOCOLS_ROUTE,
        initialState: {
          authReducer: {
            isAuth: true,
          },
        },
      })
    );
    const protocolCategoriesItems = await within(
      screen.getByTestId("protocolCategoriesBlock")
    ).findAllByTestId("listItem");
    expect(screen.queryByTestId("protocolsBlock")).toBeNull();
    userEvent.click(protocolCategoriesItems[0]);
    const protocolsItems = await within(
      screen.getByTestId("protocolsBlock")
    ).findAllByTestId("listItem");
    expect(protocolsItems[0]).toBeInTheDocument();
  });

  test("click add empty protocol category", () => {
    renderWithRouterAndRedux(<Protocols />, {
      initialRoute: PROTOCOLS_ROUTE,
    });
    const addBtn = screen.getByTestId("addProtocolCategoryBtn");
    const inputNewCategory = screen.getByTestId("inputProtocolCategory");
    expect(inputNewCategory).toBeEmptyDOMElement();
    userEvent.click(addBtn);
    expect(window.alert).toBeCalled();
  });

  test("click add new protocol", async () => {
    renderWithRouterAndRedux(<Protocols />, {
      initialRoute: PROTOCOLS_ROUTE,
    });
    const protocolCategoriesItems = await within(
      screen.getByTestId("protocolCategoriesBlock")
    ).findAllByTestId("listItem");
    userEvent.click(protocolCategoriesItems[0]);
    await within(screen.getByTestId("protocolsBlock")).findAllByTestId(
      "listItem"
    );

    const addBtn = screen.getByTestId("addProtocolBtn");
    userEvent.click(addBtn);
    expect(screen.getByTestId("addForm")).toBeInTheDocument();
  });

  test("click edit protocol row", async () => {
    renderWithRouterAndRedux(<Protocols />, {
      initialRoute: PROTOCOLS_ROUTE,
    });
    const protocolCategoriesItems = await within(
      screen.getByTestId("protocolCategoriesBlock")
    ).findAllByTestId("listItem");
    userEvent.click(protocolCategoriesItems[0]);
    const protocolItems = await within(
      screen.getByTestId("protocolsBlock")
    ).findAllByTestId("listItem");

    protocolItems.forEach((row) => {
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
