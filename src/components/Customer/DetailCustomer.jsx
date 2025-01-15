import { EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  clearCustomer,
  loadSingleCustomer,
} from "../../redux/rtk/features/customer/customerSlice";

import Button from "@/UI/Button";
import Card from "@/UI/Card";
import List from "@/UI/List";
import Menu from "@/UI/Menu";
import Tabs, { Tab } from "@/UI/Tabs";
import { Popover } from "antd";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegPaperPlane } from "react-icons/fa";
import CustomerInvoiceList from "../Card/CustomerInvoiceList";
import Loader from "../Loader/Loader";
import CustomerReturnInvoiceList from "./ListCard/CustomerReturnInvoiceList";
import CustomerTransactionList from "./ListCard/CustomerTransactionList";
import SendEmail from "./SendEmail";
import NewCustomerDetails from "../Invoice/NewCustomerDetails";

const DetailCustomer = () => {
  const { id } = useParams();

  //dispatch
  const dispatch = useDispatch();
  const [sendForm, setSendForm] = useState(false);
  const customer = useSelector((state) => state.customers.customer);
  useEffect(() => {
    dispatch(loadSingleCustomer(id));
    return () => {
      dispatch(clearCustomer());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      {customer ? (
        <div className='flex gap-2 md:gap-4'>
          <Card className='w-2/3' bodyClass={"p-0"}>
            <div className='flex justify-between mx-2 py-2 border-b items-center'>
              <div className=' flex gap-3'>
                <div>
                  <NewCustomerDetails
                        title={"Customer Invoice List"}
                        data={customer}
                      />
                </div>
                <Button
                  className='flex-row-reverse'
                  color='gray'
                  icon={<FaRegPaperPlane size={15} />}
                  onClick={() => setSendForm(true)}
                >
                  Send
                </Button>

                <Popover
                  content={
                    <Menu
                      items={[
                        {
                          key: "status",
                          label: (
                            <Link
                              className='flex items-center gap-2'
                              to={`/admin/customer/${customer?.id}/update`}
                              state={{ data: customer }}
                            >
                              <EditOutlined />
                              Edit
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

            {!sendForm ? (
              <Tabs className='mt-4'>
                <Tab
                  label={
                    <span>
                      Invoice{" "}
                      <span className='ml-2 rounded-full bg-slate-300 text-slate-700 px-1'>
                        {customer?.totalSaleInvoice}
                      </span>
                    </span>
                  }
                >
                  <CustomerInvoiceList
                    list={customer?.saleInvoice}
                    linkTo='/admin/sale'
                  />
                </Tab>
                <Tab
                  label={
                    <span>
                      Return Invoice{" "}
                      <span className='ml-2 rounded-full bg-slate-300 text-slate-700 px-1'>
                        {customer?.totalReturnSaleInvoice}
                      </span>
                    </span>
                  }
                >
                  <CustomerReturnInvoiceList
                    list={customer?.returnSaleInvoice}
                  />
                </Tab>
                <Tab label='Transactions'>
                  <CustomerTransactionList list={customer?.allTransaction} />
                </Tab>
              </Tabs>
            ) : (
              <SendEmail setSendEmail={setSendForm} data={customer} />
            )}
          </Card>
          <div className='w-1/3 flex flex-col gap-2 md:gap-4'>
            <Card title={"Customer Details"}>
              <List
                labelClassName='w-[30%]'
                list={[
                  {
                    label: "Name",
                    value: customer?.username,
                  },
                  {
                    label: "Phone",
                    value: customer?.phone,
                  },
                  {
                    label: "Email",
                    value: customer?.email,
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
                labelClassName='w-[30%]'
                list={[
                  {
                    label: "Total Amount",
                    value: customer?.totalAmount
                      ? Number(customer.totalAmount).toFixed(2)
                      : 0,
                  },
                  {
                    label: "Return Amount",
                    value: (
                      <div className="before:content-['-'] relative before:absolute before:text-red-500 before:font-bold before:-left-3 before:top-0">
                        {customer?.totalReturnAmount}
                      </div>
                    ),
                  },
                  {
                    label: "Paid Amount",
                    value: (
                      <div className="before:content-['-'] relative before:absolute before:text-red-500 before:font-bold before:-left-3 before:top-0">
                        {customer?.totalPaidAmount}
                      </div>
                    ),
                    className: "border-b pb-1",
                  },
                  {
                    label: "Due Amount",
                    value: customer?.dueAmount,
                  },
                ]}
              />
            </Card>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default DetailCustomer;
