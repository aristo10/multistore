import UseStoreFilter from "@/Hooks/useStoreFilter";
import Card from "@/UI/Card";
import { loadAllDamageStockPaginated } from "@/redux/rtk/features/damageStock/damageStockSlice";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableComponent from "../CommonUi/TableComponent";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";

export default function GetAllDamageProduct() {
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    status: "true",
  });
  const { list, loading, total } = useSelector((state) => state.damageStock);
  const { storeFilter } = UseStoreFilter();
  const dispatch = useDispatch();

  const columns = [
    {
      title: "Product Name",
      dataIndex: "product",
      key: "product",
      render: (text) => text.name,
      renderCsv: (text) => text.name,
    },
    {
      title: "Store",
      dataIndex: "store",
      key: "store",
      render: (text) => text.name,
      renderCsv: (text) => text.name,
    },
    {
      title: "Quantity",
      dataIndex: "productQuantity",
      key: "quantity",
    },
    {
      title: "Purchase Price",
      dataIndex: "productPurchasePrice",
      key: "price",
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "date",
      render: (date) => moment(date).format("ll"),
      renderCsv: (date) => moment(date).format("ll"),
    },
  ];

  const filters = [
    storeFilter,
    {
      key: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Show", value: "true" },
        { label: "Hide", value: "false" },
      ],
      className: "min-w-[85px] max-w-[150px]",
      popupClassName: "w-[200px]",
    },
  ];

  useEffect(() => {
    dispatch(loadAllDamageStockPaginated(pageConfig));
  }, [dispatch, pageConfig]);

  return (
    <Card
      className='max-md:border-0 max-md:bg-white'
      bodyClass='max-md:p-0 '
      headClass='border-none'
      title={"Products"}
    >
      <UserPrivateComponent permission={"readAll-stock"}>
        <TableComponent
          list={list}
          total={total}
          loading={loading}
          columns={columns}
          filters={filters}
          setPageConfig={setPageConfig}
          title='Damage Product List'
          isSearch
        />
      </UserPrivateComponent>
    </Card>
  );
}
