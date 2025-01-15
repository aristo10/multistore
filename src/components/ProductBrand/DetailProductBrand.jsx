import { Card } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  clearBrand,
  loadSingleProductBrand,
} from "../../redux/rtk/features/productBrand/productBrandSlice";
import ViewBtn from "../Buttons/ViewBtn";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TableNoPagination from "../CommonUi/TableNoPagination";
import Loader from "../Loader/Loader";
import GenerateBarcodePopUp from "../Product/GenerateBarcodePopUp";
import UpdateProductBrand from "./UpdateProductBrand";

const DetailProductBrand = () => {
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
  const { id } = useParams();

  //dispatch
  const dispatch = useDispatch();
  const brand = useSelector((state) => state.productBrands.brand);

  useEffect(() => {
    dispatch(loadSingleProductBrand(id));
    return () => {
      dispatch(clearBrand());
    };
  }, [dispatch, id]);

  const rightElement = (
    <>
      <h5 className='text-lg'>
        Products under <strong>{brand?.name} </strong>
      </h5>
    </>
  );
  return (
    <div>
      <div className='mr-top'>
        {brand ? (
          <Card
            className='border-0 md:border md:p-6 bg-transparent md:bg-[#fafafa]'
            bodyStyle={{ padding: 0 }}
            key={brand?.id}
          >
            <div className='md:flex flex justify-between md:mb-8 items-center gap-2'>
              <h5 className='flex items-center'>
                <span className='mr-left'>{brand?.name}</span>
              </h5>
              <div className='flex items-center gap-2'>
                <CreateDrawer
                  permission={"update-productBrand"}
                  title={"Update Brand"}
                  update
                  color={"bg-gray-700"}
                  width={30}
                >
                  <UpdateProductBrand brand={brand} />
                </CreateDrawer>
              </div>
            </div>
            <TableNoPagination
              list={brand?.products}
              columns={columns}
              csvFileName={"brand"}
              rightElement={rightElement}
            />
          </Card>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default DetailProductBrand;
