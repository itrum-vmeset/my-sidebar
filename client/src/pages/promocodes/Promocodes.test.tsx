import axios from "axios";

import { act, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { PROMOCODE_ROUTE } from "../../helpers/consts";
import { IPromocode } from "../../models/IResponse";
import PromocodeStore from "../../store/mobX/stores/PromocodeStore";
import { renderWithRouterAndRedux } from "../../test/renderWithRouterandRedux";

import Promocodes from "./Promocodes";
import { promocodesMockData } from "./PromocodesMockData";

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

jest.mock("../../services/PromocodeServiceM");

describe("Promocodes Page", () => {
  let response: IPromocode[];
  beforeEach(() => {
    (PromocodeStore.promocodes = promocodesMockData),
      (response = promocodesMockData);
  });

  test("fetchData", async () => {
    jest.spyOn(axios, "get").mockResolvedValue(response);
    renderWithRouterAndRedux(null, {
      initialRoute: PROMOCODE_ROUTE,
      initialState: {
        authReducer: {
          isAuth: true,
        },
      },
    });
    const tableRows = screen.getAllByTestId("tableRow");
    expect(tableRows[0]).toBeInTheDocument();
    expect(tableRows[tableRows.length - 1]).toBeInTheDocument();
    expect(tableRows).toHaveLength(promocodesMockData.length);
    const data = await axios.get("http://localhost:5005/promocodes");
    expect(data).toEqual(response);
    expect(axios.get).toBeCalledTimes(1);
  });

  test("click add promocode", () => {
    renderWithRouterAndRedux(<Promocodes />, {
      initialRoute: PROMOCODE_ROUTE,
    });
    const addBtn = screen.getByTestId("addBtn");
    expect(screen.queryByTestId("addForm")).toBeNull();
    fireEvent.click(addBtn);
    expect(screen.queryByTestId("addForm")).toBeInTheDocument();
  });

  test("click edit promocode", () => {
    renderWithRouterAndRedux(null, {
      initialRoute: PROMOCODE_ROUTE,
      initialState: {
        authReducer: {
          isAuth: true,
        },
      },
    });
    const tableRows = screen.getAllByTestId("tableRow");
    tableRows.forEach((element) => {
      expect(element).toBeInTheDocument();
      fireEvent.click(element);
      expect(screen.queryByTestId("addForm")).toBeInTheDocument();
    });
  });

  test("click delete promocode icon", async () => {
    await act(async () =>
      renderWithRouterAndRedux(null, {
        initialRoute: PROMOCODE_ROUTE,
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
});
