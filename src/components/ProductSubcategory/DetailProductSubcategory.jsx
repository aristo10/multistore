import { Card } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  clearSubCategory,
  loadSingleProductSubCategory,
} from "../../redux/rtk/features/productSubCategory/productSubCategorySlice";
import ViewBtn from "../Buttons/ViewBtn";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TableNoPagination from "../CommonUi/TableNoPagination";
import Loader from "../Loader/Loader";
import GenerateBarcodePopUp from "../Product/GenerateBarcodePopUp";
import UpdateProductSubCategory from "./UpdateProductSubcategory";

const DetailProductSubCategory = () => {
  const { id } = useParams();
  const columns = [
    {
      id: 2,
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      id: 3,
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
    },
    {
      id: 4,
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name, { id }) => <Link to={`/admin/product/${id}`}>{name}</Link>,
      tdClass: "whitespace-normal",
    },
    {
      id: 10,
      title: "",
      key: "action",
      render: ({ sku, id }) => [
        {
          label: <ViewBtn title={"View"} path={`/admin/product/${id}`} />,
          key: "view",
        },
        { label: <GenerateBarcodePopUp sku={sku ? sku : 0} />, key: "barcode" },
      ],
    },
  ];

  //dispatch
  const dispatch = useDispatch();
  const subCategory = useSelector(
    (state) => state.productSubCategories?.subCategory
  );

  useEffect(() => {
    dispatch(loadSingleProductSubCategory(id));
    return () => {
      dispatch(clearSubCategory());
    };
  }, [dispatch, id]);

  const rightElement = (
    <>
      <h5 className='text-center mb-2 text-lg'>
        Products under <strong>{subCategory?.name} </strong>
      </h5>
    </>
  );
  return (
    <>
      <div className='mr-top'>
        {subCategory ? (
          <Card
            className='border-0 md:border md:p-6 bg-transparent md:bg-[#fafafa]'
            bodyStyle={{ padding: 0 }}
            key={subCategory.id}
          >
            <div className='md:flex flex justify-between md:mb-8 items-center gap-2'>
              <h5 className='flex items-center'>
                <span className='mr-left'>{subCategory.name}</span>
              </h5>
              <div className='flex items-center gap-2'>
                <CreateDrawer
                  permission={"update-productSubCategory"}
                  title={"Update SubCategory"}
                  update
                  color={"bg-gray-700"}
                  width={30}
                >
                  <UpdateProductSubCategory subcategory={subCategory} />
                </CreateDrawer>
              </div>
            </div>
            <TableNoPagination
              list={subCategory?.products}
              columns={columns}
              csvFileName={"SubCategory"}
              rightElement={rightElement}
            />
          </Card>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default DetailProductSubCategory;
