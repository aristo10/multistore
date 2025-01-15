import Button from "@/UI/Button";
import Card from "@/UI/Card";
import List from "@/UI/List";
import Menu from "@/UI/Menu";
import Tabs, { Tab } from "@/UI/Tabs";
import usePurchaseEmailTemplate from "@/utils/EmailTemplate/usePurchaseEmailTemplate";
import { Drawer, Popover, Tag } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegPaperPlane } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  clearPurchase,
  loadSinglePurchase,
} from "../../redux/rtk/features/purchase/purchaseSlice";
import PurchaseProductListCard from "../Card/purchaseInvoice/PurchaseProductListCard";
import ReturnPurchaseInvoiceList from "../Card/purchaseInvoice/ReturnPurchaseInvoiceList";
import TransactionPurchaseList from "../Card/purchaseInvoice/TransactionPurchaseList";
import NewPurchaseInvoice from "../Invoice/NewPurchaseInvoice";
import Loader from "../Loader/Loader";
import AddTransaction from "../Transaction/AddTransaction";
import SendPurchaseInvoice from "./SendPurchaseInvoice";

const DetailsPurchase = () => {
  const { id } = useParams();
  const [sendForm, setSendForm] = useState(false);
  const [visibleTransactionCreate, setVisibleTransactionCreate] =
    useState(false);

  const dispatch = useDispatch();
  const purchase = useSelector((state) => state.purchases.purchase);
  const { subject, body } = usePurchaseEmailTemplate(purchase);

  const {
    status,
    totalPaidAmount,
    totalReturnAmount,
    instantPaidReturnAmount,
    dueAmount,
    singlePurchaseInvoice,
    returnPurchaseInvoice,
    transactions,
  } = purchase || {};

  const {
    totalAmount,
    totalTax,
    purchaseInvoiceProduct,
    store,
    supplier,
    note,
    createdAt,
    id: purchaseId,
  } = singlePurchaseInvoice || {};

  const calculatedGrandTotal =
    (totalAmount || 0) +
    (totalTax || 0) +
    (instantPaidReturnAmount || 0) -
    (totalReturnAmount || 0);

  useEffect(() => {
    dispatch(loadSinglePurchase(id));
    return () => {
      dispatch(clearPurchase());
    };
  }, [dispatch, id]);

  return (
    <div>
      <div>
        {singlePurchaseInvoice ? (
          <div className='flex gap-2 md:gap-4'>
            <Card className='w-2/3' bodyClass={"p-0"}>
              <div className='flex justify-between mx-2 py-2 border-b items-center'>
                <div className=' flex gap-3'>
                  <div>
                    <NewPurchaseInvoice
                      title={"Purchase Invoice"}
                      data={purchase}
                    />
                  </div>
                  <Button
                    className='flex-row-reverse'
                    color='gray'
                    icon={<FaRegPaperPlane size={15} />}
                    onClick={() => {
                      setSendForm(true);
                    }}
                  >
                    Send
                  </Button>

                  <Popover
                    content={
                      <Menu
                        items={[
                          {
                            key: "1",
                            label: (
                              <Link
                                to={`/admin/payment/supplier/${purchaseId}`}
                                state={{ dueAmount: dueAmount }}
                              >
                                Payment
                              </Link>
                            ),
                          },
                          {
                            key: "status",
                            label: (
                              <Link to={`/admin/purchase/return/${id}`}>
                                Return Product{" "}
                              </Link>
                            ),
                          },
                        ]}
                      />
                    }
                    placement='bottomRight'
                    arrow={false}
                    trigger='click'
                  >
                    <Button
                      color={"gray"}
                      icon={<BsThreeDotsVertical size={15} />}
                      className='  px-3'
                    ></Button>
                  </Popover>
                </div>
              </div>
              {sendForm ? (
                <div>
                  <SendPurchaseInvoice
                    subject={subject}
                    body={body}
                    setSendForm={setSendForm}
                    supplierEmail={supplier?.email}
                    invoice={singlePurchaseInvoice}
                  />
                </div>
              ) : (
                <Tabs className='mt-4'>
                  <Tab label='Products'>
                    <PurchaseProductListCard list={purchaseInvoiceProduct} />
                  </Tab>
                  <Tab label='Return products'>
                    <ReturnPurchaseInvoiceList list={returnPurchaseInvoice} />
                  </Tab>
                  <Tab label='Transactions'>
                    <TransactionPurchaseList list={transactions} />
                  </Tab>
                </Tabs>
              )}
            </Card>
            <div className='w-1/3 flex flex-col gap-2'>
              <Card
                title={
                  <div className='flex items-center'>
                    <span className='font-normal'>
                      Invoice No{" "}
                      <span className='font-semibold'>#{purchaseId}</span>
                    </span>
                  </div>
                }
              >
                <>
                  <List
                    labelClassName='w-[40%]'
                    list={[
                      {
                        label: "Invoice Date",
                        value: moment(createdAt).format("ll"),
                      },

                      {
                        label: "Payment",
                        value: (
                          <Tag color={status === "PAID" ? "green" : "red"}>
                            {status}
                          </Tag>
                        ),
                      },
                      {
                        label: "Store",
                        value: store?.name,
                      },
                    ]}
                  />
                </>
              </Card>

              <Card title='Payment Details '>
                <List
                  list={[
                    {
                      label: "Total Amount",
                      value: singlePurchaseInvoice?.totalAmount
                        ? Number(singlePurchaseInvoice.totalAmount).toFixed(2)
                        : 0,
                    },

                    {
                      label: "Total Tax",
                      value: (
                        <div className="before:content-['+'] relative before:absolute before:text-green-500 before:font-bold before:-left-3 before:top-0">
                          {singlePurchaseInvoice?.totalTax
                            ? Number(singlePurchaseInvoice.totalTax).toFixed(2)
                            : 0}
                        </div>
                      ),
                      hidden: singlePurchaseInvoice?.totalTaxAmount === 0,
                    },

                    {
                      label: "Return Product Value",
                      value: (
                        <div className="before:content-['-'] relative before:absolute before:text-red-500 before:font-bold before:-left-3 before:top-0">
                          {totalReturnAmount
                            ? Number(totalReturnAmount).toFixed(2)
                            : 0}
                        </div>
                      ),
                      hidden: Boolean(
                        totalReturnAmount === 0 && instantPaidReturnAmount === 0
                      ),
                    },
                    {
                      label: "Return Amount",
                      value: (
                        <div className="before:content-['+'] relative before:absolute before:text-green-500 before:font-bold before:-left-3 before:top-0">
                          {instantPaidReturnAmount
                            ? Number(instantPaidReturnAmount).toFixed(2)
                            : 0}
                          {totalReturnAmount != instantPaidReturnAmount && (
                            <Button
                              onClick={() => setVisibleTransactionCreate(true)}
                              className='absolute right-4 -top-[23px] inline-block w-auto min-w-[100px] border-blue-400 border-[1.5px] rounded px-3'
                            >
                              Get Refund
                            </Button>
                          )}
                        </div>
                      ),
                      hidden: Boolean(
                        totalReturnAmount === 0 && instantPaidReturnAmount === 0
                      ),
                    },
                    {
                      label: "Grand Total",
                      value: (
                        <div className="before:content-['='] relative before:absolute before:text-blue-500 before:font-bold before:-left-3 before:top-0">
                          {calculatedGrandTotal.toFixed(2)}
                        </div>
                      ),
                      className: "border-t pt-1",
                    },
                    {
                      label: "Paid Amount",
                      value: (
                        <div className="before:content-['-'] relative before:absolute before:text-red-500 before:font-bold before:-left-3 before:top-0">
                          {totalPaidAmount
                            ? Number(totalPaidAmount).toFixed(2)
                            : 0}
                        </div>
                      ),
                      className: "border-b pb-1",
                    },
                    {
                      label: "Due Amount",
                      value: dueAmount ? Number(dueAmount).toFixed(2) : 0,
                    },
                  ]}
                />
              </Card>
              <Card title='Supplier Details'>
                <List
                  labelClassName='w-[40%]'
                  list={[
                    {
                      label: "Name",
                      value: (
                        <Link to={`/admin/supplier/${supplier.id}`}>
                          {supplier.name}
                        </Link>
                      ),
                    },
                    {
                      label: "Phone",
                      value: supplier.phone,
                    },
                    {
                      label: "Address",
                      value: supplier.address,
                    },
                  ]}
                />
              </Card>
              <Card>
                <List
                  labelClassName='w-[40%] font-bold'
                  list={[
                    {
                      label: "Note",
                      value: note,
                      className: "flex-col gap-1",
                    },
                  ]}
                />
              </Card>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
      <Drawer
        title={`Get Refund`}
        width={"40%"}
        onClose={() => setVisibleTransactionCreate(false)}
        open={visibleTransactionCreate}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        <AddTransaction
          preFieldValue={{
            relatedId: purchaseId,
            type: "purchase_return",
          }}
        />
      </Drawer>
    </div>
  );
};

export default DetailsPurchase;
