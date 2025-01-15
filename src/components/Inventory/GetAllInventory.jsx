import Card from "@/UI/Card";
import {
  deleteInventory,
  loadAllInventoryPaginated,
} from "@/redux/rtk/features/inventory/inventorySlice";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonDelete from "../CommonUi/CommonDelete";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TableComponent from "../CommonUi/TableComponent";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import AddStore from "./AddInventory";
import UpdateInventory from "./UpdateInventory";

export default function GetAllInventory() {
  const dispatch = useDispatch();
  const { list, total, loading } = useSelector((state) => state.inventory);
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    status: "true",
  });
  const columns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      id: 2,
      title: "Name",
      dataIndex: "product",
      key: "productName",
      render: (product) => product?.name,
      renderCsv: (product) => product?.name,
      tdClass: "whitespace-normal",
    },
    {
      id: 2,
      title: "Quantity",
      dataIndex: "productQuantity",
      key: "productQuantity",
    },
    {
      id: 3,
      title: "Sale Price",
      dataIndex: "productSalePrice",
      key: "productSalePrice",
    },
    {
      id: 4,
      title: "Purchase Price",
      dataIndex: "productPurchasePrice",
      key: "productPurchasePrice",
    },
    {
      id: 5,
      title: "Reorder Quantity",
      dataIndex: "reorderQuantity",
      key: "reorderQuantity",
    },
    {
      id: 6,
      title: "Purchase Tax",
      dataIndex: "productPurchaseTaxId",
      key: "productPurchaseTaxId",
    },
    {
      id: 7,
      title: "Sales Tax",
      dataIndex: "productSalesTaxId",
      key: "productSalesTaxId",
    },
    {
      id: 8,
      title: "Discount",
      dataIndex: "discountId",
      key: "discountId",
    },
    {
      id: 9,
      title: "Negative Sale",
      dataIndex: "isNegativeSale",
      key: "isNegativeSale",
    },
    {
      id: 10,
      title: "Expire Date",
      dataIndex: "expDate",
      key: "expDate",
      render: (expDate) => (expDate ? moment(expDate).format("ll") : "N/A"),
      renderCsv: (expDate) => (expDate ? moment(expDate).format("ll") : "N/A"),
    },
    {
      id: 4,
      title: "",
      key: "action",
      render: (item) => [
        {
          label: (
            <UserPrivateComponent permission={"update-Inventory"}>
              <UpdateInventory data={item} />
            </UserPrivateComponent>
          ),
          key: "edit",
        },

        {
          label: (
            <CommonDelete
              values={{
                id: item.id,
                status: item.status,
              }}
              title={item.status === "true" ? "Hide" : "Show"}
              deleteThunk={deleteInventory}
              loadThunk={loadAllInventoryPaginated}
              permission={"delete-Inventory"}
              query={pageConfig}
              className='bg-white text-black'
            />
          ),
          key: "delete",
        },
      ],

      csvOff: true,
    },
  ];
  const filters = [
    {
      key: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Show", value: "true" },
        { label: "Hide", value: "false" },
      ],
      className: "min-w-[85px] max-w-[150px]",
      popupClassName: "w-[100px]",
    },
  ];
  useEffect(() => {
    dispatch(loadAllInventoryPaginated(pageConfig));
  }, [dispatch, pageConfig]);

  return (
    <Card
      className='max-md:border-0 max-md:bg-white'
      bodyClass='max-md:p-0 '
      headClass='border-none'
      title={"Inventory"}
      extra={
        <CreateDrawer
          permission={"create-Inventory"}
          title={"Create Inventory"}
          width={35}
        >
          <AddStore />
        </CreateDrawer>
      }
    >
      <UserPrivateComponent permission={"readAll-Inventory"}>
        <TableComponent
          total={total}
          columns={columns}
          list={list}
          loading={loading}
          setPageConfig={setPageConfig}
          title={"Inventory"}
          filters={filters}
        />
      </UserPrivateComponent>
    </Card>
  );
}
