import { loadAllCompany } from "@/redux/rtk/features/CRM/company/companySlice";
import { loadAllContact } from "@/redux/rtk/features/CRM/contact/contactSlice";
import { loadAllOpportunity } from "@/redux/rtk/features/CRM/opportunity/opportunitySlice";
import {
  loadSingleTask,
  updateTask,
} from "@/redux/rtk/features/CRM/task/taskSlice";
import { loadAllTaskStatus } from "@/redux/rtk/features/CRM/taskStatus/taskStatusSlice";
import { loadAllTaskType } from "@/redux/rtk/features/CRM/taskType/taskTypeSlice";
import { loadAllQuote } from "@/redux/rtk/features/quote/quoteSlice";
import { Button, Card, Collapse, DatePicker, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { apiSlice } from "@/redux/rtk/features/apiSlice/apiSlice";

export default function DetailsInfo({ data, loading }) {
  const [form] = Form.useForm();
  const [triggerSave, setTriggerSave] = useState(false);
  const dispatch = useDispatch();
  // selector
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
  const { list: taskTypeList, loading: taskTypeLoading } = useSelector(
    (state) => state.taskType,
  );
  const { list: taskStatusList, loading: taskStatusLoading } = useSelector(
    (state) => state.taskStatus,
  );

  // company profile edit form

  useEffect(() => {
    dispatch(loadAllTaskStatus());
    dispatch(loadAllTaskType());
    dispatch(loadAllContact());
    dispatch(loadAllCompany());
    dispatch(loadAllOpportunity());
    dispatch(loadAllQuote());
  }, [dispatch]);

  const onFinish = async (values) => {
    const formData = {
      ...values,
      companyId: parseInt(values.companyId),
      contactId: parseInt(values.contactId),
      opportunityId: parseInt(values.opportunityId),
      quoteId: parseInt(values.quoteId),
      crmTaskStatusId: parseInt(values.crmTaskStatusId),
      taskTypeId: parseInt(values.taskTypeId),
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
  return (
    <>
      <Card
        bordered={false}
        headStyle={{ display: "none" }}
        bodyStyle={{
          padding: 0,
        }}
      >
        {data && (
          <Form
            form={form}
            colon={false}
            labelCol={{
              xs: {
                span: 24,
              },
              sm: {
                span: 8,
              },
            }}
            wrapperCol={{
              xs: {
                span: 24,
              },
              sm: {
                span: 16,
              },
            }}
            layout="inline"
            onFieldsChange={() => setTriggerSave(true)}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{
              contactId: data?.contactId || "",
              companyId: data?.companyId || "",
              opportunityId: data?.opportunityId || "",
              quoteId: data?.quoteId || "",
              taskTypeId: data?.taskTypeId || "",
              crmTaskStatusId: data?.crmTaskStatusId || "",
              description: data?.description || "",
              startDate: dayjs(data?.startDate) || "",
              endDate: dayjs(data?.endDate) || "",
            }}
          >
            <Collapse className="bg-transparent w-full" bordered={true}>
              <Collapse.Panel
                header={
                  <span className="font-bold text-md dark:text-white">
                    Details
                  </span>
                }
                key="1"
                extra={
                  <>
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
                  </>
                }
              >
                <div className="flex flex-wrap xl:px-10">
                  <div className="w-full xl:w-[50%] flex flex-col gap-2 p-3">
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
                        {taskTypeList.map((item) => (
                          <Select.Option key={item.id} value={item.id}>
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
                        {taskStatusList.map((item) => (
                          <Select.Option key={item.id} value={item.id}>
                            {item?.taskStatusName}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>


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
                        {companyList.map((item) => (
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
                        {contactList.map((item) => (
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
                        {opportunityList.map((item) => (
                          <Select.Option key={item.id} value={item.id}>
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
                    <Form.Item label="Description" name={"description"}>
                      <Input
                        bordered={false}
                        className="md:ml-5"
                        suffix={<BsFillPencilFill />}
                      />
                    </Form.Item>
                  </div>
                </div>
              </Collapse.Panel>
            </Collapse>
          </Form>
        )}
      </Card>
    </>
  );
}
