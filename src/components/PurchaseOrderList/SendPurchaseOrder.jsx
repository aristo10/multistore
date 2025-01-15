import { sendEmail } from "@/redux/rtk/features/hrm/emailConfig/emailConfigSlice";
import { getSetting } from "@/redux/rtk/features/setting/settingSlice";
import purchaseOrderPDF from "@/utils/purchaseOrderPDF";
import useCurrency from "@/utils/useCurrency";
import { CaretRightOutlined } from "@ant-design/icons";
import { Button, Collapse, Form, Input, message } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { useEffect, useState } from "react";
import { BiCloudUpload } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import TagInput from "../CommonUi/TagInput";
import { textEditorFormats, textEditorModule } from "../Product/AddProduct";

export default function SendPurchaseOrder({
  setSendForm,
  setIsModalOpen,
  modal,
  body,
  subject,
  Invoice,
}) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [cc, setCc] = useState([]);
  const [bcc, setBcc] = useState([]);
  const [localBody, setLocalBody] = useState(body);
  const { singlePurchase, loading } = useSelector(
    (state) => state.purchaseOrder
  );
  const companyInfo = useSelector((state) => state?.setting?.data) || null;
  const { currencyName } = useCurrency() || {};

  const onFinish = async (values) => {
    setLoader(true);

    try {
      let formData = new FormData();
      formData.append("receiverEmail", values.receiverEmail);
      formData.append("subject", values.subject);
      formData.append("body", localBody);

      fileList &&
        fileList.forEach((file) => {
          if (file.name === "Purchase Order.pdf") {
            formData.append(
              "files[]",
              file.originFileObj,
              "Purchase Order.pdf"
            );
          } else {
            formData.append("files[]", file.originFileObj);
          }
        });

      cc.length > 0 && formData.append("cc[]", cc);
      bcc.length > 0 && formData.append("bcc[]", bcc);

      const resp = await dispatch(sendEmail(formData));
      if (resp.payload.message === "success") {
        setSendForm(false);
        setIsModalOpen(false);
        setLoader(false);
        form.resetFields();
      }
    } catch (error) {
      console.log(error);
    }
    setLoader(false);
  };

  const onFinishFailed = () => {};

  useEffect(() => {
    !companyInfo && dispatch(getSetting());
  });

  const handleDragger = (info) => {
    setFileList(info.fileList);
    const { status } = info.file;
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  useEffect(() => {
    if (singlePurchase && companyInfo) {
      setFileList((prev) => {
        if (prev.some((file) => file.name === `Purchase Order-${Invoice}.pdf`))
          return prev;
        return [
          ...prev,
          {
            name: `Purchase Order-${Invoice}.pdf`,
            originFileObj: purchaseOrderPDF(
              singlePurchase,
              companyInfo,
              "Purchase Order",
              currencyName
            ),
          },
        ];
      });
    }
  }, [companyInfo, currencyName, singlePurchase]);
  const handleBody = (val) => {
    setLocalBody(val);
  };

  return (
    <>
      {!loading && singlePurchase && (
        <div className={"p-3"}>
          <div className="flex justify-between">
            <p className=" "></p>
            {!modal && (
              <button
                onClick={() => setSendForm(false)}
                className="bg-red-100 p-1 rounded text-red-500"
              >
                <IoClose size={20} />
              </button>
            )}
          </div>

          <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            colon={false}
            layout="vertical"
            form={form}
            initialValues={{
              subject: subject,
              body: body,
            }}
          >
            <Form.Item
              style={{ width: "100%" }}
              label="To"
              rules={[
                { required: true, message: "Please input receiver email!" },
              ]}
              name="receiverEmail"
            >
              <Input placeholder="Receiver Email" />
            </Form.Item>

            <Collapse
              bordered={false}
              defaultActiveKey={["0"]}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
              className="site-collapse-custom-collapse mb-4 "
            >
              <Collapse.Panel header="CC & BCC" key="1">
                <TagInput label={"CC"} tags={cc} setTags={setCc} />

                <TagInput label={"BCC"} tags={bcc} setTags={setBcc} />
              </Collapse.Panel>
            </Collapse>

            <Form.Item style={{ width: "100%" }} label="Subject" name="subject">
              <Input placeholder="Subject" />
            </Form.Item>

            <Form.Item label="Attachment">
              <Dragger
                name="files"
                onChange={handleDragger}
                multiple={true}
                fileList={fileList}
                beforeUpload={() => false}
              >
                <div className="ant-upload-drag-icon flex justify-center my-2">
                  <BiCloudUpload size={30} />
                </div>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
              </Dragger>
            </Form.Item>

            <Form.Item style={{ marginBottom: "25px" }} label="Body">
              <ReactQuill
                value={localBody}
                onChange={handleBody}
                modules={textEditorModule}
                formats={textEditorFormats}
              />
            </Form.Item>
            <Form.Item>
              <Button
                loading={loader}
                size={"large"}
                htmlType="submit"
                type="primary"
              >
                Send
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
}
