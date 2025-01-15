import {
  addStore,
  loadAllStore,
  loadAllStorePaginated,
} from "@/redux/rtk/features/store/storeSlice";
import { Button, Card, Form, Input, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import UploadMany from "../Card/UploadMany";

export default function AddStore() {
  const dispatch = useDispatch();
  const { Title } = Typography;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onClick = () => {
    setLoading(true);
  };

  const onFinish = async (values) => {
    const newValues = {
      ...values,
      startDate: moment(values.startDate).format("YYYY-MM-DD"),
      endDate: moment(values.endDate).format("YYYY-MM-DD"),
    };
    try {
      const resp = await dispatch(addStore(newValues));

      if (resp.payload.message === "success") {
        form.resetFields();
        dispatch(
          loadAllStorePaginated({
            page: 1,
            count: 10,
            status: "true",
          })
        );
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const onFinishFailed = () => {
    setLoading(false);
  };

  return (
    <Fragment>
      <div className=' h-full'>
        <Form
          form={form}
          layout='vertical'
          className='sm:mx-10'
          initialValues={{}}
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
          <Form.Item label='Description' name='description'>
            <TextArea size='small' rows={4} />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            className='flex justify-center mt-[24px]'
          >
            <Button
              loading={loading}
              type='primary'
              htmlType='submit'
              shape='round'
              onClick={onClick}
            >
              Create Store
            </Button>
          </Form.Item>
        </Form>

        <Card
          title={<span className='text-center font-bold'>Import From CSV</span>}
          className='mt-5'
        >
          <Title level={4} className='m-2 text-center'>
            Import From CSV
          </Title>
          <UploadMany
            title={"Demo Store"}
            demoData={[
              ["name", "email", "phone", "address", "city", "description"],
              [
                "Store 1",
                "demo email",
                "123456789",
                "demo address",
                "demo city",
                "demo description",
              ],
              [
                "Store 2",
                "demo email",
                "123456789",
                "demo address",
                "demo city",
                "demo description",
              ],
            ]}
            urlPath={"store"}
            loadAllThunk={loadAllStore}
          />
        </Card>
      </div>
    </Fragment>
  );
}
