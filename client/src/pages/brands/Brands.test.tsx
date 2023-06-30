import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { BRANDS_ROUTE } from "../../helpers/consts";
import { renderWithRouterAndRedux } from "../../test/renderWithRouterandRedux";

import Brands from "./Brands";
import { brandsMockData } from "./BrandsMockData";

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

describe("Banners Page", () => {
  test("fetchData", async () => {
    renderWithRouterAndRedux(null, {
      initialRoute: BRANDS_ROUTE,
      initialState: {
        authReducer: {
          isAuth: true,
        },
      },
    });
    const listItems = await screen.findAllByTestId("listItem");
    expect(listItems).toHaveLength(brandsMockData.length);
    expect(listItems[0]).toBeInTheDocument();
  });

  test("click delete category icon", async () => {
    await act(async () =>
      renderWithRouterAndRedux(null, {
        initialRoute: BRANDS_ROUTE,
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

  test("click edit category icon", async () => {
    await act(async () =>
      renderWithRouterAndRedux(null, {
        initialRoute: BRANDS_ROUTE,
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

  test("click brand row", async () => {
    await act(async () =>
      renderWithRouterAndRedux(null, {
        initialRoute: BRANDS_ROUTE,
        initialState: {
          authReducer: {
            isAuth: true,
          },
        },
      })
    );
    const listItems = await screen.findAllByTestId("listItem");
    listItems.forEach((row) => {
      userEvent.click(row);
      expect(screen.queryByTestId("addForm")).not.toBeInTheDocument();
    });
  });

  test("click add empty brand", () => {
    renderWithRouterAndRedux(<Brands />, {
      initialRoute: BRANDS_ROUTE,
    });
    const addBtn = screen.getByTestId("addNewBrandBtn");
    const inputNewCategory = screen.getAllByTestId("inputNewBrand");
    expect(inputNewCategory[0]).toBeEmptyDOMElement();
    userEvent.click(addBtn);
    expect(window.alert).toBeCalled();
  });
});
