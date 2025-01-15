import Button from "@/UI/Button";
import Card from "@/UI/Card";
import List from "@/UI/List";
import Table from "@/UI/Table";
import Tabs, { Tab } from "@/UI/Tabs";
import { decodeHtmlEntity } from "@/utils/functions";
import useCurrency from "@/utils/useCurrency";
import moment from "moment";
import { useEffect, useState } from "react";
import { FaRegPaperPlane } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { loadSinglePurchaseReorder } from "../../redux/rtk/features/purchaseOrder/purchaseOrderSlice";
import NewPurchaseOrderInvoice from "../Invoice/NewPurchaseOrderInvoice";
import Loader from "../Loader/Loader";
import SendPurchaseOrder from "./SendPurchaseOrder";

export default function SinglePurchase() {
  const { id } = useParams("id");
  const dispatch = useDispatch();
  const [sendForm, setSendForm] = useState(false);
  const { singlePurchase } = useSelector((state) => state.purchaseOrder);
  const companyInfo = useSelector((state) => state?.setting?.data) || null;

  useEffect(() => {
    dispatch(loadSinglePurchaseReorder(id));
  }, [dispatch, id]);

  const columns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "productId",
      key: "id",
    },

    {
      id: 2,
      title: "Name",
      dataIndex: "product",
      key: "name",
      render: (item) => (
        <Link to={`/admin/product/${item?.id}`}>{item.name} </Link>
      ),
      tdClass: "whitespace-normal",
    },
    {
      id: 4,
      title: "Sku",
      dataIndex: "product",
      key: "sku",
      render: (item) => item.sku,
    },

    {
      id: 5,
      title: "Quantity",
      dataIndex: "reorderProductQuantity",
      key: "productQuantity",
    },
    {
      id: 3,
      title: "Date",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("ll"),
    },
  ];

  const subject = `Purchase Order Request - Order ID #${singlePurchase?.reorderInvoiceId} `;
  const body = `
  <div>
        <p>I hope this message finds you well.</p>
  </div>
<br>
   <p>Please find attached a purchase order detailing the required products and quantities. We kindly request your confirmation of product availability and pricing.
    </p>
    <p>Best Regards,</p>
<br>
    <div>
        <strong>${companyInfo?.companyName}</strong><br>
        ${companyInfo?.phone}<br>
        ${companyInfo?.email}
    </div>`;
  return (
    <>
      {singlePurchase ? (
        <div className='flex gap-2 md:gap-4'>
          <Card className='w-2/3' bodyClass={"p-0"}>
            <div className='flex justify-between mx-2 py-2 border-b items-center'>
              <div className=' flex gap-3'>
                <div>
                  {singlePurchase && (
                    <NewPurchaseOrderInvoice
                      data={singlePurchase}
                      title={"Purchase Order"}
                    />
                  )}
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
              </div>
            </div>
            {!sendForm ? (
              <Tabs className='mt-4'>
                <Tab label='Products'>
                  <div className='m-4'>
                    <Table
                      columns={columns}
                      data={singlePurchase?.productList}
                    />
                  </div>
                </Tab>
              </Tabs>
            ) : (
              <SendPurchaseOrder
                setSendForm={setSendForm}
                invoice={singlePurchase}
                subject={subject}
                body={body}
                Invoice={singlePurchase?.reorderInvoiceId}
              />
            )}
          </Card>
          <div className='w-1/3 flex flex-col gap-2'>
            <Card
              title={
                <div className='flex items-center'>
                  <span className='font-normal'>
                    Purchase Order No{" "}
                    <span className='font-semibold'>#{id}</span>
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
                      value: moment(singlePurchase.createdAt).format("ll"),
                    },
                    {
                      label: "Store",
                      value: singlePurchase.store?.name,
                    },
                  ]}
                />
              </>
            </Card>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
