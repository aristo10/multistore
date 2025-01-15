import Loader from "@/components/Loader/Loader";
import { loadAllContactPaginated } from "@/redux/rtk/features/CRM/contact/contactSlice";
import { loadAllOpportunity } from "@/redux/rtk/features/CRM/opportunity/opportunitySlice";
import {
  deleteTask,
  loadSingleTask,
  updateTask,
} from "@/redux/rtk/features/CRM/task/taskSlice";
import { loadAllTaskStatus } from "@/redux/rtk/features/CRM/taskStatus/taskStatusSlice";
import { loadAllStaff } from "@/redux/rtk/features/hrm/user/userSlice";
import { Button, Card, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loadAllPriority } from "@/redux/rtk/features/priority/prioritySlice";
import { apiSlice } from "@/redux/rtk/features/apiSlice/apiSlice";

export default function TaskProfile({ data, loading }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [triggerSave, setTriggerSave] = useState(false);

  const { list: ownerList, loading: ownerLoading } = useSelector(
    (state) => state.users,
  );
  const { list: priorityList, loading: priorityLoading } = useSelector(
    (state) => state.priority,
  );

  // delete contact
  const onDelete = async () => {
    const result = window.confirm("Are you sure you want to delete?");
    if (result) {
      const resp = await dispatch(deleteTask(id));
      if (resp.payload.message === "success") {
        navigate(-1);
        dispatch(loadAllContactPaginated());
      }
    }
  };

  // contact profile edit form

  const onFinish = async (values) => {
    const formData = {
      ...values,
      assigneeId: parseInt(values.assigneeId),
      opportunityId: parseInt(values.opportunityId),
      priorityId: parseInt(values.priorityId),
      taskStatusId: parseInt(values.taskStatusId),
    };
    const resp = await dispatch(updateTask({ id: data.id, values: formData }));
    if (resp.payload.message === "success") {
      dispatch(loadSingleTask(data.id));
      dispatch(apiSlice.util.invalidateTags(["Tasks"]));
      setTriggerSave(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    setTriggerSave(false);
    form.resetFields();
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    dispatch(loadAllOpportunity());
    dispatch(loadAllPriority());
    dispatch(loadAllTaskStatus());
    dispatch(loadAllStaff({ query: "all" }));
  }, [dispatch]);

  return (
    <>
      {data ? (
        <Card
          bordered
          headStyle={{ display: "none" }}
          bodyStyle={{ padding: 0 }}
        >
          <Form
            form={form}
            colon={false}
            labelCol={{
              span: 2,
            }}
            wrapperCol={{
              span: 8,
            }}
            layout="inline"
            onFieldsChange={() => setTriggerSave(true)}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{
              name: data?.name || "",
              assigneeId: data?.assigneeId || "",
              opportunityId: data?.opportunityId || "",
              taskStatusId: data?.taskStatusId || "",
              priorityId: data?.priorityId || "",
            }}
          >
            <div className="w-full">
              <div className="flex justify-between items-center px-5 p-3 border-b">
                <div className="flex gap-2 dark:text-white">
                  <span>Task Name:</span>
                  <span className="font-bold">{data.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {triggerSave && (
                    <Form.Item>
                      <div className="flex items-center gap-4">
                        <Button type="primary" htmlType="submit">
                          Save
                        </Button>
                        <Button
                          loading={loading}
                          type="danger"
                          onClick={onFinishFailed}
                        >
                          Cancel
                        </Button>
                      </div>
                    </Form.Item>
                  )}
                  <Button danger onClick={onDelete}>
                    Delete
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-2 p-3">
                <Form.Item label="Task Name" name="name">
                  <Input
                    bordered={false}
                    suffix={<BsFillPencilFill />}
                    className="md:ml-5"
                  />
                </Form.Item>
                <Form.Item
                  className="flex flex-col"
                  label="Assignee"
                  name={"assigneeId"}
                  tooltip="Change the assignee of this Task"
                >
                  <Select
                    bordered={false}
                    loading={ownerLoading}
                    className="md:ml-5"
                  >
                    {ownerList.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item?.firstName} {item?.lastName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  className="flex flex-col"
                  label="Task Priority"
                  name={"priorityId"}
                >
                  <Select
                    bordered={false}
                    loading={priorityLoading}
                    className="md:ml-5"
                  >
                    {priorityList.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>
          </Form>
        </Card>
      ) : (
        <Loader />
      )}
    </>
  );
}
