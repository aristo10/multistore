import Card from "@/UI/Card";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteTask,
  loadAllTaskPaginated,
} from "@/redux/rtk/features/CRM/task/taskSlice";
import CommonDelete from "@/components/CommonUi/CommonDelete";
import AddTask from "./AddTask";

export default function GetAllTask() {
  const dispatch = useDispatch();
  const { list, loading, total } = useSelector((state) => state.task);
  const [pageConfig, setPageConfig] = useState({
    status: true,
    page: 1,
    count: 10,
  });

  const columns = [
    {
      title: "Name",
      key: "Name",
      render: ({ name, id }) => (
        <Link to={`/admin/crm/task/${id}`}>{name}</Link>
      ),
      renderCsv: ({ taskName }) => taskName,
    },
    {
      title: "Priority",
      dataIndex: "priority",
      render: (priority) => priority.name,
      renderCsv: (priority) => priority.name,
    },
    {
      title: "Status",
      dataIndex: "crmTaskStatus",
      render: (taskStatus) => `${taskStatus?.taskStatusName}`,
      renderCsv: (taskStatus) => `${taskStatus?.taskStatusName}`,
    },
    {
      title: "Type",
      dataIndex: "taskType",
      render: (taskType) => `${taskType?.taskTypeName}`,
      renderCsv: (taskType) => `${taskType?.taskTypeName}`,
    },
    {
      title: "Assignee",
      dataIndex: "assignee",
      render: (assignee, item) => (
        <Link to={`/admin/setup/staffs/${item?.assigneeId}`}>
          {assignee?.firstName} {assignee?.lastName}
        </Link>
      ),
      renderCsv: (assignee) => `${assignee?.firstName} ${assignee?.lastName}`,
    },

    {
      title: "Create date",
      dataIndex: "createdAt",
      render: (date) => moment(date).format("MMMM Do YYYY"),
      renderCsv: (date) => moment(date).format("MMMM Do YYYY"),
    },
    {
      id: 4,
      title: "",
      key: "action",
      render: (item) => [
        {
          label: (
            <CommonDelete
              values={{
                id: item.id,
                status: item.status,
              }}
              title={item.status === "true" ? "Hide" : "Show"}
              permission={"delete-task"}
              deleteThunk={deleteTask}
              loadThunk={loadAllTaskPaginated}
              query={pageConfig}
              className="bg-white text-black"
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
    dispatch(loadAllTaskPaginated(pageConfig));
  }, [dispatch, pageConfig]);

  return (
    <>
      <Card
        className="max-md:border-0 max-md:bg-white"
        bodyClass="max-md:p-0 "
        headClass="border-none"
        title={"Task"}
        extra={
          <CreateDrawer
            permission={"create-task"}
            title={"Create Task"}
            width={60}
          >
            <AddTask />
          </CreateDrawer>
        }
      >
        <UserPrivateComponent permission={"readAll-task"}>
          <TableComponent
            list={list}
            columns={columns}
            loading={loading}
            total={total}
            setPageConfig={setPageConfig}
            title={"Task List"}
            isSearch
            filters={filters}
          />
        </UserPrivateComponent>
      </Card>
    </>
  );
}
