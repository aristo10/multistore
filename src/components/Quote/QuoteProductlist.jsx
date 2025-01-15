import { Card} from "antd";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import ViewBtn from "../Buttons/ViewBtn";
import Table from "@/UI/Table";

const QuoteProductList = ({ quoteProduct }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "productId",
      key: "productId",
    },
    {
      title: "Name",
      dataIndex: "product",
      key: "product.name",
      render: (product) => (
        <Link to={`/admin/product/${product.id}`}>{product.name}</Link>
      ),
    },
    {
      title: "Product Quantity",
      dataIndex: "productQuantity",
      key: "productQuantity",
    },
    {
      title: "Product Unit Price",
      dataIndex: "unitPrice",
      key: "unitPrice",
    },
    {
      title: "Create Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("YYYY-MM-DD"),
    },
    {
      title: "Action",
      key: "Action",
      render: ({ id }) => <ViewBtn path={`/admin/product/${id}`} />,
    },
  ];

  const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

  return (
   
        <Card
          className='header-solid h-full'
          bordered={false}
          title={
            <h6 className='font-semibold m-0 text-center'>
              Quote Product List
            </h6>
          }
          bodyStyle={{ paddingTop: "0" }}
        >
          <div className='mt-4'>
            <Table
              scroll={{ x: true }}
              loading={!quoteProduct}
              columns={columns}
              data={quoteProduct ? addKeys(quoteProduct) : []}
            />
          </div>
        </Card>
 
  );
};

export default QuoteProductList;
