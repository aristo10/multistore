import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../UI/Card";
import {
  clearCouponList,
  deleteCoupon,
  loadCouponPaginated,
} from "../../redux/rtk/features/Coupon/couponSlice";
import CommonDelete from "../CommonUi/CommonDelete";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TableComponent from "../CommonUi/TableComponent";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import AddCoupon from "./AddCoupon";
import UpdateProductColor from "./UpdateCoupon";

const GetAllCoupon = () => {
  const dispatch = useDispatch();
  const { list, loading, total } = useSelector((state) => state.coupon);
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
    },
    {
      id: 2,
      title: "Name",
      dataIndex: "couponCode",
      key: "couponCode",
    },
    {
      id: 3,
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      id: 4,
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
    {
      id: 5,
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (startDate) => moment(startDate).format("ll"),
      renderCsv: (startDate) => moment(startDate).format("ll"),
    },
    {
      id: 6,
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (endDate) => moment(endDate).format("ll"),
      renderCsv: (endDate) => moment(endDate).format("ll"),
    },
    {
      id: 7,
      title: "",
      dataIndex: "",
      key: "action",
      render: ({ couponCode, type, value, startDate, endDate, id, status }) => [
        {
          label: (
            <UserPrivateComponent permission='update-coupon'>
              <UpdateProductColor
                data={{ couponCode, type, value, startDate, endDate }}
                id={id}
              />
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
              permission={"delete-coupon"}
              deleteThunk={deleteCoupon}
              loadThunk={loadCouponPaginated}
              query={pageConfig}
              className='bg-white text-black'
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
      key: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Show", value: "true" },
        { label: "Hide", value: "false" },
      ],
      className: "min-w-[85px] max-w-[150px]",
      popupClassName: "w-[100px]",
    },
  ];
  useEffect(() => {
    dispatch(loadCouponPaginated(pageConfig));
    return () => {
      dispatch(clearCouponList());
    };
  }, [dispatch, pageConfig]);

  return (
    <Card
      className='max-md:border-0 max-md:bg-white'
      bodyClass='max-md:p-0 '
      headClass='border-none'
      title={"Coupons"}
      extra={
        <CreateDrawer
          permission={"create-coupon"}
          title={"Create Coupon"}
          width={35}
        >
          <AddCoupon />
        </CreateDrawer>
      }
    >
      <UserPrivateComponent permission={"readAll-coupon"}>
        <TableComponent
          list={list}
          columns={columns}
          loading={loading}
          total={total}
          setPageConfig={setPageConfig}
          title={"Coupon List"}
          filters={filters}
          isSearch
        />
      </UserPrivateComponent>
    </Card>
  );
};

export default GetAllCoupon;
