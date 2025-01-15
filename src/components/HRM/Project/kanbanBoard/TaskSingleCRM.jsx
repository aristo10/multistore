import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearTask,
  deleteTask,
  editTask,
  loadSingleTask,
  updateTask,
} from "@/redux/rtk/features/CRM/task/taskSlice";
import Card from "@/UI/Card";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { apiSlice } from "@/redux/rtk/features/apiSlice/apiSlice";
import { loadAllContact } from "@/redux/rtk/features/CRM/contact/contactSlice";
import { useNavigate } from "react-router-dom";
import { BsFillPencilFill } from "react-icons/bs";
import { loadAllOpportunity } from "@/redux/rtk/features/CRM/opportunity/opportunitySlice";
import { loadAllPriority } from "@/redux/rtk/features/priority/prioritySlice";
import { loadAllTaskStatus } from "@/redux/rtk/features/CRM/taskStatus/taskStatusSlice";
import { loadAllStaff } from "@/redux/rtk/features/hrm/user/userSlice";
import Loader from "@/components/Loader/Loader";
import { loadAllTaskType } from "@/redux/rtk/features/CRM/taskType/taskTypeSlice";
import dayjs from "dayjs";
import { loadAllCompany } from "@/redux/rtk/features/CRM/company/companySlice";
import { loadAllQuote } from "@/redux/rtk/features/quote/quoteSlice";
import CommonDelete from "@/components/CommonUi/CommonDelete";
import CustomButton from "@/UI/Button";

export default function TaskSingleCRM({ id }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [triggerSave, setTriggerSave] = useState(false);

  const { task: data, loading: taskLoading } = useSelector(
    (state) => state.task,
  );
  const { list: ownerList, loading: ownerLoading } = useSelector(
    (state) => state.users,
  );
  const { list: priorityList, loading: priorityLoading } = useSelector(
    (state) => state.priority,
  );
  const { list: taskTypeList, loading: taskTypeLoading } = useSelector(
    (state) => state.taskType,
  );
  const { list: taskStatusList, loading: taskStatusLoading } = useSelector(
    (state) => state.taskStatus,
  );
  const { list: companyList, loading: companyLoading } = useSelector(
    (state) => state.company,
  );
  const { list: contactList, loading: contactLoading } = useSelector(
    (state) => state.contact,
  );
  const { list: opportunityList, loading: opportunityLoading } = useSelector(
    (state) => state.opportunity,
  );
  const { list: quoteList, loading: quoteLoading } = useSelector(
    (state) => state.quote,
  );

  const onFinish = async (values) => {
    const formData = {
      ...values,
      assigneeId: parseInt(values.assigneeId),
      opportunityId: parseInt(values.opportunityId),
      priorityId: parseInt(values.priorityId),
      taskStatusId: parseInt(values.taskStatusId),
    };
    const resp = await dispatch(updateTask({ id: data?.id, values: formData }));
    if (resp.payload.message === "success") {
      dispatch(loadSingleTask(data?.id));
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
    dispatch(loadSingleTask(id));
    return () => {
      clearTask();
    };
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(loadAllOpportunity());
    dispatch(loadAllPriority());
    dispatch(loadAllTaskStatus());
    dispatch(loadAllStaff({ query: "all" }));
    dispatch(loadAllTaskType());
    dispatch(loadAllContact());
    dispatch(loadAllCompany());
    dispatch(loadAllQuote());
  }, [dispatch]);

  return (
    <div className="relative  w-full flex flex-row">
      <div className="w-full overflow-y-auto overflow-x-hidden flex flex-col gap-8">
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
                span: 6,
              }}
              wrapperCol={{
                span: 12,
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
                taskTypeId: data?.taskTypeId || "",
                crmTaskStatusId: data?.crmTaskStatusId || "",
                companyId: data?.companyId || "",
                contactId: data?.contactId || "",
                quoteId: data?.quoteId || "",
                description: data?.description || "",
                startDate: dayjs(data?.startDate) || "",
                endDate: dayjs(data?.endDate) || "",
              }}
            >
              <div className="w-full">
                <div className="flex justify-between items-center px-5 p-3 border-b">
                  <div className="flex gap-2 dark:text-white">
                    <span>Task Name:</span>
                    <span className="font-bold">{data?.name}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {triggerSave && (
                      <Form.Item>
                        <div className="flex items-center gap-4">
                          <Button
                            loading={taskLoading}
                            type="primary"
                            htmlType="submit"
                          >
                            Save
                          </Button>
                          <Button
                            disabled={taskLoading}
                            type="danger"
                            onClick={onFinishFailed}
                          >
                            Cancel
                          </Button>
                        </div>
                      </Form.Item>
                    )}
                    <CommonDelete
                      permission={"delete-task"}
                      values={{
                        status: data?.status,
                        id,
                      }}
                      deleteThunk={deleteTask}
                      icon={
                        <CustomButton
                          className="inline w-auto px-2 py-1 bg-gray-400/10"
                          color="gray"
                        >
                          <span className="text-xs text-gray-500">Delete </span>
                        </CustomButton>
                      }
                      onSuccess={() => {
                        dispatch(editTask(null));
                        dispatch(apiSlice.util.invalidateTags(["Tasks"]));
                      }}
                    />
                  </div>
                </div>
                <div className="flex gap-10 justify-between">
                  <div className="flex flex-col gap-2 p-3 w-full">
                    <Form.Item className="w-full" label="Task Name" name="name">
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
                        {ownerList?.map((item) => (
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
                        {priorityList?.map((item) => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      className="flex flex-col"
                      label="Task Type"
                      name={"taskTypeId"}
                    >
                      <Select
                        bordered={false}
                        className="md:ml-5"
                        loading={taskTypeLoading}
                      >
                        {taskTypeList?.map((item) => (
                          <Select.Option key={item?.id} value={item?.id}>
                            {item?.taskTypeName}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      className="flex flex-col"
                      label="Task Status"
                      name={"crmTaskStatusId"}
                    >
                      <Select
                        bordered={false}
                        className="md:ml-5"
                        loading={taskStatusLoading}
                      >
                        {taskStatusList?.map((item) => (
                          <Select.Option key={item.id} value={item.id}>
                            {item?.taskStatusName}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>

                  <div className="flex flex-col gap-2 p-3 w-full">
                    <Form.Item
                      className="flex flex-col"
                      label="Company"
                      name={"companyId"}
                    >
                      <Select
                        bordered={false}
                        className="md:ml-5"
                        loading={companyLoading}
                      >
                        {companyList?.map((item) => (
                          <Select.Option key={item.id} value={item.id}>
                            {item?.companyName}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      className="flex flex-col"
                      label="Contact"
                      name={"contactId"}
                    >
                      <Select
                        bordered={false}
                        className="md:ml-5"
                        loading={contactLoading}
                      >
                        {contactList?.map((item) => (
                          <Select.Option key={item.id} value={item.id}>
                            {item?.firstName} {item?.lastName}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      className="flex flex-col"
                      label="Opportunity"
                      name={"opportunityId"}
                    >
                      <Select
                        bordered={false}
                        className="md:ml-5"
                        loading={opportunityLoading}
                      >
                        {opportunityList?.map((item) => (
                          <Select.Option key={item?.id} value={item?.id}>
                            {item.opportunityName}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      className="flex flex-col"
                      label="Quote"
                      name={"quoteId"}
                    >
                      <Select
                        bordered={false}
                        className="md:ml-5"
                        loading={quoteLoading}
                      >
                        {quoteList?.map((item) => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.quoteName}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item label="Start date" name="startDate">
                      <DatePicker
                        bordered={false}
                        suffix={<BsFillPencilFill />}
                        className="md:ml-5"
                      />
                    </Form.Item>
                    <Form.Item label="End date" name="endDate">
                      <DatePicker
                        bordered={false}
                        suffix={<BsFillPencilFill />}
                        className="md:ml-5"
                      />
                    </Form.Item>
                  </div>
                </div>
                <Form.Item label="Description" name={"description"}>
                  <Input.TextArea bordered={false} className="md:ml-5" />
                </Form.Item>
              </div>
            </Form>
          </Card>
        ) : (
          <Loader className="h-full" />
        )}
      </div>
    </div>
  );
}
