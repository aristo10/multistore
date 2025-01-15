import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import UseStoreFilter from "@/Hooks/useStoreFilter";
import { loadAllProductBrand } from "@/redux/rtk/features/productBrand/productBrandSlice";
import { loadAllProductSubCategory } from "@/redux/rtk/features/productSubCategory/productSubCategorySlice";
import { cn, stringShorter } from "@/utils/functions";
import { EditOutlined } from "@ant-design/icons";
import { CiBarcode } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../UI/Card";
import {
  deleteProduct,
  loadProduct,
  loadProductCard,
} from "@/redux/rtk/features/product/productSlice";
import CreateButton from "../Buttons/CreateButton";
import ViewBtn from "../Buttons/ViewBtn";
import CommonDelete from "../CommonUi/CommonDelete";
import TableComponent from "../CommonUi/TableComponent";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import ProductCard from "./ProductCard";

const GetAllProduct = () => {
  const dispatch = useDispatch();
  const [all, setAll] = useState(false);

  const { list, loading, total, card } = useSelector((state) => state.products);
  const { list: brandList } = useSelector((state) => state.productBrands);
  const { list: SubCategoryList } = useSelector(
    (state) => state.productSubCategories,
  );
  const { storeFilter } = UseStoreFilter({ all: true });
  const handleOnError = (e) => {
    e.target.src = "/images/default.jpg";
  };
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
      id: 2,
      title: "Image",
      dataIndex: "productThumbnailImage",
      render: (productThumbnailImage) => (
        <div className="w-[2.5rem] h-[1.375rem] relative">
          <img
            className="absolute object-cover w-full h-full"
            alt="product"
            onError={handleOnError}
            src={
              `${window.env.VITE_APP_API}/media/view/${productThumbnailImage}` ||
              "/images/default.jpg"
            }
          />
        </div>
      ),
      key: "image",
      width: "70px",
      csvOff: true,
    },
    {
      id: 4,
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name, { id }) => (
        <Link title={name} to={`/admin/product/${id}`}>
          {stringShorter(name, 45)}
        </Link>
      ),
      width: "150px",
      renderCsv: (name) => name,
      tdClass: "whitespace-normal",
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
        const { uom, uomValue } = productGroup || {};
        return `${uomValue || ""}${uom?.name ? `/${uom.name}` : ""}`;
      },
      renderCsv: ({ productGroup }) => {
        const { uom, uomValue } = productGroup || {};
        return `${uomValue || ""}${uom?.name ? `/${uom.name}` : ""}`;
      },
    },
    {
      id: 7,
      title: "Store name",
      dataIndex: "stockInfo",
      key: "storeName",
      render: (stockInfo) => stockInfo?.[0]?.store?.name,
      nestDataIndex: "store",
      renderNested: (store) => store?.name,
      renderCsv: (stockInfo) =>
        stockInfo?.map((item) => item.store?.name).join(", "),
      responsive: ["md"],
    },
    {
      id: 8,
      title: "Purchase price",
      dataIndex: "stockInfo",
      key: "productPurchasePrice",
      render: (stockInfo) => stockInfo?.[0]?.productPurchasePrice,
      nestDataIndex: "productPurchasePrice",
      renderNested: (productPurchasePrice) => productPurchasePrice,
      renderCsv: (stockInfo) =>
        stockInfo?.map((item) => item.productPurchasePrice).join(", "),
    },
    {
      id: 9,
      title: "Sale price",
      dataIndex: "stockInfo",
      key: "productSalePrice",
      render: (stockInfo) => stockInfo?.[0]?.productSalePrice,
      nestDataIndex: "productSalePrice",
      renderNested: (productSalePrice) => productSalePrice,
      renderCsv: (stockInfo) =>
        stockInfo?.map((item) => item.productSalePrice).join(", "),
      responsive: ["md"],
    },
    {
      id: 10,
      title: "Quantity",
      dataIndex: "stockInfo",
      render: (stockInfo) => stockInfo?.[0]?.productQuantity,
      nestDataIndex: "productQuantity",
      renderNested: (productQuantity) => productQuantity,
      renderCsv: (stockInfo) =>
        stockInfo?.map((item) => item.productQuantity).join(", "),
      key: "productQuantity",
    },

    {
      id: 11,
      title: "Reorder QTY",
      dataIndex: "stockInfo",
      render: (stockInfo) => stockInfo?.[0]?.reorderQuantity,
      nestDataIndex: "reorderQuantity",
      renderNested: (reorderQuantity) => reorderQuantity,
      renderCsv: (stockInfo) =>
        stockInfo?.map((item) => item.reorderQuantity).join(", "),
      key: "reorderQuantity",
    },
    {
      id: 12,
      title: "",
      key: "action",
      render: ({ id, status }) => [
        {
          label: <ViewBtn title={"View"} path={`/admin/product/${id}`} />,
          key: "view",
        },
        {
          label: (
            <UserPrivateComponent permission={"update-product"}>
              <Link
                to={`/admin/product/${id}/update`}
                className="flex items-center gap-2 cursor-pointer"
              >
                <EditOutlined className=" rounded-md" />
                Edit
              </Link>
            </UserPrivateComponent>
          ),
          key: "edit",
        },
        {
          label: (
            <CommonDelete
              values={{
                id,
                status,
              }}
              title={status === "true" ? "Hide" : "Show"}
              permission={"delete-product"}
              deleteThunk={deleteProduct}
              loadThunk={loadProduct}
              query={pageConfig}
            />
          ),
          key: "delete",
        },
        {
          label: (
            <Link
              to={`/admin/print-barcode/${id}`}
              className="flex items-center gap-2 rounded"
            >
              <CiBarcode className="text-[1rem]" />
              Barcode
            </Link>
          ),
          key: "barcode",
        },
      ],
      csvOff: true,
    },
  ];

  if (all) {
    columns.splice(7, 5);
  }

  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    status: "true",
  });

  const filters = [
    storeFilter,
    {
      key: "productSubCategoryId",
      label: "Sub Category",
      type: "select",
      options: SubCategoryList?.map((item) => ({
        label: item?.name,
        value: item?.id,
      })),
      className: "min-w-[123px] max-w-[150px]",
      popupClassName: "w-[200px]",
    },
    {
      key: "productBrandId",
      label: "Brand",
      type: "select",
      options: brandList?.map((item) => ({
        label: item?.name,
        value: item?.id,
      })),
      className: "min-w-[100px] max-w-[150px]",
      popupClassName: "w-[200px]",
    },
    {
      key: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Show", value: "true" },
        { label: "Hide", value: "false" },
      ],
      className: "min-w-[85px] max-w-[150px]",
      popupClassName: "w-[200px]",
    },
  ];

  const handleAll = () => {
    if (!all) {
      setPageConfig({
        page: 1,
        count: 10,
        status: "true",
        product: "all",
      });
    } else {
      setPageConfig({
        page: 1,
        count: 10,
        status: "true",
      });
    }
    setAll(!all);
  };
  const extraFilter = (
    <div
      onClick={handleAll}
      className={cn(
        "h-8 bg-[#D7D7D7] px-2 text-center rounded-[5px] flex items-center cursor-pointer",
        { "bg-[#1890ff] text-white": all },
      )}
    >
      All
    </div>
  );

  useEffect(() => {
    dispatch(loadProductCard(pageConfig.storeId || null));
  }, [dispatch, pageConfig.storeId]);

  useEffect(() => {
    dispatch(loadProduct(pageConfig));
  }, [dispatch, pageConfig]);

  useEffect(() => {
    dispatch(loadAllProductSubCategory({ query: "all" }));
    dispatch(loadAllProductBrand({ query: "all" }));
  }, [dispatch]);

  return (
    <>
      {card && <ProductCard card={card} />}
      <Card
        className="max-md:border-0 max-md:bg-white"
        bodyClass="max-md:p-0 "
        headClass="border-none"
        title={"Products"}
        extra={<CreateButton to="/admin/product/add" title="Create product" />}
      >
        <UserPrivateComponent permission={"readAll-product"}>
          <TableComponent
            list={list}
            total={total}
            loading={loading}
            columns={columns}
            filters={all ? [] : filters}
            extraFilter={extraFilter}
            setPageConfig={setPageConfig}
            title="Product List"
            isSearch
            nestedRowKey="stockInfo"
          />
        </UserPrivateComponent>
      </Card>
    </>
  );
};

export default GetAllProduct;
