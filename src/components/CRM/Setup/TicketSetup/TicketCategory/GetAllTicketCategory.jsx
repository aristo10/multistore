import Card from "@/UI/Card";
import CommonDelete from "@/components/CommonUi/CommonDelete";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UpdateDrawer from "@/components/CommonUi/UpdateDrawer";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import {
  clearTicketCategoryEdit,
  deleteTicketCategory,
  editTicketCategory,
  loadAllTicketCategory,
} from "@/redux/rtk/features/CRM/ticketCategory/ticketCategorySlice";
import { EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddTicketCategory from "./AddTicketCategory";

export default function GetAllTicketCategory() {
  const dispatch = useDispatch();
  const { list, loading, total, edit } = useSelector(
    (state) => state.ticketCategory
  );

  const columns = [
    {
      title: "NAME",
      dataIndex: "ticketCategoryName",
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
      render: ({ id, ticketCategoryName }) => [
        {
          label: (
            <div
              onClick={() =>
                dispatch(
                  editTicketCategory({ id, values: { ticketCategoryName } })
                )
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
              permission={"delete-ticketCategory"}
              deleteThunk={deleteTicketCategory}
              loadThunk={loadAllTicketCategory}
            />
          ),
          key: "delete",
        },
      ],

      csvOff: true,
    },
  ];

  useEffect(() => {
    dispatch(loadAllTicketCategory());
  }, [dispatch]);

  return (
    <Card
      className='max-md:border-0 max-md:bg-white'
      bodyClass='max-md:p-0 '
      headClass='border-none'
      title={"Ticket Category"}
      extra={
        <CreateDrawer
          permission={"create-ticketCategory"}
          title={"Create Ticket Category"}
          width={35}
        >
          <AddTicketCategory />
        </CreateDrawer>
      }
    >
      <UserPrivateComponent permission={"readAll-ticketCategory"}>
        <TableComponent
          list={list}
          columns={columns}
          loading={loading}
          total={total}
          title={"Ticket Category List"}
          isSearch={false}
        />
      </UserPrivateComponent>
      <UpdateDrawer
        permission={"update-ticketCategory"}
        title={"Update Ticket Category"}
        width={35}
        open={edit}
        setClose={clearTicketCategoryEdit}
      >
        <AddTicketCategory edit={edit} />
      </UpdateDrawer>
    </Card>
  );
}
