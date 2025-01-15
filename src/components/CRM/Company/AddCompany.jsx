import {
  addCompany,
  loadAllCompany,
} from "@/redux/rtk/features/CRM/company/companySlice";
import { loadAllCompanyType } from "@/redux/rtk/features/CRM/companyType/companyTypeSlice";
import { loadAllIndustry } from "@/redux/rtk/features/CRM/industry/industrySlice";
import { loadAllStaff } from "@/redux/rtk/features/hrm/user/userSlice";
import { Button, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AddCompany() {
  const [form] = Form.useForm();
  const [loader, setLoader] = useState(false);
  const { list: industryList, loading: industryLoading } = useSelector(
    (state) => state.industry,
  );
  const { list: companyTypeList, loading: companyTypeLoading } = useSelector(
    (state) => state.companyType,
  );
  const { list: ownerList, loading: ownerLoading } = useSelector(
    (state) => state.users,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllIndustry());
    dispatch(loadAllCompanyType());
    dispatch(loadAllStaff({ query: "all" }));
  }, [dispatch]);

  const onFinish = async (values) => {
    setLoader(true);
    const formData = {
      ...values,
      companySize: Number(values.companySize),
      annualRevenue: Number(values.annualRevenue),
    };
    const resp = await dispatch(addCompany(formData));
    if (resp.payload.message === "success") {
      form.resetFields();
      dispatch(loadAllCompany());
    }
    setLoader(false);
  };

  return (
    <div className="flex justify-center mt-5">
      <Form
        onFinish={onFinish}
        colon={false}
        layout="vertical"
        form={form}
        style={{
          width: "80%",
        }}
      >
        <Form.Item
          label="Company name"
          name="companyName"
          tooltip="This is a required field"
          rules={[{ required: true, message: "Company name is Required." }]}
        >
          <Input placeholder="XYZ Limited" />
        </Form.Item>

        <Form.Item
          label="Company owner"
          name="companyOwnerId"
          tooltip="This is a required field"
          rules={[
            { required: true, message: "Company Owner name is Required." },
          ]}
        >
          <Select
            style={{ width: "100%" }}
            loading={ownerLoading}
            allowClear
            showSearch
            placeholder="Select company owner name"
          >
            {ownerList?.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item?.username}
              </Select.Option>
            ))}
          </Select>
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

        <Form.Item label="Company type" name="companyTypeId">
          <Select
            style={{ width: "100%" }}
            loading={companyTypeLoading}
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
            placeholder="Select Company Type"
          >
            {companyTypeList?.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.companyTypeName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Company size" name="companySize">
          <Input placeholder="10" />
        </Form.Item>

        <Form.Item label="Annual revenue" name="annualRevenue">
          <Input placeholder="100000" />
        </Form.Item>

        <Form.Item label="Phone" name="phone">
          <Input placeholder="+01 454884657" />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input placeholder="xyz@xyz.com" />
        </Form.Item>

        <Form.Item label="Website" name="website">
          <Input placeholder="https://xyz.com" />
        </Form.Item>

        <Form.Item label="Linkedin" name="linkedin">
          <Input placeholder="https://linkedin.com/in/xyz" />
        </Form.Item>

        <Form.Item label="Twitter" name="twitter">
          <Input placeholder="https://twitter.com/xyz" />
        </Form.Item>

        <Form.Item label="Instagram" name="instagram">
          <Input placeholder="https://instagram.com/xyz" />
        </Form.Item>

        <Form.Item label="Facebook" name="facebook">
          <Input placeholder="https://facebook.com/xyz" />
        </Form.Item>

        <Form.Item label="Billing street" name="billingStreet">
          <Input placeholder=" Xyz road " />
        </Form.Item>

        <Form.Item label="Billing city" name="billingCity">
          <Input placeholder="LA" />
        </Form.Item>

        <Form.Item label="Billing zip code" name="billingZipCode">
          <Input placeholder="45004" />
        </Form.Item>

        <Form.Item label="Billing state" name="billingState">
          <Input placeholder="CA" />
        </Form.Item>

        <Form.Item label="Billing country" name="billingCountry">
          <Input placeholder="USA" />
        </Form.Item>

        <Form.Item label="Shipping street" name="shippingStreet">
          <Input placeholder=" zyx road" />
        </Form.Item>

        <Form.Item label="Shipping city" name="shippingCity">
          <Input placeholder="Mancester City" />
        </Form.Item>

        <Form.Item label="Shipping zip code" name="shippingZipCode">
          <Input placeholder="45871" />
        </Form.Item>

        <Form.Item label="Shipping state" name="shippingState">
          <Input placeholder="ManCity" />
        </Form.Item>

        <Form.Item label="Shipping country" name="shippingCountry">
          <Input placeholder="UK" />
        </Form.Item>

        <Form.Item>
          <div className="flex items-center gap-2">
            <Button
              size={"large"}
              htmlType="submit"
              type="primary"
              loading={loader}
            >
              Create
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
