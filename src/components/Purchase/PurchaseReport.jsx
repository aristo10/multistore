import Button from "@/UI/Button";
import CSV from "@/UI/CSV";
import Card from "@/UI/Card";
import moment from "moment";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReportTable from "../CommonUi/ReportTable";
import PurchaseReportPrint from "../Invoice/Report/PurchaseReportPrint";
import PurchaseReportFilter from "./PurchaseReportFilter";

export default function PurchaseReport() {
  const [showTable, setShowTable] = useState(false);
  const [supplier, setSupplier] = useState(null);

  const { list, loading, information } = useSelector(
    (state) => state.purchases
  );
  const [pageConfig, setPageConfig] = useState({
    query: "report",
    startDate: moment().startOf("month").format("YYYY-MM-DD"),
    endDate: moment().endOf("month").format("YYYY-MM-DD"),
  });
  const columns = [
    {
      id: 1,
      title: "ID",
      key: "id",
      render: ({ id }) => <Link to={`/admin/purchase/${id}`}>{id}</Link>,
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
      title: "Supplier Name ",
      dataIndex: `supplier`,
      key: "supplierId",
      render: (supplier) => (
        <Link to={`/admin/supplier/${supplier?.id}`}>{supplier?.name}</Link>
      ),
      renderCsv: (supplier) => supplier?.name,
    },
    {
      id: 4,
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      id: 5,
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
    },

    {
      id: 7,
      title: "Paid Amount",
      dataIndex: "paidAmount",
      key: "paidAmount",
    },
    {
      id: 6,
      title: "Due Amount",
      dataIndex: "dueAmount",
      key: "dueAmount",
    },
  ];

  return (
    <div className='card card-custom mt-3 '>
      <div className='card-body'>
        <Card
          className='max-md:border-0 max-md:bg-white'
          bodyClass='max-md:p-0 '
          headClass='border-none'
          title={"Purchase Report"}
        >
          {!showTable ? (
            <PurchaseReportFilter
              pageConfig={pageConfig}
              setSupplier={setSupplier}
              setShowTable={setShowTable}
              setPageConfig={setPageConfig}
            />
          ) : (
            <>
              <div className='flex justify-between p-5 items-start '>
                <div>
                  <Button
                    onClick={() => setShowTable((prev) => !prev)}
                    className='bg-gray-500 text-white'
                  >
                    Generate Again
                  </Button>
                </div>
                <div className='flex px-5 gap-2 items-center '>
                  <PurchaseReportPrint
                    data={list}
                    title={"Purchase Report"}
                    pageConfig={pageConfig}
                    type={"print"}
                    btnName='Print'
                    info={information}
                    supplier={supplier}
                  />

                  <PurchaseReportPrint
                    data={list}
                    title={"Purchase Report"}
                    pageConfig={pageConfig}
                    info={information}
                    type={"download"}
                    btnName='Export PDF'
                    supplier={supplier}
                  />

                  <div>
                    <CSV
                      list={list}
                      columns={columns}
                      title={"Purchase Report"}
                      className={"bg-primary   h-auto py-2 "}
                      btnName={"Export CSV"}
                    />
                  </div>
                </div>
              </div>
              <ReportTable list={list} columns={columns} loading={loading} />
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
