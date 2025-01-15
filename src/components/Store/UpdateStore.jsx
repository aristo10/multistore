import {
  loadAllStore,
  updateStore,
} from "@/redux/rtk/features/store/storeSlice";
import { EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function UpdateStore({ data }) {
  const dispatch = useDispatch();
  const { id } = data;
  const [form] = Form.useForm();
  const [loader, setLoader] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onFinish = async (values) => {
    setLoader(true);
    const resp = await dispatch(updateStore({ id: id, values }));
    if (resp.payload.message == "success") {
      setIsModalOpen(false);
      setLoader(false);
      dispatch(loadAllStore());
    }
  };

  const onFinishFailed = () => {
    setLoader(false);
  };

  return (
    <>
      <div
        onClick={showModal}
        className='flex items-center gap-2 cursor-pointer'
      >
        <EditOutlined className='gray-600  rounded-md' />
        Edit
      </div>
      <Modal
        title='Update Store'
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={false}
      >
        <Form
          form={form}
          layout='vertical'
          className='sm:mx-10'
          initialValues={data}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
          labelAlign='left'
        >
          <Form.Item
            style={{ marginBottom: "10px" }}
            label='Store name'
            name={"name"}
            rules={[
              {
                required: true,
                message: "Please enter store name!",
              },
            ]}
          >
            <Input size='small' />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label='Email'
            name={"email"}
            rules={[
              {
                required: true,
                message: "Please enter email!",
              },
            ]}
          >
            <Input size='small' />
          </Form.Item>

          <Form.Item
            label='Phone'
            name='phone'
            rules={[
              {
                required: true,
                message: "Please input Phone!",
              },
            ]}
          >
            <Input size='small' />
          </Form.Item>
          <Form.Item
            label='Address'
            name='address'
            rules={[
              {
                required: true,
                message: "Please input Address!",
              },
            ]}
          >
            <Input size='small' />
          </Form.Item>
          <Form.Item
            label='City'
            name='city'
            rules={[
              {
                required: true,
                message: "Please input City!",
              },
            ]}
          >
            <Input size='small' />
          </Form.Item>
          <Form.Item
            label='Description'
            name='description'
            rules={[
              {
                required: true,
                message: "Please input Description!",
              },
            ]}
          >
            <TextArea size='small' />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            className='flex justify-center mt-[24px]'
          >
            <Button
              loading={loader}
              type='primary'
              htmlType='submit'
              shape='round'
            >
              Update Store
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
