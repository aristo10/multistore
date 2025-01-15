import Card from "@/UI/Card";
import TableComponent from "@/components/CommonUi/TableComponent";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import { loadAllTicketPaginated } from "@/redux/rtk/features/CRM/ticket/ticketSlice";
import { loadAllTicketStatus } from "@/redux/rtk/features/CRM/ticketStatus/ticketStatusSlice";
import { Tag, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CreateBtn from "./CreateBtn";

export default function GetAllContact() {
  const dispatch = useDispatch();
  const { list, loading, total } = useSelector((state) => state.ticket);
  const { list: ticketStatus } = useSelector((state) => state.ticketStatus);
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
  });

  const columns = [
    {
      title: "ID",
      key: "ticketId",
      dataIndex: "ticketId",
      render: (ticketId) => (
        <Link to={`/admin/crm/ticket/${ticketId}`}>{ticketId}</Link>
      ),
      renderCsv: (ticketId) => ticketId,
    },
    {
      title: "Subject",
      key: "subject",
      dataIndex: "subject",
    },
    {
      title: "Category",
      key: "ticketCategory",
      dataIndex: "ticketCategory",
      render: (ticketCategory) => (
        <Tag color="blue">{ticketCategory?.ticketCategoryName}</Tag>
      ),
      renderCsv: (ticketCategory) => ticketCategory?.ticketCategoryName,
    },
    {
      title: "Status",
      dataIndex: "ticketStatus",
      key: "ticketStatus",
      render: (ticketStatus) => (
        <Tag color="red">{ticketStatus?.ticketStatusName}</Tag>
      ),
      renderCsv: (ticketStatus) => ticketStatus?.ticketStatusName,
    },
    {
      title: "priority",
      key: " priority",
      dataIndex: "priority",
      render: (priority) => <Tag color="green">{priority?.name}</Tag>,
      renderCsv: (priority) => priority?.name,
    },

    {
      title: "Resolve Time",
      key: "resolveTime",
      dataIndex: "ticketResolveTime",
      render: (ticketResolveTime) => {
        // in resolve time we have minutes so we need to convert it to hours and minutes

        return (
          // if hours is 0 then we will show only minutes
          <Tooltip title={"Resolve Time"}>
            {Math.floor(ticketResolveTime / 60) +
              ":" +
              (ticketResolveTime % 60)}
          </Tooltip>
        );
      },
    },
    // {
    //   title: "Action",
    //   dataIndex: "ticketId",
    //   key: "action",
    //   render: (ticketId) => (
    //     <div className='flex justify-start'>
    //       <ViewBtn path={`/support/ticket/${ticketId}`} />
    //     </div>
    //   ),
    // },
  ];

  const filters = [
    {
      key: "ticketStatus",
      label: "Status",
      type: "select",
      options: ticketStatus?.map((item) => ({
        label: item.ticketStatusName,
        value: item.id,
      })),
      className: "min-w-[85px] max-w-[150px]",
      popupClassName: "w-[100px]",
    },
  ];

  useEffect(() => {
    dispatch(loadAllTicketStatus());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadAllTicketPaginated(pageConfig));
  }, [dispatch, pageConfig]);

  return (
    <>
      <div className="flex justify-center items-center mt-5 mb-8">
        <Link to="/admin/crm/ticket/create">
          <CreateBtn />
        </Link>
      </div>
      <Card
        className="max-md:border-0 max-md:bg-white"
        bodyClass="max-md:p-0 "
        headClass="border-none"
        title={"Ticket"}
      >
        <UserPrivateComponent permission={"readAll-ticket"}>
          <TableComponent
            list={list}
            columns={columns}
            loading={loading}
            total={total}
            setPageConfig={setPageConfig}
            title={"Ticket List"}
            isSearch
            filters={filters}
          />
        </UserPrivateComponent>
      </Card>
    </>
  );
}
