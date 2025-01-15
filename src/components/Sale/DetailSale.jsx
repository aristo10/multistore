/* eslint-disable react-refresh/only-export-components */
import Button from "@/UI/Button";
import Card from "@/UI/Card";
import List from "@/UI/List";
import Menu from "@/UI/Menu";
import Tabs, { Tab } from "@/UI/Tabs";
import useSaleEmailTemplate from "@/utils/EmailTemplate/useSaleEmailTemplate";
import { Drawer, Popover, Tag } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegPaperPlane } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  clearSale,
  loadSingleSale,
} from "../../redux/rtk/features/sale/saleSlice";
import ReturnSaleInvoiceList from "../Card/saleInvoice/ReturnSaleInvoiceList";
import SaleProductListCard from "../Card/saleInvoice/SaleProductListCard";
import TransactionSaleList from "../Card/saleInvoice/TransactionSaleList";
import NewSaleInvoice from "../Invoice/NewSaleInvoice";
import NewSalePackingInvoice from "../Invoice/NewSalePackingInvoice";
import PosPrint from "../Invoice/PosPrint";
import Loader from "../Loader/Loader";
import AddTransaction from "../Transaction/AddTransaction";
import ChangeOrderStatus from "./ChangeOrderStatus";
import SendSaleInvoice from "./SendSaleInvoice";

// calculate due date over from current date
export function dateDiffChecker(date) {
  const invoiceDueDate = moment(date);
  const currentDate = moment();
  if (currentDate > invoiceDueDate) {
    return "Overdue";
  }
}

const DetailSale = () => {
  const { id } = useParams();
  const [sendEmail, setSendEmail] = useState(false);
  const [visibleTransactionCreate, setVisibleTransactionCreate] =
    useState(false);

  const dispatch = useDispatch();
  const sale = useSelector((state) => state?.sales?.sale);
  const { subject, body } = useSaleEmailTemplate(sale);

  const {
    status,
    totalPaidAmount,
    totalReturnAmount,
    instantPaidReturnAmount,
    dueAmount,
    singleSaleInvoice,
    returnSaleInvoice,
    transactions,
  } = sale || {};

  const {
    id: singleSaleId,
    customer,
    totalAmount,
    profit,
    totalDiscountAmount,
    totalTaxAmount,
    note,
    termsAndConditions,
    dueDate,
    user,
    createdAt,
    orderStatus,
    store,
  } = singleSaleInvoice || {};

  const calculatedTotalAmount = (totalAmount || 0) + (totalDiscountAmount || 0);
  const calculatedGrandTotal =
    (totalAmount || 0) +
    (totalTaxAmount || 0) -
    (totalReturnAmount || 0) +
    (instantPaidReturnAmount || 0);

  useEffect(() => {
    dispatch(loadSingleSale(id));
    return () => {
      dispatch(clearSale());
    };
  }, [id, dispatch]);

  const customerEmail = singleSaleInvoice?.customer?.email;

  return (
    <>
      {singleSaleInvoice ? (
        <>
          <div className='flex gap-2 md:gap-4'>
            <Card className='w-2/3' bodyClass={"p-0"}>
              <div className='flex justify-between mx-2 py-2 border-b items-center'>
                <div className='flex gap-3'>
                  <div className={"text-end "}>
                    <NewSaleInvoice sale={sale} title={"Sale Invoice"} />
                  </div>
                  <Button
                    className='flex-row-reverse'
                    color='gray'
                    icon={<FaRegPaperPlane size={15} />}
                    onClick={() => setSendEmail(true)}
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
                                to={`/admin/payment/customer/${singleSaleId}`}
                                state={{ dueAmount: dueAmount }}
                              >
                                Payment
                              </Link>
                            ),
                          },
                          {
                            key: "status",
                            label: <ChangeOrderStatus saleId={singleSaleId} />,
                          },
                          {
                            key: "2",
                            label: (
                              <Link to={`/admin/sale/return/${id}`}>
                                Return
                              </Link>
                            ),
                          },
                          {
                            key: "3",
                            label: singleSaleInvoice && (
                              <NewSalePackingInvoice
                                title={"packing slip"}
                                data={singleSaleInvoice}
                              />
                            ),
                          },
                          {
                            key: "4",
                            label: <PosPrint data={sale} />,
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
              {sendEmail ? (
                <div>
                  <SendSaleInvoice
                    body={body}
                    subject={subject}
                    setSendEmail={setSendEmail}
                    customerEmail={customerEmail}
                    invoice={singleSaleInvoice}
                  />
                </div>
              ) : (
                <Tabs className='mt-4'>
                  <Tab label='Products'>
                    <SaleProductListCard
                      list={singleSaleInvoice.saleInvoiceProduct}
                    />
                  </Tab>
                  <Tab label='Return products'>
                    <ReturnSaleInvoiceList list={returnSaleInvoice} />
                  </Tab>
                  <Tab label='Transactions'>
                    <TransactionSaleList list={transactions} />
                  </Tab>
                </Tabs>
              )}
            </Card>
            <div className='w-1/3 flex flex-col gap-2 md:gap-4'>
              <Card
                title={
                  <div className='flex items-center'>
                    <span className='font-normal'>
                      Invoice No{" "}
                      <span className='font-semibold'>#{singleSaleId}</span>
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
                        label: "Due Date",
                        value: dueDate ? (
                          <div className='flex gap-1 items-center'>
                            {moment(dueDate).format("ll")}
                            {dateDiffChecker(dueDate) && (
                              <Tag className='text-xs' color='red'>
                                Overdue
                              </Tag>
                            )}
                          </div>
                        ) : (
                          "N/A"
                        ),
                      },
                      {
                        label: "Delivery",
                        value: (
                          <Tag
                            color={
                              orderStatus === "RECEIVED" ? "success" : "orange"
                            }
                          >
                            {orderStatus}
                          </Tag>
                        ),
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
                        label: "Sales Person",
                        value: user ? (
                          <Link
                            to={`/admin/hrm/staff/${singleSaleInvoice.userId}`}
                          >
                            {`${user.username}`}
                          </Link>
                        ) : (
                          "N/A"
                        ),
                      },
                      {
                        label: "Store",
                        value: store ? store?.name : "N/A",
                      },
                    ]}
                  />
                </>
              </Card>
              <Card title='Payment Details'>
                <List
                  labelClassName='w-[40%]'
                  list={[
                    {
                      label: "Profit",
                      value: profit ? Number(profit).toFixed(2) : 0,

                      valueClass:
                        profit < 0
                          ? "text-red-500 font-bold"
                          : "text-green-500 font-bold",
                    },
                    {
                      label: "Sales Commission",
                      value: singleSaleInvoice.saleCommission
                        ? singleSaleInvoice.saleCommission.toFixed(2)
                        : 0,
                      className: "border-b pb-2",
                    },
                    {
                      label: "Total Amount",
                      value: Number(calculatedTotalAmount).toFixed(2),
                    },
                    {
                      label: "Discount",
                      value: (
                        <div className="before:content-['-'] relative before:absolute before:text-red-500 before:font-bold before:-left-3 before:top-0">
                          {totalDiscountAmount
                            ? Number(totalDiscountAmount).toFixed(2)
                            : 0}
                        </div>
                      ),
                      hidden: singleSaleInvoice?.totalDiscountAmount === 0,
                    },
                    {
                      label: "Total Tax",
                      value: (
                        <div className="before:content-['+'] relative before:absolute before:text-green-500 before:font-bold before:-left-3 before:top-0">
                          {totalTaxAmount
                            ? Number(totalTaxAmount).toFixed(2)
                            : 0}
                        </div>
                      ),
                      hidden: totalTaxAmount === 0,
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
                              Make Refund
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
                        <div className="before:content-['='] relative before:absolute before:text-green-500 before:font-bold before:-left-3 before:top-0">
                          {totalAmount ? calculatedGrandTotal.toFixed(2) : 0}
                        </div>
                      ),
                      className: "border-t pt-2",
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
              <Card title='Customer Details'>
                <List
                  labelClassName='w-[40%]'
                  list={[
                    {
                      label: "Name",
                      value: (
                        <Link to={`/admin/customer/${customer?.id}`}>
                          {customer?.username}
                        </Link>
                      ),
                    },
                    {
                      label: "Phone",
                      value: customer?.phone,
                    },
                    {
                      label: "Email",
                      value: customer?.email || "N/A",
                    },
                    {
                      label: "Address",
                      value: customer?.address,
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
                    {
                      label: "Terms and Conditions",
                      value: termsAndConditions,
                      className: "flex-col gap-1",
                    },
                  ]}
                />
              </Card>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
      <Drawer
        title={`Make Refund`}
        width={"40%"}
        onClose={() => setVisibleTransactionCreate(false)}
        open={visibleTransactionCreate}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        <AddTransaction
          preFieldValue={{
            relatedId: singleSaleInvoice?.id,
            type: "sale_return",
          }}
        />
      </Drawer>
    </>
  );
};

export default DetailSale;
