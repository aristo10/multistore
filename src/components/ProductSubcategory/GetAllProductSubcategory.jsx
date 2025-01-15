import { loadAllProductCategory } from "@/redux/rtk/features/productCategory/productCategorySlice";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../../UI/Card";
import {
  clearSubCategoryList,
  deleteProductSubCategory,
  loadAllProductSubCategory,
} from "../../redux/rtk/features/productSubCategory/productSubCategorySlice";
import ViewBtn from "../Buttons/ViewBtn";
import CommonDelete from "../CommonUi/CommonDelete";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TableComponent from "../CommonUi/TableComponent";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import AddProductSubCategory from "./AddProductSubcategory";

const GetAllProductSubCategory = () => {
  const dispatch = useDispatch();

  const { list, total, loading } = useSelector(
    (state) => state.productSubCategories
  );
  const { list: categoryList } = useSelector(
    (state) => state.productCategories
  );
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    status: "true",
  });

  const columns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => <Link to={`/admin/product-subcategory/${id}`}>{id}</Link>,
      renderCsv: (id) => id,
    },
    {
      id: 2,
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name, { id }) => (
        <Link to={`/admin/product-subcategory/${id}`}>{name}</Link>
      ),
      renderCsv: (name) => name,
    },
    {
      id: 3,
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("YYYY-MM-DD"),
      renderCsv: (createdAt) => moment(createdAt).format("YYYY-MM-DD"),
    },
    {
      id: 4,
      title: "",
      key: "action",
      render: ({ id, status }) => [
        {
          label: (
            <ViewBtn title={"View"} path={`/admin/product-subcategory/${id}`} />
          ),
          key: "view",
        },
        {
          label: (
            <CommonDelete
              values={{
                id,
                status,
              }}
              title={status === "true" ? "Hide" : "Show"}
              permission={"delete-productSubCategory"}
              deleteThunk={deleteProductSubCategory}
              loadThunk={loadAllProductSubCategory}
              query={pageConfig}
              className="bg-white text-black"
            />
          ),
          key: "delete",
        },
      ],
      csvOff: true,
    },
  ];

  const filters = [
    {
      key: "Category",
      label: "Category",
      type: "select",
      options: categoryList?.map((item) => ({
        label: item?.name,
        value: item?.id,
      })),
      className: "min-w-[123px] max-w-[150px]",
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
  useEffect(() => {
    dispatch(loadAllProductSubCategory(pageConfig));
    return () => {
      dispatch(clearSubCategoryList());
    };
  }, [dispatch, pageConfig]);

  useEffect(() => {
    dispatch(loadAllProductCategory({ query: "all" }));
    return () => {
      dispatch(clearSubCategoryList());
    };
  }, [dispatch]);

  return (
    <Card
      className="max-md:border-0 max-md:bg-white"
      bodyClass="max-md:p-0 "
      headClass="border-none"
      title={"Product Sub Category"}
      extra={
        <CreateDrawer
          permission={"create-productSubCategory"}
          title={"Create Subcategory"}
          width={35}
        >
          <AddProductSubCategory />
        </CreateDrawer>
      }
    >
      <UserPrivateComponent permission={"readAll-productSubCategory"}>
        <TableComponent
          columns={columns}
          setPageConfig={setPageConfig}
          list={list}
          total={total}
          loading={loading}
          title={"Product SubCategory"}
          filters={filters}
          isSearch
        />
      </UserPrivateComponent>
    </Card>
  );
};

export default GetAllProductSubCategory;
