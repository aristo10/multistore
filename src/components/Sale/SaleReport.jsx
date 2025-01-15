import Button from "@/UI/Button";
import CSV from "@/UI/CSV";
import Card from "@/UI/Card";
import moment from "moment";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReportTable from "../CommonUi/ReportTable";
import SaleReportPrint from "../Invoice/Report/SaleReportPrint";
import SaleReportFilter from "./SaleReportFilter";

export default function SaleReport() {
  const [showTable, setShowTable] = useState(false);
  const { list, loading, info } = useSelector((state) => state.sales);
  const [pageConfig, setPageConfig] = useState({
    query: "report",
    startDate: moment().startOf("month").format("YYYY-MM-DD"),
    endDate: moment().endOf("month").format("YYYY-MM-DD"),
    salePerson: null,
    customer: null,
  });
  const columns = [
    {
      id: 1,
      title: "Invoice No",
      dataIndex: "id",
      key: "id",
      render: (name, { id }) => <Link to={`/admin/sale/${id}`}>{id}</Link>,
    },
    {
      id: 2,
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => moment(date).format("ll"),
    },
    {
      id: 3,
      title: "Customer Name ",
      dataIndex: `customer`,
      key: "customerId",
      render: (customer) => (
        <Link to={`/admin/customer/${customer?.id}`}>{customer?.username}</Link>
      ),
    },

    {
      id: 4,
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (totalAmount) => Number(totalAmount).toFixed(2),
    },
    {
      id: 5,
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (discount) => Number(discount).toFixed(2),
    },

    {
      id: 7,
      title: "Paid Amount",
      dataIndex: "paidAmount",
      key: "paidAmount",
      render: (paidAmount) => Number(paidAmount).toFixed(2),
      responsive: ["md"],
    },
    {
      id: 6,
      title: "Due Amount",
      dataIndex: "dueAmount",
      key: "dueAmount",
      render: (dueAmount) => Number(dueAmount).toFixed(2),
      responsive: ["md"],
    },

    //Update Supplier Name here

    {
      id: 8,
      title: "Profit",
      dataIndex: "profit",
      key: "profit",
      render: (profit) => Number(profit).toFixed(2),
      responsive: ["md"],
    },
    {
      id: 9,
      title: "Sale Person",
      dataIndex: "user",
      key: "user",
      render: (user) => (
        <Link to={`/admin/hrm/staff/${user?.id}`}>{user?.username}</Link>
      ),
      responsive: ["md"],
    },
  ];

  const column = [
    {
      id: 2,
      title: "Date",
      dataIndex: "date",
      key: "date",
      renderCsv: (date) => moment(date).format("ll"),
    },
    {
      id: 1,
      title: "Invoice No",
      dataIndex: "id",
      key: "id",
      renderCsv: (id) => id,
    },

    {
      id: 3,
      title: "Staff ",
      dataIndex: `user`,
      key: "staff",
      renderCsv: (user) => user?.username,
    },
    {
      id: 5,
      title: "Product",
      dataIndex: "saleInvoiceProduct",
      key: "saleInvoiceProduct",
      renderCsv: (saleInvoiceProduct) =>
        saleInvoiceProduct.length > 0
          ? saleInvoiceProduct.map((p) => p?.product?.name)
          : "-",
    },
    {
      id: 4,
      title: "QTY",
      dataIndex: "saleInvoiceProduct",
      key: "totalAmount",
      renderCsv: (saleInvoiceProduct) =>
        saleInvoiceProduct.length > 0
          ? saleInvoiceProduct.map((p) => p?.productQuantity)
          : 0,
    },
    {
      id: 4,
      title: "Total ",
      dataIndex: "totalAmount",
      key: "totalAmount",
      renderCsv: (totalAmount) => Number(totalAmount).toFixed(2),
    },
    {
      id: 5,
      title: "Discount",
      dataIndex: "totalDiscountAmount",
      key: "discount",
      renderCsv: (discount) => Number(discount).toFixed(2),
    },

    {
      id: 7,
      title: "Paid Amount",
      dataIndex: "paidAmount",
      key: "paidAmount",
      renderCsv: (paidAmount) => Number(paidAmount).toFixed(2),
    },
    {
      id: 6,
      title: "Due Amount",
      dataIndex: "dueAmount",
      key: "dueAmount",
      renderCsv: (dueAmount) => Number(dueAmount).toFixed(2),
    },

    {
      id: 8,
      title: "Profit",
      dataIndex: "profit",
      key: "profit",
      renderCsv: (profit) => Number(profit).toFixed(2),
    },
  ];

  return (
    <div className='card card-custom mt-3 '>
      <div className='card-body'>
        <Card
          className='max-md:border-0 max-md:bg-white'
          bodyClass='max-md:p-0 '
          headClass='border-none'
          title={"Sale Report"}
        >
          {!showTable ? (
            <SaleReportFilter
              setPageConfig={setPageConfig}
              pageConfig={pageConfig}
              setShowTable={setShowTable}
            />
          ) : (
            <div className='flex justify-between p-5 items-start '>
              <div>
                <Button
                  onClick={() => setShowTable((prev) => !prev)}
                  className='bg-green-500 text-white'
                >
                  Generate Again
                </Button>
              </div>
              <div className='flex px-5 gap-2 items-center '>
                <SaleReportPrint
                  data={list}
                  info={info}
                  saleInfo={pageConfig}
                  title={"Sale Report"}
                  pageConfig={pageConfig}
                  type={"print"}
                  btnName='Print'
                />

                <SaleReportPrint
                  data={list}
                  saleInfo={pageConfig}
                  title={"Sale Report"}
                  info={info}
                  pageConfig={pageConfig}
                  type={"download"}
                  btnName='Export PDF'
                />

                <div>
                  <CSV
                    list={list}
                    columns={column}
                    title={"Sale Report"}
                    className={"bg-primary"}
                    btnName={"Export CSV"}
                  />
                </div>
              </div>
            </div>
          )}

          {showTable && (
            <ReportTable list={list} columns={columns} loading={loading} />
          )}
        </Card>
      </div>
    </div>
  );
}
