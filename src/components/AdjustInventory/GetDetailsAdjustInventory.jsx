import Card from "@/UI/Card";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { clearAdjustInventory, loadSingleAdjustInventory } from "../../redux/rtk/features/adjustInventory/adjustInventorySlice";
import Loader from "../Loader/Loader";
import { Tag } from "antd";
import Tabs, { Tab } from "@/UI/Tabs";
import List from "@/UI/List";
import AdjustProductList from "./AdjustProductList";
import AdjustTransaction from "./AdjustTransaction";
import SingleAdjustPrint from "../Invoice/Report/SingleAdjustPrint";

export default function GetDetailsAdjustInventory() {
  const dispatch = useDispatch();
  const { id } = useParams("id");
  const { adjustInventory, loading } = useSelector(
    (state) => state.adjustInventory
  );

  const columns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      id: 2,
      title: "Product",
      dataIndex: "product",
      key: "product",
      render: (product) => product.name,
    },
    {
      id: 3,
      title: "Adjust Quantity",
      dataIndex: "adjustQuantity",
      key: "adjustQuantity",
    },
    {
      id: 4,
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD/MM/YYYY"),
    },
  ];

  const transactionColumns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => <Link to={`/admin/transaction/${id}`}>{id}</Link>,
      renderCsv: (id) => id,
    },
    {
      id: 2,
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => moment(date).format("ll"),
      renderCsv: (date) => moment(date).format("ll"),
    },

    {
      id: 3,
      title: "Debit Account",
      dataIndex: "debit",
      key: "debit",
      render: (debit) => debit?.name,
      renderCsv: (debit) => debit?.name,
    },

    {
      id: 4,
      title: "Credit Account",
      dataIndex: "credit",
      key: "credit",
      render: (credit) => credit?.name,
      renderCsv: (credit) => credit?.name,
    },

    {
      id: 5,
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      responsive: ["md"],
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      id: 6,
      title: "Particulars",
      dataIndex: "particulars",
      key: "particulars",
    },
  ];

  useEffect(() => {
    dispatch(loadSingleAdjustInventory(id));
    return () => {
      dispatch(clearAdjustInventory());
    };
  }, [dispatch, id]);
 
  return (
    <>
      {adjustInventory ? (
          <div className="flex gap-2 md:gap-4">
          <Card className="w-2/3" bodyClass={"p-0"}>
            <div className="flex justify-between mx-2 py-2 border-b items-center">
              <div className="flex gap-3">
                <div className={"text-end "}>
                  {adjustInventory && (
                    <SingleAdjustPrint data={adjustInventory?.adjustInvoice}
                    title={"Adjust Invoice"}
                    type={"print"}
                    btnName="Print" />
                  )}
                </div>
                
              </div>
            </div>
              <Tabs className="mt-4">
                <Tab label="Products">
                  <AdjustProductList
                    list={adjustInventory?.adjustInvoice?.adjustInvoiceProduct}
                  />
                </Tab>
                
                <Tab label="Transactions">
                  <AdjustTransaction list={adjustInventory?.transaction
} />
                </Tab>
              </Tabs>
        
          </Card>
          <div className="w-1/3 flex flex-col gap-2 md:gap-4">
            <Card
              title={
                <div className="flex items-center">
                  <span className="font-normal">
                    Invoice No{" "}
                    <span className="font-semibold">
                      #{adjustInventory?.adjustInvoice?.id}
                    </span>
                  </span>
                </div>
              }
            >
              <>
                <List
                  labelClassName="w-[40%]"
                  list={[
                    {
                      label: "Invoice Date",
                      value: moment(adjustInventory?.adjustInvoice?.date).format("ll"),
                    },

                    {
                      label: "Adjust Type",
                      value: (
                        <Tag
                          color={
                            adjustInventory?.adjustInvoice?.adjustType === "INCREMENT"
                              ? "green"
                              : "red"
                          }
                        >
                          {adjustInventory?.adjustInvoice?.adjustType}
                        </Tag>
                      ),
                    },
                    {
                      label: "Adjust By ",
                      value: adjustInventory?.adjustInvoice?.user?.username
                    },
                   
                  ]}
                />
              </>
            </Card>
            <Card title="Adjust Details">
              <List
                labelClassName="w-[40%]"
                list={[
                  {
                    label: "Increment Quantity",
                    value: <div className="before:content-['+'] relative before:absolute before:text-green-500 before:font-bold before:-left-3 before:top-0">{ adjustInventory?.adjustInvoice?.totalIncrementQuantity
                      ? Number(adjustInventory?.adjustInvoice?.totalIncrementQuantity)
                      : 0}</div>,
                    className: " pb-2",
                  
                  },
                  {
                    label: "Decrement Quantity",
                    value:<div className="before:content-['-'] relative before:absolute before:text-red-500 before:font-bold before:-left-3 before:top-0"> {adjustInventory?.adjustInvoice?.totalDecrementQuantity
                      ? Number(adjustInventory?.adjustInvoice?.totalDecrementQuantity)
                      : 0}</div>,
                    className: "border-b pb-2",
                  
                  },
                  {
                    label: "Total Adjust Amount",
                    value: adjustInventory?.adjustInvoice?.totalAdjustPrice
                      ? Number(adjustInventory?.adjustInvoice?.totalAdjustPrice).toFixed(2)
                      : 0,
                    className: " pb-2",
                  
                  },
                 
                ]}
              />
            </Card>
            
            <Card>
              <List
                labelClassName="w-[40%] font-bold"
                list={[
                  {
                    label: "Note",
                    value:  adjustInventory?.adjustInvoice?.note,
                    className: "flex-col gap-1",
                  },
                
                ]}
              />
            </Card>
          </div>
        </div>
      ) : (
        <Loader></Loader>
      )}
    </>
  );
}
