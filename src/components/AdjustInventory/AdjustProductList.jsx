import Table from '@/UI/Table';
import React from 'react'
import { Link } from 'react-router-dom';

export default function AdjustProductList({list}) {
  const columns = [
    {
      title: "ID",
      dataIndex: "productId",
      key: "productId",
    },
    {
      title: "Name",
      dataIndex: "product",
      render: (product) => (
        <Link to={`/admin/product/${product.id}`}>{product.name}</Link>
      ),
      tdClass: "whitespace-normal",
    },
    
    {
      title: "Adjust Quantity",
      dataIndex: "adjustQuantity",
      key: "adjustQuantity",
    },
    {
      title: "Price",
      dataIndex: "product",
      key: "productPurchasePrice",
      render:(product)=> product.productPurchasePrice
    },
   
  ];



  const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

  return (
    <div className='m-1 md:mt-4'>
      <Table
        scroll={{ x: true }}
        loading={!list}
        columns={columns}
        data={list ? addKeys(list) : []}
      />
    </div>
  );
}
