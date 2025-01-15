import { Modal } from "antd";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../../UI/Card";
import { loadAllQuote } from "../../redux/rtk/features/quote/quoteSlice";
import { stringShorter } from "../../utils/functions";
import ViewBtn from "../Buttons/ViewBtn";
import CreateDrawer from "../CommonUi/CreateDrawer";
import SendInvoice from "../CommonUi/SendInvoice";
import TableComponent from "../CommonUi/TableComponent";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import AddQuote from "./AddQuote";

export default function GetAllQuote() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invoiceId, setInvoiceId] = useState();
  const { list, loading, total } = useSelector((state) => state.quote);
  const { list: userList } = useSelector((state) => state.users);
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
      render: (id) => <Link to={`/admin/quotation/${id}`}>{id}</Link>,
      renderCsv: (id) => id,
    },
    {
      id: 2,
      title: "Name",
      dataIndex: "quoteName",
      key: "quoteName",
    },
    {
      id: 3,
      title: "Owner",
      dataIndex: "quoteOwner",
      key: "quoteOwner",
      render: (quoteOwner) => (
        <Link to={`/admin/hrm/staff/${quoteOwner?.id}`}>
          {quoteOwner?.username}
        </Link>
      ),
      renderCsv: (quoteOwner) => quoteOwner?.username,
    },
    {
      id: 4,
      title: "Quotation Date",
      dataIndex: "quoteDate",
      key: "quoteDate",
      render: (quoteDate) => moment(quoteDate).format("YYYY-MM-DD"),
      renderCsv: (quoteDate) => moment(quoteDate).format("YYYY-MM-DD"),
    },
    {
      id: 5,
      title: "Expiration Date",
      dataIndex: "expirationDate",
      key: "expirationDate",
      render: (expirationDate) => moment(expirationDate).format("YYYY-MM-DD"),
      renderCsv: (expirationDate) =>
        moment(expirationDate).format("YYYY-MM-DD"),
    },
    {
      id: 6,
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      id: 7,
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (description) => stringShorter(description, 20),
    },
    {
      id: 8,
      title: "Create Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("YYYY-MM-DD"),
      renderCsv: (createdAt) => moment(createdAt).format("YYYY-MM-DD"),
    },
    {
      id: 8,
      title: "Action",
      key: "action",
      render: ({ id }) => [
        {
          label: <ViewBtn title={"View"} path={`/admin/quotation/${id}`} />,
          key: "view",
        },
        {
          label: (
            <div
              onClick={() => {
                showModal();
                setInvoiceId(id);
              }}
              className='flex gap-2  items-center cursor-pointer'
            >
              <IoIosSend className='text-[1rem]' />
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
    {
      key: "quoteOwnerId",
      label: "Quote Owner",
      type: "select",
      options: userList?.map((item) => ({
        label: item?.username,
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
    dispatch(loadAllQuote(pageConfig));
  }, [dispatch, pageConfig]);

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
    <>
      <Card
        className="max-md:border-0 max-md:bg-white"
        bodyClass="max-md:p-0 "
        headClass="border-none"
        title={"Quotation"}
        extra={
          <CreateDrawer
            permission={"create-quote"}
            title={"Create Quotation"}
            width={70}
          >
            <AddQuote />
          </CreateDrawer>
        }
      >
        <UserPrivateComponent permission={"readAll-quote"}>
          <TableComponent
            total={total}
            columns={columns}
            list={list}
            loading={loading}
            setPageConfig={setPageConfig}
            title="Quote List"
            isSearch
            filters={filters}
          />
        </UserPrivateComponent>
      </Card>
      <Modal
        title="Send Quotation Invoice"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <SendInvoice
          invoiceName={"Quotations"}
          invoiceId={invoiceId}
          setIsModalOpen={setIsModalOpen}
        />
      </Modal>
    </>
  );
}
