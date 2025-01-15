import Card from "@/UI/Card";
import CommonDelete from "@/components/CommonUi/CommonDelete";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UpdateDrawer from "@/components/CommonUi/UpdateDrawer";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import {
  clearTicketStatusEdit,
  deleteTicketStatus,
  editTicketStatus,
  loadAllTicketStatus,
} from "@/redux/rtk/features/CRM/ticketStatus/ticketStatusSlice";
import { EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddTicketStatus from "./AddTicketStatus";

export default function GetAllTicketStatus() {
  const dispatch = useDispatch();
  const { list, loading, total, edit } = useSelector(
    (state) => state.ticketStatus
  );

  const columns = [
    {
      title: "NAME",
      dataIndex: "ticketStatusName",
    },
    {
      title: "CREATE DATE",
      dataIndex: "createdAt",
      render: (date) => moment(date).format("ll"),
    },
    {
      title: "UPDATE DATE",
      dataIndex: "updatedAt",
      render: (date) => moment(date).format("ll"),
    },
    {
      id: 3,
      title: "",
      key: "action",
      render: ({ id, ticketStatusName }) => [
        {
          label: (
            <div
              onClick={() =>
                dispatch(editTicketStatus({ id, values: { ticketStatusName } }))
              }
              className='flex items-center gap-2 cursor-pointer'
            >
              <EditOutlined className=' rounded-md' />
              Edit
            </div>
          ),
          key: "edit",
        },
        {
          label: (
            <CommonDelete
              id={id}
              title={"delete"}
              permission={"delete-ticketStatus"}
              deleteThunk={deleteTicketStatus}
              loadThunk={loadAllTicketStatus}
            />
          ),
          key: "delete",
        },
      ],

      csvOff: true,
    },
  ];

  useEffect(() => {
    dispatch(loadAllTicketStatus());
  }, [dispatch]);

  return (
    <Card
      className='max-md:border-0 max-md:bg-white'
      bodyClass='max-md:p-0 '
      headClass='border-none'
      title={"Ticket Status"}
      extra={
        <CreateDrawer
          permission={"create-ticketStatus"}
          title={"Create Ticket Status"}
          width={35}
        >
          <AddTicketStatus />
        </CreateDrawer>
      }
    >
      <UserPrivateComponent permission={"readAll-ticketStatus"}>
        <TableComponent
          list={list}
          columns={columns}
          loading={loading}
          total={total}
          title={"Ticket Status List"}
          isSearch={false}
        />
      </UserPrivateComponent>
      <UpdateDrawer
        permission={"update-ticketStatus"}
        title={"Update Ticket Status"}
        width={35}
        open={edit}
        setClose={clearTicketStatusEdit}
      >
        <AddTicketStatus edit={edit} />
      </UpdateDrawer>
    </Card>
  );
}
