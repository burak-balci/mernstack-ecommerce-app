import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "../../api";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Error from "../Error";
import Loading from "../Loading";

const Orders = () => {
  const { isLoading, isError, data, error } = useQuery(
    ["admin:orders"],
    fetchOrders
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error error={error.message} />;
  }

  return (
    <div className=" flex flex-col justify-center items-start font-rob">
      {data.length < 1 && <div className="mt-24"></div>}
      <Text fontSize="2xl" p={5}>
        Orders
      </Text>
      <Table variant="simple">
        <TableCaption></TableCaption>
        <Thead>
          <Tr>
            <Th>User</Th>
            <Th>Adress</Th>
            <Th isNumeric>Items</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr key={item._id}>
              <Td>{item.user.email}</Td>
              <Td>{item.adress}</Td>
              <Td isNumeric>
                <Link
                  className="text-xl border px-5 rounded-md bg-gray-500 text-white hover:bg-gray-700 py-1"
                  to={`${item._id}`}
                >
                  {item.items.length}
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default Orders;
