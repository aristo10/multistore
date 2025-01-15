import Card from "@/UI/Card";
import {
  deleteCompany,
  loadSingleCompany,
  updateCompany,
} from "@/redux/rtk/features/CRM/company/companySlice.js";
import { loadAllStaff } from "@/redux/rtk/features/hrm/user/userSlice";
import usePermissions from "@/utils/usePermissions";
import { Button, Form, Input, Select, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import ImageUploadCrm from "../UI/ImageUploadCrm";
import Loader from "@/components/Loader/Loader";

export default function CompanyProfile({ data, loading }) {
  const [form] = Form.useForm();
  const [triggerSave, setTriggerSave] = useState(false);
  const { list: ownerList, loading: ownerLoading } = useSelector(
    (state) => state.users
  );
  const { CompanyId: id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onDelete = async () => {
    var result = window.confirm("Are you sure you want to delete?");
    if (result) {
      const resp = await dispatch(deleteCompany(id));
      if (resp.payload.message === "success") {
        navigate(-1);
      }
    }
  };

  // company profile edit form
  const { permissions } = usePermissions();
  const canEdit = permissions?.includes("update-company");
  const onFinish = async (values) => {
    const resp = await dispatch(updateCompany({ id, values }));
    if (resp.payload.message === "success") {
      dispatch(loadSingleCompany(id));
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    dispatch(loadAllStaff({ query: "all" }));
  }, [dispatch]);
  return (
    <>
      
        {data ? (
          <Card className='mb-4'>
            <Form
              form={form}
              colon={false}
              disabled={!canEdit}
              labelCol={{
                span: 2,
              }}
              wrapperCol={{
                span: 8,
              }}
              layout='inline'
              onFieldsChange={() => setTriggerSave(true)}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              initialValues={{
                companyOwnerId: data.companyOwnerId,
                companyName: data?.companyName,
                website: data?.website,
                phone: data?.phone,
                email: data?.email,
              }}
            >
              <div className='w-full'>
                <div className='flex justify-between items-center px-5 p-3'>
                  <div className='flex items-end gap-5'>
                    <ImageUploadCrm
                      data={data}
                      updateThunk={updateCompany}
                      loadThunk={loadSingleCompany}
                    />
                    <div className='flex flex-col dark:text-white'>
                      <span className='font-bold'>{data.companyName}</span>
                      {data.website && (
                        <Link target='_blank' to={"https://" + data.website}>
                          {data.website}
                        </Link>
                      )}
                      {data.phone}
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    {triggerSave && (
                      <Form.Item>
                        <div className='flex items-center gap-4'>
                          <Button type='primary' htmlType='submit'>
                            Save
                          </Button>
                          <Button
                            loading={loading}
                            type='danger'
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
                <div className='flex flex-col gap-2 p-3'>
                  <Form.Item
                    className='flex flex-col'
                    label='Company Owner'
                    name={"companyOwnerId"}
                  >
                    <Select
                      bordered={false}
                      loading={ownerLoading}
                      className='md:ml-5'
                    >
                      {ownerList?.map((item) => (
                        <Select.Option key={item.id} value={item.id}>
                          {item?.firstName} {item?.lastName}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item label='Company Name' name='companyName'>
                    <Input
                      bordered={false}
                      suffix={<BsFillPencilFill />}
                      className='md:ml-5'
                    />
                  </Form.Item>
                  <Form.Item label='Website' name='website'>
                    <Input
                      bordered={false}
                      suffix={<BsFillPencilFill />}
                      className='md:ml-5'
                    />
                  </Form.Item>

                  <Form.Item label='Email' name={"email"}>
                    <Input
                      bordered={false}
                      suffix={<BsFillPencilFill />}
                      className='md:ml-5'
                    />
                  </Form.Item>

                  <Form.Item label='Phone Number' name={"phone"}>
                    <Input
                      bordered={false}
                      suffix={<BsFillPencilFill />}
                      className='md:ml-5'
                    />
                  </Form.Item>
                </div>
              </div>
            </Form>
          </Card>
        ): <Loader/>}
     
    </>
  );
}
