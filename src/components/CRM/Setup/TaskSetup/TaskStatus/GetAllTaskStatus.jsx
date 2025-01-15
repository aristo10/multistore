import Card from "@/UI/Card";
import CommonDelete from "@/components/CommonUi/CommonDelete";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UpdateDrawer from "@/components/CommonUi/UpdateDrawer";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import {
  clearTaskStatusEdit,
  deleteTaskStatus,
  editTaskStatus,
  loadAllTaskStatus,
} from "@/redux/rtk/features/CRM/taskStatus/taskStatusSlice";
import { EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddTaskStatus from "./AddTaskStatus";

export default function GetAllTaskStatus() {
  const dispatch = useDispatch();
  const { list, loading, total, edit } = useSelector(
    (state) => state.taskStatus
  );

  const columns = [
    {
      title: "NAME",
      dataIndex: "taskStatusName",
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
      render: ({ id, taskStatusName }) => [
        {
          label: (
            <div
              onClick={() =>
                dispatch(editTaskStatus({ id, values: { taskStatusName } }))
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
              permission={"delete-crmTaskStatus"}
              deleteThunk={deleteTaskStatus}
              loadThunk={loadAllTaskStatus}
            />
          ),
          key: "delete",
        },
      ],

      csvOff: true,
    },
  ];

  useEffect(() => {
    dispatch(loadAllTaskStatus());
  }, [dispatch]);

  return (
    <Card
      className='max-md:border-0 max-md:bg-white'
      bodyClass='max-md:p-0 '
      headClass='border-none'
      title={"Task status"}
      extra={
        <CreateDrawer
          permission={"create-crmTaskStatus"}
          title={"Create Task Status"}
          width={35}
        >
          <AddTaskStatus />
        </CreateDrawer>
      }
    >
      <UserPrivateComponent permission={"readAll-crmTaskStatus"}>
        <TableComponent
          list={list}
          columns={columns}
          loading={loading}
          total={total}
          title={"Task Status List"}
          isSearch={false}
        />
      </UserPrivateComponent>
      <UpdateDrawer
        permission={"update-crmTaskStatus"}
        title={"Update Task Status"}
        width={35}
        open={edit}
        setClose={clearTaskStatusEdit}
      >
        <AddTaskStatus edit={edit} />
      </UpdateDrawer>
    </Card>
  );
}
