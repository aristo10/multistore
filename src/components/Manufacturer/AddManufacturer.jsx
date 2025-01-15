import {
  addManufacturer,
  loadALLManufacturer,
} from "@/redux/rtk/features/manufacturer/manufacturerSlice";
import { Button, Form, Input, Typography } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function AddManufacturer() {
  const dispatch = useDispatch();
  const { Title } = Typography;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const resp = await dispatch(addManufacturer(values));

      if (resp.payload.message === "success") {
        setLoading(false);
        form.resetFields();
        dispatch(loadALLManufacturer());
      }
    } catch (error) {
      setLoading(false);
    }
    setLoading(false);
  };

  const onFinishFailed = () => {
    setLoading(false);
  };

  return (
    <>
      <div className=" h-full">
        <Title level={4} className="m-2 text-center">
          Create Manufacturer
        </Title>
        <Form
          form={form}
          layout="vertical"
          style={{ marginLeft: "40px", marginRight: "40px" }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          labelAlign="left"
        >
          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Name"
            name={"name"}
            rules={[
              {
                required: true,
                message: "Please input manufacturer name!",
              },
            ]}
          >
            <Input size="small" placeholder="e.g. company" />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            className="flex justify-center mt-[24px]"
          >
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              shape="round"
            >
              Create Manufacturer
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
