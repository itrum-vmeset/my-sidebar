// import { useMemo } from "react";

// import { productAPI } from "../../service/ProductService";

// export const useProducts = useMemo(
//   () =>
//     myData?[0]
//       ? Object.keys(data[0])
//           .filter((key) => key !== "rating")
//           .map((key) => {
//             if (key === "image")
//               return {
//                 Header: key,
//                 accessor: key,
//                 Cell: ({ value }) => <img src={value} />,
//                 maxWidth: 70,
//               };

//             return { Header: key, accessor: key };
//           })
//       : [],
//   [data]
// );
