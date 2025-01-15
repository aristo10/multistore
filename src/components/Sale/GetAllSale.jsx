import { Link } from "react-router-dom";
import UseStoreFilter from "@/Hooks/useStoreFilter";
import { loadAllCustomer } from "@/redux/rtk/features/customer/customerSlice";
import { DatePicker, Modal, Tag } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { MdPayments } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../UI/Card";
import {
  clearSaleList,
  loadAllSale,
  loadSingleSale,
} from "@/redux/rtk/features/sale/saleSlice";
import { loadAllStaff } from "@/redux/rtk/features/hrm/user/userSlice";
import CreateButton from "../Buttons/CreateButton";
import ViewBtn from "../Buttons/ViewBtn";
import DashboardCard from "../Card/DashboardCard";
import TableComponent from "../CommonUi/TableComponent";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import { dateDiffChecker } from "./DetailSale";
import SendSaleInvoice from "./SendSaleInvoice";

const GetAllSale = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    list,
    total,
    loading: saleLoading,
  } = useSelector((state) => state.sales);
  const { list: customerList } = useSelector((state) => state.customers);
  const { list: salePersonList } = useSelector((state) => state.users);
  const { storeFilter } = UseStoreFilter();

  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    status: "true",
    startDate: moment().startOf("month").format("YYYY-MM-DD"),
    endDate: moment().endOf("month").format("YYYY-MM-DD"),
    user: "",
  });
  const columns = [
    {
      id: 1,
      title: "Invoice",
      dataIndex: "id",
      key: "id",
      render: (name, { id }) => <Link to={`/admin/sale/${id}`}>{id}</Link>,
      renderCsv: (id) => id,
    },
    {
      title: "Store",
      dataIndex: "store",
      key: "store",
      render: (store) => store?.name,
      renderCsv: (store) => store?.name,
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
      title: "Customer",
      dataIndex: `customer`,
      key: "customerId",
      render: (customer) => (
        <Link to={`/admin/customer/${customer?.id}`}>{customer?.username}</Link>
      ),
      renderCsv: (customer) => customer?.username,
    },

    {
      id: 4,
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (totalAmount) => Number(totalAmount).toFixed(2),
      renderCsv: (totalAmount) => Number(totalAmount).toFixed(2),
    },

    {
      id: 7,
      title: "Paid",
      dataIndex: "paidAmount",
      key: "paidAmount",
      render: (paidAmount) => Number(paidAmount).toFixed(2),
      responsive: ["md"],
      renderCsv: (paidAmount) => Number(paidAmount).toFixed(2),
    },
    {
      id: 6,
      title: "Due",
      dataIndex: "dueAmount",
      key: "dueAmount",
      render: (dueAmount) => Number(dueAmount).toFixed(2),
      renderCsv: (dueAmount) => Number(dueAmount).toFixed(2),
      responsive: ["md"],
    },

    {
      id: 6,
      title: "Tax",
      dataIndex: "totalTaxAmount",
      key: "totalTaxAmount",
      render: (totalTaxAmount) => Number(totalTaxAmount).toFixed(2),
      renderCsv: (totalTaxAmount) => Number(totalTaxAmount).toFixed(2),
      responsive: ["md"],
    },

    {
      id: 5,
      title: "Due date",
      dataIndex: "dueDate",
      key: "discount",
      render: (dueDate) =>
        dueDate ? (
          <div className="flex gap-1 items-center">
            {moment(dueDate).format("ll")}
            {dateDiffChecker(dueDate) && (
              <Tag className="text-xs" color="red">
                Overdue
              </Tag>
            )}
          </div>
        ) : null,
      renderCsv: (discount) => Number(discount).toFixed(2),
    },
    //Update Supplier Name here

    {
      id: 8,
      title: "Profit",
      dataIndex: "profit",
      key: "profit",
      render: (profit) => Number(profit).toFixed(2),
      renderCsv: (profit) => Number(profit).toFixed(2),
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
      renderCsv: (user) => user?.username,
      responsive: ["md"],
    },
    {
      id: 10,
      title: "",
      dataIndex: "id",
      key: "action",
      render: ({ id, dueAmount }) => [
        {
          label: <ViewBtn title="View" path={`/admin/sale/${id}`} />,
          key: "view",
        },
        {
          label: (
            <Link
              to={dueAmount ? `/admin/payment/customer/${id}` : "#"}
              state={{ dueAmount: dueAmount || 0 }}
            >
              <button
                className="flex items-center gap-2 rounded disabled:cursor-not-allowed"
                disabled={!dueAmount}
              >
                <MdPayments className="text-[1rem]" /> Payment
              </button>
            </Link>
          ),
          key: "payment",
        },
        {
          label: (
            <div
              onClick={() => {
                showModal();
                dispatch(loadSingleSale(id));
              }}
              className="flex gap-2  items-center cursor-pointer hover:text-primary"
            >
              <IoIosSend className="text-[1rem]" />
              Email
            </div>
          ),
          key: "SendEmail",
        },
      ],

      csvOff: true,
    },
  ];

  const filters = [
    storeFilter,
    {
      key: "salePersonId",
      label: "Sale Person",
      type: "select",
      options: salePersonList?.map((item) => ({
        label: item?.username,
        value: item.id,
      })),
      className: "min-w-[120px] max-w-[150px]",
      popupClassName: "w-[200px]",
    },
    {
      key: "customerId",
      label: "Customer",
      type: "select",
      options: customerList?.map((item) => ({
        label: item?.username,
        value: item?.id,
      })),
      className: "min-w-[100px] max-w-[150px]",
      popupClassName: "w-[200px]",
    },
    {
      key: "orderStatus",
      label: "Status",
      type: "select",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Received", value: "received" },
      ],
      className: "min-w-[85px] max-w-[150px]",
      popupClassName: "w-[200px]",
    },
  ];

  useEffect(() => {
    dispatch(loadAllCustomer({ query: "all" }));
    dispatch(loadAllStaff({ query: "all" }));
  }, [dispatch]);

  const { RangePicker } = DatePicker;

  useEffect(() => {
    dispatch(loadAllSale(pageConfig));
    return () => {
      dispatch(clearSaleList());
    };
  }, [dispatch, pageConfig]);

  const onCalendarChange = (dates) => {
    const startDate = dates[0].format("YYYY-MM-DD");
    const endDate = dates[1].format("YYYY-MM-DD");

    setPageConfig((prev) => {
      return {
        ...prev,
        startDate,
        endDate,
      };
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="card card-custom mt-2">
      <div className="card-body">
        <DashboardCard
          information={total?._sum}
          count={total?._count?.id}
          isCustomer={true}
        />
        <br />

        <Card
          className="max-md:border-0 max-md:bg-white"
          bodyClass="max-md:p-0 "
          headClass="border-none"
          title={"Sale Invoice"}
          extra={
            <>
              {" "}
              <div>
                <RangePicker
                  className="range-picker"
                  onCalendarChange={onCalendarChange}
                  defaultValue={[
                    dayjs(pageConfig.startDate, "YYYY-MM-DD"),
                    dayjs(pageConfig.endDate, "YYYY-MM-DD"),
                  ]}
                />
              </div>
              {/* <SaleReportPrint
                data={list}
                date={{
                  startdate: pageConfig.startDate,
                  enddate: pageConfig.endDate,
                }}
                user={user}
                total={total?._sum}
              /> */}
              <CreateButton to="/admin/sale/add" title="Create Sale" />
            </>
          }
        >
          <UserPrivateComponent permission={"readAll-saleInvoice"}>
            <TableComponent
              list={list}
              columns={columns}
              loading={saleLoading}
              total={total?._count?.id}
              setPageConfig={setPageConfig}
              title={"Sale List"}
              filters={filters}
              isSearch
            />
          </UserPrivateComponent>
        </Card>
      </div>

      <Modal
        title="Send Sale Invoice"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <SendSaleInvoice setIsModalOpen={setIsModalOpen} modal={true} />
      </Modal>
    </div>
  );
};

export default GetAllSale;
