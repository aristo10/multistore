import { Link } from "react-router-dom";

import UseStoreFilter from "@/Hooks/useStoreFilter";
import { loadSuppliers } from "@/redux/rtk/features/supplier/supplierSlice";
import { DatePicker, Modal } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { MdPayments } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../UI/Card";
import {
  clearPurchaseList,
  loadAllPurchase,
  loadSinglePurchase,
} from "@/redux/rtk/features/purchase/purchaseSlice";
import CreateButton from "../Buttons/CreateButton";
import ViewBtn from "../Buttons/ViewBtn";
import TableComponent from "../CommonUi/TableComponent";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import DashboardCard from "./Cards";
import SendPurchaseInvoice from "./SendPurchaseInvoice";

const GetAllPurchase = () => {
  const { RangePicker } = DatePicker;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { list, total, loading, information } = useSelector(
    (state) => state.purchases,
  );
  const { list: supplierList } = useSelector((state) => state.suppliers);
  const { storeFilter } = UseStoreFilter();
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    status: "true",
    startDate: moment().startOf("month").format("YYYY-MM-DD"),
    endDate: moment().endOf("month").format("YYYY-MM-DD"),
  });

  const columns = [
    {
      id: 1,
      title: "Invoice",
      key: "id",
      render: ({ id }) => <Link to={`/admin/purchase/${id}`}>{id}</Link>,
      renderCsv: ({ id }) => id,
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
      title: "Supplier",
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
      render: (totalAmount) => totalAmount.toFixed(2),
    },

    {
      id: 7,
      title: "Paid",
      dataIndex: "paidAmount",
      key: "paidAmount",
      render: (paidAmount) => paidAmount.toFixed(2),
    },
    {
      id: 6,
      title: "Due",
      dataIndex: "dueAmount",
      key: "dueAmount",
      render: (dueAmount) => dueAmount.toFixed(2),
    },
    {
      id: 4,
      title: "Tax",
      dataIndex: "totalTax",
      key: "totalTax",
      render: (totalTax) => totalTax.toFixed(2),
    },
    //Update Supplier Name here

    {
      id: 8,
      title: "",
      dataIndex: "",
      key: "action",
      render: ({ id, dueAmount }) => [
        {
          label: <ViewBtn title="View" path={`/admin/purchase/${id}`} />,
          key: "view",
        },
        {
          label: (
            <Link
              to={dueAmount ? `/admin/payment/supplier/${id}` : "#"}
              state={{ dueAmount: dueAmount }}
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
                dispatch(loadSinglePurchase(id));
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
      key: "supplierId",
      label: "Supplier",
      type: "select",
      options: supplierList?.map((item) => ({
        label: item?.name,
        value: item?.id,
      })),
      className: "min-w-[123px] max-w-[150px]",
      popupClassName: "w-[200px]",
    },
  ];
  useEffect(() => {
    dispatch(loadAllPurchase(pageConfig));
    return () => {
      dispatch(clearPurchaseList());
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
  useEffect(() => {
    dispatch(loadSuppliers({ query: "all" }));
  }, [dispatch]);

  return (
    <div className="card card-custom mt-3 ">
      <div className="card-body">
        <DashboardCard information={information} count={total} />
        <br />

        <Card
          className="max-md:border-0 max-md:bg-white"
          bodyClass="max-md:p-0 "
          headClass="border-none"
          title={"Purchase Invoice"}
          extra={
            <div className="justify-between md:justify-start flex gap-3 items-center">
              <div>
                <RangePicker
                  className="range-picker "
                  onCalendarChange={onCalendarChange}
                  defaultValue={[
                    dayjs(pageConfig.startDate, "YYYY-MM-DD"),
                    dayjs(pageConfig.endDate, "YYYY-MM-DD"),
                  ]}
                />
              </div>

              <CreateButton to="/admin/purchase/add" title="Create Purchase" />
            </div>
          }
        >
          <UserPrivateComponent permission={"readAll-purchaseInvoice"}>
            <TableComponent
              list={list}
              total={total}
              columns={columns}
              loading={loading}
              setPageConfig={setPageConfig}
              title="Purchase List"
              filters={filters}
              isSearch
            />
          </UserPrivateComponent>
        </Card>
      </div>
      <Modal
        title="Send Purchase Invoice"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <SendPurchaseInvoice setIsModalOpen={setIsModalOpen} modal={true} />
      </Modal>
    </div>
  );
};

export default GetAllPurchase;
