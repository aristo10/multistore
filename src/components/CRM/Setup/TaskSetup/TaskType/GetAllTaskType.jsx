import Card from "@/UI/Card";
import CommonDelete from "@/components/CommonUi/CommonDelete";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UpdateDrawer from "@/components/CommonUi/UpdateDrawer";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import {
  deleteOpportunityType,
  loadAllOpportunityType,
} from "@/redux/rtk/features/CRM/opportunityType/opportunityTypeSlice";
import {
  clearTaskTypeEdit,
  editTaskType,
  loadAllTaskType,
} from "@/redux/rtk/features/CRM/taskType/taskTypeSlice";
import { EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddTaskType from "./AddTaskType";

export default function GetAllTaskType() {
  const dispatch = useDispatch();
  const { list, loading, total, edit } = useSelector((state) => state.taskType);

  const columns = [
    {
      title: "NAME",
      dataIndex: "taskTypeName",
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
      render: ({ id, taskTypeName }) => [
        {
          label: (
            <div
              onClick={() =>
                dispatch(editTaskType({ id, values: { taskTypeName } }))
              }
              className="flex items-center gap-2 cursor-pointer"
            >
              <EditOutlined className=" rounded-md" />
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
              permission={"delete-crmTaskType"}
              deleteThunk={deleteOpportunityType}
              loadThunk={loadAllOpportunityType}
            />
          ),
          key: "delete",
        },
      ],

      csvOff: true,
    },
  ];

  useEffect(() => {
    dispatch(loadAllTaskType());
  }, [dispatch]);

  return (
    <Card
      className="max-md:border-0 max-md:bg-white"
      bodyClass="max-md:p-0 "
      headClass="border-none"
      title={"Task Type"}
      extra={
        <CreateDrawer
          permission={"create-crmTaskType"}
          title={"Create Task Type"}
          width={35}
        >
          <AddTaskType />
        </CreateDrawer>
      }
    >
      <UserPrivateComponent permission={"readAll-crmTaskType"}>
        <TableComponent
          list={list}
          columns={columns}
          loading={loading}
          total={total}
          title={"Task Type List"}
          isSearch={false}
        />
      </UserPrivateComponent>
      <UpdateDrawer
        permission={"update-crmTaskType"}
        title={"Update Task Type"}
        width={35}
        open={edit}
        setClose={clearTaskTypeEdit}
      >
        <AddTaskType edit={edit} />
      </UpdateDrawer>
    </Card>
  );
}
