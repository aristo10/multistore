import Button from "@/UI/Button";
import CSV from "@/UI/CSV";
import Card from "@/UI/Card";
import { stringShorter } from "@/utils/functions";
import { Tooltip } from "antd";
import moment from "moment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReportTable from "../CommonUi/ReportTable";
import AdjustReportPrint from "../Invoice/Report/AdjustReportPrint";
import AdjustReportFilter from "./AdjustReportFilter";

export default function AdJustReport() {
  const dispatch = useDispatch();
  const [showTable, setShowTable] = useState(false);

  const { list, loading } = useSelector((state) => state.adjustInventory);
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
      render: ({ id }) => (
        <Link to={`/admin/adjust-inventory/${id}`}>{id}</Link>
      ),
    },
    {
      title: "Type",
      dataIndex: "adjustType",
      key: "adjustType",
    },
    {
      id: 2,
      title: <Tooltip title='Total Increment Quantity'>{"Total I.Q."}</Tooltip>,
      dataIndex: "totalIncrementQuantity",
      key: "totalIncrementQuantity",
      render: (totalIncrementQuantity) => totalIncrementQuantity?.toFixed(2),
    },
    {
      id: 3,
      title: <Tooltip title='Total Increment Price'>{"Total I.P."}</Tooltip>,
      dataIndex: "totalIncrementPrice",

      key: "totalIncrementPrice",
      render: (totalIncrementPrice) => totalIncrementPrice?.toFixed(2),
    },
    {
      id: 4,
      title: <Tooltip title='Total Decrement Quantity'>{"Total D.Q."}</Tooltip>,
      dataIndex: "totalDecrementQuantity",
      key: "totalDecrementQuantity",
      render: (totalDecrementQuantity) => totalDecrementQuantity?.toFixed(2),
    },
    {
      id: 5,
      title: <Tooltip title='Total Decrement Price'>{"Total D.P."}</Tooltip>,
      dataIndex: "totalDecrementPrice",
      key: "totalDecrementPrice",
      render: (totalDecrementPrice) => totalDecrementPrice?.toFixed(2),
    },
    {
      id: 7,
      title: "Note",
      dataIndex: `note`,
      key: "note",
      render: (note) => stringShorter(note, 20),
    },
    {
      id: 8,
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => moment(date).format("ll"),
    },
  ];
  const column = [
    {
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      id: 2,
      title: "Total Increment Quantity",
      dataIndex: "totalIncrementQuantity",
      key: "totalIncrementQuantity",
      renderCsv: (totalIncrementQuantity) => totalIncrementQuantity?.toFixed(2),
    },
    {
      id: 3,
      title: "Total Increment Price",
      dataIndex: "totalIncrementPrice",
      key: "totalIncrementPrice",
      renderCsv: (totalIncrementPrice) => totalIncrementPrice?.toFixed(2),
    },
    {
      id: 4,
      title: "Total Decrement Quantity",
      dataIndex: "totalDecrementQuantity",
      key: "totalDecrementQuantity",

      renderCsv: (totalDecrementQuantity) => totalDecrementQuantity?.toFixed(2),
    },
    {
      id: 5,
      title: "Total Decrement Price",
      dataIndex: "totalDecrementPrice",
      key: "totalDecrementPrice",
      renderCsv: (totalDecrementPrice) => totalDecrementPrice?.toFixed(2),
    },
    {
      id: 7,
      title: "Note",
      dataIndex: `note`,
      key: "note",
      renderCsv: (note) => note,
    },
    {
      id: 8,
      title: "Date",
      dataIndex: "date",
      key: "date",
      renderCsv: (date) => moment(date).format("ll"),
    },
  ];

  return (
    <div className='card card-custom mt-3 '>
      <div className='card-body'>
        <Card
          className='max-md:border-0 max-md:bg-white'
          bodyClass='max-md:p-0 '
          headClass='border-none'
          title={"Adjust Report"}
        >
          {!showTable ? (
            <AdjustReportFilter
              setPageConfig={setPageConfig}
              pageConfig={pageConfig}
              setShowTable={setShowTable}
            />
          ) : (
            <>
              <div className='flex justify-between p-5 items-start '>
                <div>
                  <Button
                    onClick={() => setShowTable((prev) => !prev)}
                    className='bg-green-500 text-white'
                  >
                    Generate again
                  </Button>
                </div>
                <div className='flex px-5 gap-2 items-center '>
                  <AdjustReportPrint
                    data={list}
                    title={"Adjust Report"}
                    pageConfig={pageConfig}
                    type={"print"}
                    btnName='Print'
                  />
                  <AdjustReportPrint
                    data={list}
                    title={"Adjust Report"}
                    pageConfig={pageConfig}
                    type={"download"}
                    btnName='Export PDF'
                  />

                  <div>
                    <CSV
                      list={list?.allAdjustInvoice}
                      columns={column}
                      title={"Adjust Report"}
                      className={"bg-primary   h-auto py-2 "}
                      btnName={"Export CSV"}
                    />
                  </div>
                </div>
              </div>
              <ReportTable
                list={list?.allAdjustInvoice}
                columns={columns}
                loading={loading}
              />
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
