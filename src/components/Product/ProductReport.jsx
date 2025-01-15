import Button from "@/UI/Button";
import CSV from "@/UI/CSV";
import Card from "@/UI/Card";
import dayjs from "dayjs";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReportTable from "../CommonUi/ReportTable";
import ProductReportPrint from "../Invoice/Report/ProductReportPrint";
import ProductReportFilter from "./ProductReportFilter";

export default function ProductReport() {
  const [pageConfig, setPageConfig] = useState({
    startDate: dayjs().subtract(1, "month").format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
    store: null,
  });
  const [showTable, setShowTable] = useState(false);
  const {
    report: list,
    info,
    loading,
  } = useSelector((state) => state.products);

  const columns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "50px",
      render: (id) => <Link to={`/admin/product/${id}`}>{id}</Link>,
      renderCsv: (id) => id,
    },
    {
      id: 4,
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name, { id }) => <Link to={`/admin/product/${id}`}>{name}</Link>,
      width: "150px",
      tdClass: "whitespace-nowrap",
      renderCsv: (name) => name,
    },
    {
      id: 10,
      title: "Brand",
      dataIndex: "productGroup",
      key: "productBrand",
      render: (productGroup) => productGroup?.productBrand?.name,
      renderCsv: (productGroup) => productGroup?.productBrand?.name,
    },
    {
      id: 9,
      title: "Sub Category",
      dataIndex: "productGroup",
      key: "productSubCategory",
      render: (productGroup) => productGroup?.subCategory?.name,
      renderCsv: (productGroup) => productGroup?.subCategory?.name,
    },
    {
      id: 3,
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
    },
    {
      id: 5,
      title: "UoM",
      key: "uomValue",
      render: ({ productGroup }) => {
        const { uomValue, uom } = productGroup;
        return `${uomValue || ""}${uom?.name ? `/${uom.name}` : ""}`;
      },
      renderCsv: ({ productGroup }) => {
        const { uomValue, uom } = productGroup;
        return `${uomValue || ""}${uom?.name ? `/${uom.name}` : ""}`;
      },
    },
    {
      title: "Store",
      dataIndex: "stockInfo",
      render: (stockInfo) => stockInfo?.[0].store?.name,
      nestDataIndex: "store",
      renderNested: (store) => store?.name,
      renderCsv: (stockInfo) =>
        stockInfo?.map((item) => item.store?.name).join(", "),
      key: "store",
    },
    {
      id: 7,
      title: "Purchase price",
      dataIndex: "stockInfo",
      render: (stockInfo) => stockInfo?.[0].productPurchasePrice,
      nestDataIndex: "productPurchasePrice",
      renderNested: (productPurchasePrice) => productPurchasePrice,
      renderCsv: (stockInfo) =>
        stockInfo?.map((item) => item.productPurchasePrice).join(", "),
      key: "productPurchasePrice",
      tdClass: "whitespace-normal",
    },
    {
      id: 8,
      title: "Sale price",
      dataIndex: "stockInfo",
      render: (stockInfo) => stockInfo?.[0].productSalePrice,
      nestDataIndex: "productSalePrice",
      renderNested: (productSalePrice) => productSalePrice,
      renderCsv: (stockInfo) =>
        stockInfo?.map((item) => item.productSalePrice).join(", "),
      key: "productSalePrice",
    },
    {
      id: 6,
      title: "Quantity",
      dataIndex: "stockInfo",
      render: (stockInfo) => stockInfo?.[0].productQuantity,
      nestDataIndex: "productQuantity",
      renderNested: (productQuantity) => productQuantity,
      renderCsv: (stockInfo) =>
        stockInfo?.map((item) => item.productQuantity).join(", "),
      key: "productQuantity",
    },

    {
      id: 12,
      title: "Reorder QTY",
      dataIndex: "stockInfo",
      render: (stockInfo) => stockInfo?.[0].reorderQuantity,
      nestDataIndex: "reorderQuantity",
      renderNested: (reorderQuantity) => reorderQuantity,
      renderCsv: (stockInfo) =>
        stockInfo?.map((item) => item.reorderQuantity).join(", "),
      key: "reorderQuantity",
    },
  ];

  return (
    <div className='card card-custom mt-3 '>
      <div className='card-body'>
        <Card
          className='max-md:border-0 max-md:bg-white'
          bodyClass='max-md:p-0 '
          headClass='border-none'
          title={"Inventory Report"}
        >
          {showTable ? (
            <>
              <div className='flex py-5  items-start justify-between '>
                <div>
                  <Button
                    onClick={() => setShowTable((prev) => !prev)}
                    className=' bg-green-500 text-white inline-block'
                  >
                    Generate Again
                  </Button>
                </div>
                <div className='flex  items-start gap-2'>
                  <ProductReportPrint
                    data={list}
                    info={info}
                    title={"INVENTORY REPORT"}
                    type={"print"}
                    btnName='Print'
                  />

                  <ProductReportPrint
                    data={list}
                    info={info}
                    title={"INVENTORY REPORT"}
                    type={"download"}
                    btnName='Export PDF'
                  />

                  <div>
                    <CSV
                      list={list}
                      columns={columns}
                      title={"Inventory Report"}
                      className={"bg-primary  text-base w-[120px] h-auto py-2 "}
                      btnName={"Export CSV"}
                    />
                  </div>
                </div>
              </div>
              <ReportTable
                list={list}
                columns={columns}
                loading={loading}
                nestedRowKey='stockInfo'
              />
            </>
          ) : (
            <ProductReportFilter
              setShowTable={setShowTable}
              setPageConfig={setPageConfig}
              pageConfig={pageConfig}
            />
          )}
        </Card>
      </div>
    </div>
  );
}
