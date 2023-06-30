import axios from "axios";

import { act, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { BANNERS_ROUTE } from "../../helpers/consts";
import { IBanner } from "../../models/IResponse";
import BannerStore from "../../store/mobX/stores/BannerStore";
import { renderWithRouterAndRedux } from "../../test/renderWithRouterandRedux";

import Banners from "./Banners";
import { bannersMockData } from "./BannersMockData";

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

jest.mock("../../services/BannerServiceM");

describe("Banners Page", () => {
  let response: IBanner[];
  beforeEach(() => {
    (BannerStore.banners = bannersMockData as any),
      (response = bannersMockData as any);
  });

  test("fetchData", async () => {
    jest.spyOn(axios, "get").mockResolvedValue(response);
    renderWithRouterAndRedux(null, {
      initialRoute: BANNERS_ROUTE,
      initialState: {
        authReducer: {
          isAuth: true,
        },
      },
    });
    const listItems = screen.getAllByTestId("listItem");
    expect(listItems[0]).toBeInTheDocument();
    expect(listItems[listItems.length - 1]).toBeInTheDocument();
    expect(listItems).toHaveLength(bannersMockData.length);
    const data = await axios.get("http://localhost:5005/banners");
    expect(data).toEqual(response);
    expect(axios.get).toBeCalledTimes(1);
  });

  test("click add banner", () => {
    renderWithRouterAndRedux(<Banners />, {
      initialRoute: BANNERS_ROUTE,
    });
    const addBtn = screen.getByTestId("addBtn");
    expect(screen.queryByTestId("addForm")).toBeNull();
    fireEvent.click(addBtn);
    expect(screen.queryByTestId("addForm")).toBeInTheDocument();
  });

  test("click edit banner", () => {
    renderWithRouterAndRedux(null, {
      initialRoute: BANNERS_ROUTE,
      initialState: {
        authReducer: {
          isAuth: true,
        },
      },
    });
    const listItems = screen.getAllByTestId("listItem");
    listItems.forEach((element) => {
      expect(element).toBeInTheDocument();
      fireEvent.click(element);
      expect(screen.queryByTestId("addForm")).toBeInTheDocument();
    });
  });

  test("click delete banner icon", async () => {
    await act(async () =>
      renderWithRouterAndRedux(null, {
        initialRoute: BANNERS_ROUTE,
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
        initialRoute: BANNERS_ROUTE,
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
});
