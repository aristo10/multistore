import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import { loadAllCompany } from "@/redux/rtk/features/CRM/company/companySlice";
import {
  addContact,
  loadAllContactPaginated,
} from "@/redux/rtk/features/CRM/contact/contactSlice";
import { loadAllContactSource } from "@/redux/rtk/features/CRM/contactSource/contactSourceSlice";
import { loadAllContactStage } from "@/redux/rtk/features/CRM/contactStage/contactStageSlice";
import { loadAllIndustry } from "@/redux/rtk/features/CRM/industry/industrySlice";
import { loadAllStaff } from "@/redux/rtk/features/hrm/user/userSlice";
import { Button, DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AddContact({ onClose, createAs }) {
  // selector
  const { list: companyList, loading: companyLoading } = useSelector(
    (state) => state.company,
  );
  const { list: contactSourceList, loading: contactSourceLoading } =
    useSelector((state) => state.contactSource);
  const { list: contactStageList, loading: contactStageLoading } = useSelector(
    (state) => state.contactStage,
  );
  const { list: industryList, loading: industryLoading } = useSelector(
    (state) => state.industry,
  );
  const { list: staffList, loading: staffLoading } = useSelector(
    (state) => state.users,
  );
  const { loading: contactLoading } = useSelector((state) => state.contact);

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllContactSource());
    dispatch(loadAllCompany());
    dispatch(loadAllContactStage());
    dispatch(loadAllIndustry());
    dispatch(loadAllStaff({ query: "all" }));
  }, [dispatch]);

  const onFinish = async (values) => {
    const formData = {
      ...values,
      dateOfBirth: dayjs(values.dateOfBirth).format("YYYY-MM-DD"),
      contactOwnerId: parseInt(values.contactOwnerId),
      companyId: parseInt(values.companyId),
      industryId: parseInt(values.industryId),
      contactSourceId: parseInt(values.contactSourceId),
      contactStageId: parseInt(values.contactStageId),
    };

    const resp = await dispatch(addContact(formData));
    if (resp.payload.message === "success") {
      form.resetFields();
      if (createAs) {
        dispatch(createAs.singleLoadThunk(createAs.id));
      } else {
        dispatch(
          loadAllContactPaginated({
            page: 1,
            count: 10,
          }),
        );
      }
    }
  };
  const onCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <div className="flex justify-center mt-5">
      <UserPrivateComponent permission="create-contact">
        <Form
          className="w-4/5"
          onFinish={onFinish}
          colon={false}
          layout="vertical"
          form={form}
          initialValues={
            createAs
              ? {
                  [createAs.name]: createAs.value,
                }
              : {}
          }
        >
          <div className="flex justify-between gap-5">
            <div className="w-1/2">
              <Form.Item
                style={{ width: "100%" }}
                label="Email"
                name="email"
                tooltip="This is a required field"
                rules={[{ required: true, message: "Email is Required." }]}
              >
                <Input placeholder="example@email.com" />
              </Form.Item>

              <Form.Item
                label="First name"
                name="firstName"
                rules={[{ required: true, message: "First Name is Required." }]}
              >
                <Input placeholder="Jhon" />
              </Form.Item>

              <Form.Item
                label="Last name"
                name="lastName"
                rules={[{ required: true, message: "Last Name is Required." }]}
              >
                <Input placeholder="Doe" />
              </Form.Item>

              <Form.Item label="Birthday" name="dateOfBirth">
                <DatePicker placeholder="Select birthday" />
              </Form.Item>

              <Form.Item
                label="Contact owner"
                name={"contactOwnerId"}
                rules={[
                  {
                    required: true,
                    message: "Please select contact owner",
                  },
                ]}
              >
                <Select
                  style={{ width: "100%" }}
                  loading={staffLoading}
                  allowClear
                  showSearch
                  placeholder="Select contact owner name"
                >
                  {staffList?.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item?.username}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="Company" name="companyId">
                <Select
                  style={{ width: "100%" }}
                  loading={companyLoading}
                  allowClear
                  showSearch
                  placeholder="Select company Name"
                  disabled={createAs?.name === "companyId"}
                >
                  {companyList?.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.companyName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="Job title" name="jobTitle">
                <Input placeholder="CEO" />
              </Form.Item>

              <Form.Item label="Phone number" name="phone">
                <Input placeholder="+8801700000000" />
              </Form.Item>

              <Form.Item label="Department" name="department">
                <Input placeholder="IT" />
              </Form.Item>

              <Form.Item label="Twitter" name="twitter">
                <Input placeholder="http://twitter.com/jhon" />
              </Form.Item>
              <Form.Item label="Linkedin" name="linkedin">
                <Input placeholder="http://linkedin.com/jhon" />
              </Form.Item>
              <Form.Item label="Present address" name="presentAddress">
                <Input placeholder="Enter present address" />
              </Form.Item>
            </div>

            <div className="w-1/2">
              <Form.Item label="Present city" name="presentCity">
                <Input placeholder="Dhaka" />
              </Form.Item>
              <Form.Item label="Present zip code" name="presentZipCode">
                <Input placeholder="1361" />
              </Form.Item>

              <Form.Item label="Present state" name="presentState">
                <Input placeholder="Dhaka" />
              </Form.Item>
              <Form.Item label="Present country" name="presentCountry">
                <Input placeholder="Bangladesh" />
              </Form.Item>

              <Form.Item label="Permanent address" name="permanentAddress">
                <Input placeholder="Enter permanent address" />
              </Form.Item>

              <Form.Item label="Permanent city" name="permanentCity">
                <Input placeholder="Dhaka" />
              </Form.Item>
              <Form.Item label="Permanent zip code" name="permanentZipCode">
                <Input placeholder="Dhaka" />
              </Form.Item>

              <Form.Item label="Permanent state" name="permanentState">
                <Input placeholder="Dhaka" />
              </Form.Item>
              <Form.Item label="Permanent country" name="permanentCountry">
                <Input placeholder="Bangladesh" />
              </Form.Item>

              <Form.Item label="Industry" name="industryId">
                <Select
                  style={{ width: "100%" }}
                  loading={industryLoading}
                  allowClear
                  showSearch
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase())
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                  placeholder="Select Industry"
                >
                  {industryList?.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.industryName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="Contact source" name="contactSourceId">
                <Select
                  style={{ width: "100%" }}
                  loading={contactSourceLoading}
                  allowClear
                  showSearch
                  placeholder="Select contact Source"
                >
                  {contactSourceList?.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.contactSourceName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="Contact stage" name="contactStageId">
                <Select
                  style={{ width: "100%" }}
                  loading={contactStageLoading}
                  allowClear
                  showSearch
                  placeholder="Select contact stage"
                >
                  {contactStageList?.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.contactStageName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>

          <Form.Item label="Description" name="description">
            <Input.TextArea placeholder="Describe about contact" />
          </Form.Item>

          <Form.Item label="">
            <div className="flex items-center gap-2">
              <Button
                size={"large"}
                htmlType="submit"
                type="primary"
                loading={contactLoading}
              >
                Create
              </Button>
              <Button
                size={"large"}
                htmlType="submit"
                type="danger"
                onClick={onCancel}
              >
                Cancel
              </Button>
            </div>
          </Form.Item>
        </Form>
      </UserPrivateComponent>
    </div>
  );
}
