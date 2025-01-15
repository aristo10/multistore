import { loadAllCompany } from "@/redux/rtk/features/CRM/company/companySlice";
import { loadAllContact } from "@/redux/rtk/features/CRM/contact/contactSlice";
import { loadAllOpportunity } from "@/redux/rtk/features/CRM/opportunity/opportunitySlice";
import {
  addSingleTask,
  loadAllTaskPaginated,
} from "@/redux/rtk/features/CRM/task/taskSlice";
import { loadAllTaskStatus } from "@/redux/rtk/features/CRM/taskStatus/taskStatusSlice";
import { loadAllTaskType } from "@/redux/rtk/features/CRM/taskType/taskTypeSlice";
import { loadAllQuote } from "@/redux/rtk/features/quote/quoteSlice";
import { loadAllStaff } from "@/redux/rtk/features/hrm/user/userSlice";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllPriority } from "@/redux/rtk/features/priority/prioritySlice";

export default function AddTask({ createAs }) {
  const [loader, setLoader] = useState(false);
  // selector
  const { list: companyList, loading: companyLoading } = useSelector(
    (state) => state.company,
  );
  const { list: contactList, loading: contactLoading } = useSelector(
    (state) => state.contact,
  );
  const { list: quoteList, loading: quoteLoading } = useSelector(
    (state) => state.quote,
  );
  const { list: opportunityList, loading: opportunityLoading } = useSelector(
    (state) => state.opportunity,
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
  const { list: staffList, loading: staffLoading } = useSelector(
    (state) => state.users,
  );

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  // console.log(priorityList);

  useEffect(() => {
    dispatch(loadAllPriority());
    dispatch(loadAllTaskStatus());
    dispatch(loadAllContact());
    dispatch(loadAllOpportunity());
    dispatch(loadAllCompany());
    dispatch(loadAllTaskType());
    dispatch(loadAllQuote());
    dispatch(loadAllStaff({ query: "all" }));
  }, [dispatch]);

  const onFinish = async (values) => {
    setLoader(true);
    const formData = {
      ...values,
      assigneeId: parseInt(values.assigneeId),
      companyId: parseInt(values.companyId),
      contactId: parseInt(values.contactId),
      opportunityId: parseInt(values.opportunityId),
      quoteId: parseInt(values.quoteId),
      taskTypeId: parseInt(values.taskTypeId),
      priorityId: parseInt(values.priorityId),
      crmTaskStatusId: parseInt(values.crmTaskStatusId),
      type: "crm",
    };

    const resp = await dispatch(addSingleTask(formData));

    if (resp.payload.message === "success") {
      form.resetFields();
      if (createAs?.name) {
        dispatch(createAs.singleLoadThunk(createAs.value));
      } else {
        dispatch(
          loadAllTaskPaginated({
            status: true,
            page: 1,
            count: 10,
          }),
        );
      }
    }
    setLoader(false);
  };

  return (
    <div className="flex justify-center mt-5">
      <Form
        className="w-4/5"
        onFinish={onFinish}
        colon={false}
        layout="vertical"
        initialValues={
          createAs
            ? {
                [createAs.name]: createAs.value,
              }
            : {}
        }
        form={form}
      >
        <Form.Item
          style={{ width: "100%" }}
          label="Task name"
          name="name"
          tooltip="This is a required field"
          rules={[{ required: true, message: "Task name is Required." }]}
        >
          <Input placeholder="Example name" />
        </Form.Item>
        <div className="flex justify-between gap-5">
          <Form.Item
            label="Assignee"
            name={"assigneeId"}
            className="w-full"
            tooltip="This is a required field"
            rules={[{ required: true, message: "Assignee is Required." }]}
          >
            <Select
              style={{ width: "100%" }}
              loading={staffLoading}
              allowClear
              showSearch
              placeholder="assignee name"
            >
              {staffList?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item?.username}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Company" name="companyId" className="w-full">
            <Select
              style={{ width: "100%" }}
              loading={companyLoading}
              allowClear
              disabled={createAs?.name === "companyId"}
              showSearch
              placeholder="Select company Name"
            >
              {companyList &&
                companyList?.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.companyName}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </div>
        <Form.Item label="Contact" name="contactId">
          <Select
            style={{ width: "100%" }}
            loading={contactLoading}
            allowClear
            showSearch
            placeholder="Select contact name"
            disabled={createAs?.name == "contactId"}
          >
            {contactList?.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item?.firstName} {item?.lastName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <div className="flex justify-between gap-5">
          <Form.Item
            label="Opportunity"
            name="opportunityId"
            className="w-full"
          >
            <Select
              style={{ width: "100%" }}
              loading={opportunityLoading}
              allowClear
              showSearch
              placeholder="Select opportunity Name"
              disabled={createAs?.name === "opportunityId"}
            >
              {opportunityList?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.opportunityName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Quote" name="quoteId" className="w-full">
            <Select
              style={{ width: "100%" }}
              loading={quoteLoading}
              allowClear
              showSearch
              placeholder="Select quote Name"
            >
              {quoteList?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.quoteName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <div className="flex justify-between gap-5">
          <Form.Item
            label="Task type"
            name="taskTypeId"
            className="w-full"
            tooltip="This is a required field"
            rules={[{ required: true, message: "Task type is Required." }]}
          >
            <Select
              style={{ width: "100%" }}
              loading={taskTypeLoading}
              allowClear
              showSearch
              placeholder="Select task type"
            >
              {taskTypeList?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.taskTypeName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Task priority"
            name="priorityId"
            className="w-full"
            tooltip="This is a required field"
            rules={[{ required: true, message: "Task priority is Required." }]}
          >
            <Select
              style={{ width: "100%" }}
              loading={priorityLoading}
              allowClear
              showSearch
              placeholder="Select task priority"
            >
              {priorityList?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <Form.Item
          label="Task status"
          name="crmTaskStatusId"
          tooltip="This is a required field"
          rules={[{ required: true, message: "Task status is Required." }]}
        >
          <Select
            style={{ width: "100%" }}
            loading={taskStatusLoading}
            allowClear
            showSearch
            placeholder="Select task status"
          >
            {taskStatusList?.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.taskStatusName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Start date"
          name="startDate"
          tooltip="This is a required field"
          rules={[{ required: true, message: "Start date is Required." }]}
        >
          <DatePicker placeholder="Select start date" />
        </Form.Item>
        <Form.Item
          label="End date"
          name="endDate"
          tooltip="This is a required field"
          rules={[{ required: true, message: "End date is Required." }]}
        >
          <DatePicker placeholder="Select end date" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={4} placeholder="Descriptions" />
        </Form.Item>
        <div className="w-[50%] mx-auto">
          <Form.Item label="">
            <div className="flex items-center gap-2">
              <Button
                className="w-full"
                size={"large"}
                htmlType="submit"
                type="primary"
                loading={loader}
              >
                Create
              </Button>
            </div>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}
