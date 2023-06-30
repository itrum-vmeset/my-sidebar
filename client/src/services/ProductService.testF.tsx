// import { Provider } from "react-redux";
// import { MemoryRouter } from "react-router-dom";

// import { renderHook, screen, waitFor } from "@testing-library/react";

// import AppRouter from "../components/router/AppRouter";
// import Products from "../pages/products/Products";
// import { mockData } from "../pages/products/ProductsMockData";
// import { setupStore } from "../store/rtkStore/store";

// import { useFetchAllProductsQuery } from "./ProductService";

// function wrapper() {
//   const store = setupStore();
//   return (
//     <MemoryRouter>
//       <Provider store={store}>
//         <Products />
//       </Provider>
//     </MemoryRouter>
//   );
// }

// beforeEach(() => {
//   fetchMock.resetMocks();
// });

// describe("PRO TEST", () => {
//   const data = {};
//   beforeEach(() => {
//     fetchMock.mockOnceIf("http://localhost:5005/products2", () =>
//       Promise.resolve({
//         status: 200,
//         body: JSON.stringify({ data }),
//       })
//     );
//   });

//   it("renders hook", async () => {
//     const { result } = renderHook(() => useFetchAllProductsQuery(null), {
//       wrapper,
//     });

//     expect(result.current).toMatchObject({
//       status: "pending",
//       endpointName: "fetchAllProducts",
//       isLoading: true,
//       isSuccess: false,
//       isError: false,
//       isFetching: true,
//     });

//     await waitFor(() => expect(result.current.isSuccess).toBe(true));

//     expect(fetchMock).toBeCalledTimes(1);
//     expect(result.current).toMatchObject({
//       status: "fulfilled",
//       endpointName: "fetchAllProducts",
//       data: mockData,
//       isLoading: false,
//       isSuccess: true,
//       isError: false,
//       isFetching: false,
//     });
//   });
// });
