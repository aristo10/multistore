import { loadAllCompany } from "@/redux/rtk/features/CRM/company/companySlice";
import { loadAllContact } from "@/redux/rtk/features/CRM/contact/contactSlice";
import {
  addOpportunity,
  loadAllOpportunity,
  updateOpportunity,
} from "@/redux/rtk/features/CRM/opportunity/opportunitySlice";
import { loadAllOpportunitySource } from "@/redux/rtk/features/CRM/opportunitySource/opportunitySourceSlice";
import { loadAllOpportunityStage } from "@/redux/rtk/features/CRM/opportunityStage/opportunityStageSlice";
import { loadAllOpportunityType } from "@/redux/rtk/features/CRM/opportunityType/opportunityTypeSlice";
import { Button, DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllStaff } from "@/redux/rtk/features/hrm/user/userSlice";

export default function AddOpportunity({
  onClose,
  createAs,
  edit,
  singleLoad,
}) {
  // selector
  const { list: companyList, loading: companyLoading } = useSelector(
    (state) => state.company,
  );

  const { list: opportunitySourceList, loading: opportunitySourceLoading } =
    useSelector((state) => state.opportunitySource);
  const { list: opportunityStageList, loading: opportunityStageLoading } =
    useSelector((state) => state.opportunityStage);
  const { list: opportunityTypeList, loading: opportunityTypeLoading } =
    useSelector((state) => state.opportunityType);
  const { list: staffList, loading: staffLoading } = useSelector(
    (state) => state.users,
  );
  const { list: contactList, loading: contactLoading } = useSelector(
    (state) => state.contact,
  );
  const { loading: opportunityLoading } = useSelector(
    (state) => state.opportunity,
  );

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllOpportunitySource());
    dispatch(loadAllOpportunityType());
    dispatch(loadAllCompany());
    dispatch(loadAllOpportunityStage());
    dispatch(loadAllContact());
    dispatch(loadAllStaff({ query: "all" }));
  }, [dispatch]);

  const onFinish = async (values) => {
    const formData = {
      ...values,
      opportunityCreateDate: dayjs(values.opportunityCreateDate).format(
        "YYYY-MM-DD",
      ),
      opportunityCloseDate: dayjs(values.opportunityCloseDate).format(
        "YYYY-MM-DD",
      ),
      opportunityOwnerId: parseInt(values.opportunityOwnerId),
      companyId: parseInt(values.companyId),
      contactId: parseInt(values.contactId),
      opportunityTypeId: parseInt(values.opportunityTypeId),
      opportunityStageId: parseInt(values.opportunityStageId),
      opportunitySourceId: parseInt(values.opportunitySourceId),
    };

    if (edit) {
      const resp = await dispatch(
        updateOpportunity({ id: edit.id, values: formData }),
      );
      if (resp.payload.message === "success") {
        if (singleLoad?.thunk) {
          dispatch(singleLoad.thunk(singleLoad.id));
        }

        onClose();
      }
    } else {
      const resp = await dispatch(addOpportunity(formData));
      if (resp.payload.message === "success") {
        form.resetFields();
        if (createAs?.name) {
          dispatch(createAs.singleLoadThunk(createAs.value));
        } else {
          dispatch(loadAllOpportunity());
        }
        onClose();
      }
    }
  };

  const onCancel = () => {
    form.resetFields();
    onClose();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex justify-center mt-5">
      <Form
        className="w-4/5"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        colon={false}
        layout="vertical"
        form={form}
        initialValues={
          createAs
            ? {
                [createAs.name]: createAs.value,
              }
            : edit
              ? {
                  opportunityName: edit?.opportunityName,
                  amount: edit?.amount,
                  opportunityOwnerId: edit?.opportunityOwnerId,
                  contactId: edit?.contactId,
                  companyId: edit?.companyId,
                  opportunityTypeId: edit?.opportunityTypeId || "",
                  opportunityStageId: edit?.opportunityStageId || "",
                  opportunitySourceId: edit?.opportunitySourceId || "",
                  nextStep: edit?.nextStep || "",
                  competitors: edit?.competitors || "",
                  description: edit?.description || "",
                  opportunityCreateDate:
                    dayjs(edit?.opportunityCreateDate) || "",
                  opportunityCloseDate: dayjs(edit?.opportunityCloseDate) || "",
                }
              : {}
        }
      >
        <Form.Item
          style={{ width: "100%" }}
          label="Name"
          name="opportunityName"
          tooltip="This is a required field"
          rules={[{ required: true, message: "Opportunity Name is Required." }]}
        >
          <Input placeholder="Test" />
        </Form.Item>
        <Form.Item label="Opportunity owner" name={"opportunityOwnerId"}>
          <Select
            style={{ width: "100%" }}
            loading={staffLoading}
            allowClear
            showSearch
            placeholder="Select Opportunity owner name"
          >
            {staffList?.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item?.username}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Amount" name="amount">
          <Input placeholder="10000" />
        </Form.Item>

        <Form.Item label="Next step" name="nextStep">
          <Input placeholder="Next" />
        </Form.Item>

        <Form.Item label="Opportunity create date" name="opportunityCreateDate">
          <DatePicker placeholder="Select opportunity create date" />
        </Form.Item>
        <Form.Item label="Opportunity Close Date" name="opportunityCloseDate">
          <DatePicker placeholder="Select opportunity create date" />
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

        <Form.Item label="Contact" name="contactId">
          <Select
            style={{ width: "100%" }}
            loading={contactLoading}
            allowClear
            showSearch
            placeholder="Select Contact"
            disabled={createAs?.name === "contactId"}
          >
            {contactList?.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item?.firstName} {item?.lastName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Competitors" name="competitors">
          <Input placeholder="Text" />
        </Form.Item>

        <Form.Item label="Opportunity type" name="opportunityTypeId">
          <Select
            style={{ width: "100%" }}
            loading={opportunityTypeLoading}
            allowClear
            showSearch
            placeholder="Select opportunity type"
          >
            {opportunityTypeList?.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.opportunityTypeName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Opportunity source" name="opportunitySourceId">
          <Select
            style={{ width: "100%" }}
            loading={opportunitySourceLoading}
            allowClear
            showSearch
            placeholder="Select contact Source"
          >
            {opportunitySourceList?.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.opportunitySourceName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Opportunity stage" name="opportunityStageId">
          <Select
            style={{ width: "100%" }}
            loading={opportunityStageLoading}
            allowClear
            showSearch
            placeholder="Select contact stage"
          >
            {opportunityStageList?.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.opportunityStageName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea placeholder="Describe about contact" />
        </Form.Item>

        <Form.Item label="">
          <div className="flex items-center gap-2">
            <Button
              size={"large"}
              htmlType="submit"
              type="primary"
              loading={opportunityLoading}
            >
              Create
            </Button>
            <Button size={"large"} type="danger" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
