import { addTicket } from "@/redux/rtk/features/CRM/ticket/ticketSlice";
import { loadAllTicketCategory } from "@/redux/rtk/features/CRM/ticketCategory/ticketCategorySlice";
import { InboxOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Upload } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadAllPriority } from "@/redux/rtk/features/priority/prioritySlice";

const userId = localStorage.getItem("id");

const { Dragger } = Upload;
const { Option } = Select;

const CreateTicket = () => {
  const { loading: cLoading, list: cList } = useSelector(
    (state) => state.ticketCategory,
  );

  const { loading: pLoading, list: pList } = useSelector(
    (state) => state.priority,
  );

  const { loading: tLoading } = useSelector((state) => state.ticket);

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadAllTicketCategory());
    dispatch(loadAllPriority());
  }, [dispatch]);

  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append("customerId", parseInt(userId));
      formData.append("email", values.email);
      formData.append("subject", values.subject);
      formData.append("description", values.description);
      formData.append("ticketCategoryId", values.ticketCategoryId);
      formData.append("priorityId", values.priorityId);

      if (values.files) {
        for (let i = 0; i < values.files.length; i++) {
          formData.append("files[]", values.files[i].originFileObj);
        }
      }

      // Submit the formData object to the server
      const resp = await dispatch(addTicket(formData));

      if (resp.payload.message === "success") {
        form.resetFields();
        navigate(`/admin/crm/ticket/${resp.payload.data.ticketId}`);
      }
    } catch (error) {}
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div className="max-w-screen-md mx-auto p-5 mt-1">
        <div className="text-center mb-8  ">
          <p className="mt-4 text-sm leading-7 text-gray-500 font-regular uppercase">
            Support
          </p>
          <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-indigo-700">
            CREATE A TICKET
          </h3>
        </div>

        <Form
          name="ticketForm"
          className="w-full bg-gray-50  p-5 rounded-lg"
          onFinish={onFinish}
          form={form}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            name="email"
            label="Email Address"
            tooltip="We'll use this email to contact you"
          >
            <Input placeholder="youremail@something.com" />
          </Form.Item>
          <Form.Item
            name="ticketCategoryId"
            label="Ticket Category"
            rules={[
              {
                required: true,
                message: "Please select the ticket category",
              },
            ]}
          >
            <Select loading={cLoading} placeholder="Select a category">
              {cList?.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.ticketCategoryName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="priorityId"
            label="Priority"
            rules={[
              {
                required: true,
                message: "Please select the priority",
              },
            ]}
          >
            <Select loading={pLoading} placeholder="Select a priority">
              {pList?.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="subject"
            label="Subject"
            rules={[
              {
                required: true,
                message: "Please enter the subject",
              },
            ]}
          >
            <Input placeholder="Fix issue" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please enter the description",
              },
            ]}
          >
            <Input.TextArea rows={4} placeholder="In the ticket" />
          </Form.Item>

          <Form.Item
            name="files"
            label="Attachments"
            valuePropName="fileList"
            getValueFromEvent={(e) => e && e.fileList}
          >
            <Dragger
              accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
              multiple={true}
              beforeUpload={() => false}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Drag and drop a files or click to select a files
              </p>
              <p className="ant-upload-hint">
                Supported files types: PNG, JPG, JPEG, PDF
              </p>
            </Dragger>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={tLoading}
            >
              Create Ticket
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default CreateTicket;
