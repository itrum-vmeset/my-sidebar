import { act, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { CATEGORIES_ROUTE } from "../../helpers/consts";
import { renderWithRouterAndRedux } from "../../test/renderWithRouterandRedux";

import Categories from "./Categories";
import { categoriesMockData } from "./CategoriesMockData";

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
      initialRoute: CATEGORIES_ROUTE,
      initialState: {
        authReducer: {
          isAuth: true,
        },
      },
    });
    const listItems = await screen.findAllByTestId("listItem");
    expect(listItems).toHaveLength(categoriesMockData.length);
    expect(listItems[0]).toBeInTheDocument();
  });

  test("click delete category icon", async () => {
    await act(async () =>
      renderWithRouterAndRedux(null, {
        initialRoute: CATEGORIES_ROUTE,
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
        initialRoute: CATEGORIES_ROUTE,
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

  test("click edit subCategory icon", async () => {
    await act(async () =>
      renderWithRouterAndRedux(null, {
        initialRoute: CATEGORIES_ROUTE,
        initialState: {
          authReducer: {
            isAuth: true,
          },
        },
      })
    );
    const categoryItems = await within(
      screen.getByTestId("categoriesBlock")
    ).findAllByTestId("listItem");
    userEvent.click(categoryItems[0]);

    const editIcons = await within(
      screen.getByTestId("subCategoriesBlock")
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
        initialRoute: CATEGORIES_ROUTE,
        initialState: {
          authReducer: {
            isAuth: true,
          },
        },
      })
    );
    const categoryItems = await within(
      screen.getByTestId("categoriesBlock")
    ).findAllByTestId("listItem");
    userEvent.click(categoryItems[0]);

    const delIcons = await within(
      screen.getByTestId("subCategoriesBlock")
    ).findAllByTestId("delIcon");
    userEvent.click(delIcons[0]);
    expect(screen.queryByTestId("deleteModal")).toBeInTheDocument();
  });

  test("click category row and set subcategories", async () => {
    await act(async () =>
      renderWithRouterAndRedux(null, {
        initialRoute: CATEGORIES_ROUTE,
        initialState: {
          authReducer: {
            isAuth: true,
          },
        },
      })
    );
    const categoryItems = await within(
      screen.getByTestId("categoriesBlock")
    ).findAllByTestId("listItem");
    expect(screen.queryByTestId("subCategoriesBlock")).toBeNull();
    userEvent.click(categoryItems[0]);
    const subCategoryItems = await within(
      screen.getByTestId("subCategoriesBlock")
    ).findAllByTestId("listItem");
    expect(subCategoryItems[0]).toBeInTheDocument();
  });

  test("click add empty category", () => {
    renderWithRouterAndRedux(<Categories />, {
      initialRoute: CATEGORIES_ROUTE,
    });
    const addBtn = screen.getByTestId("addCategoryBtn");
    const inputNewCategory = screen.getByTestId("inputNewCategory");
    expect(inputNewCategory).toBeEmptyDOMElement();
    userEvent.click(addBtn);
    expect(window.alert).toBeCalled();
  });

  test("click add empty subCategory", async () => {
    renderWithRouterAndRedux(<Categories />, {
      initialRoute: CATEGORIES_ROUTE,
    });
    const categoryItems = await within(
      screen.getByTestId("categoriesBlock")
    ).findAllByTestId("listItem");
    userEvent.click(categoryItems[0]);
    await within(screen.getByTestId("subCategoriesBlock")).findAllByTestId(
      "listItem"
    );

    const addBtn = screen.getByTestId("addSubCategoryBtn");
    const inputNewCategory = screen.getByTestId("inputNewSubCategory");
    expect(inputNewCategory).toBeEmptyDOMElement();
    userEvent.click(addBtn);
    expect(window.alert).toBeCalled();
  });
});
