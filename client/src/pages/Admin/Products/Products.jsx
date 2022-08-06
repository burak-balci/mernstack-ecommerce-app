import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProductList, deleteProduct } from "../../../api";
import { Table, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import "antd/dist/antd.min.css";
import { toast } from "react-hot-toast";

const Products = () => {
  const queryClient = useQueryClient();

  const { isLoading, isError, data, error } = useQuery(
    ["admin:products"],
    fetchProductList
  );

  const deleteMutation = useMutation(deleteProduct, {
    onSuccess: () => queryClient.invalidateQueries(["admin:products"]),
  });

  const columns = useMemo(() => {
    return [
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <>
            <Link to={`/admin/products/${record._id}`}>Edit</Link>
            <Popconfirm
              title="Are you sure?"
              onConfirm={() => {
                deleteMutation.mutate(record._id, {
                  onSuccess: () => {
                    toast.success("The product has been successfully deleted.");
                  },
                });
              }}
              onCancel={() => console.log("iptal edildi.")}
              okText="Yes"
              cancelText="No"
              placement="left"
            >
              <button className="ml-5">Delete</button>
            </Popconfirm>
          </>
        ),
      },
    ];
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error {error.message}</div>;
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center font-rob">
        <div className="text-4xl p-5">Products</div>
        <Link to="/admin/product/new">
          <button className="text-xl  text-white border hover:text-gray-500 hover:bg-white bg-gray-500 p-2 border-gray-500">
            New Product
          </button>
        </Link>
      </div>

      <Table
        className="font-rob"
        dataSource={data}
        columns={columns}
        rowKey="_id"
      />
    </div>
  );
};

export default Products;
