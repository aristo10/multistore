import useSettings from "@/Hooks/useSettings";
import { loadAllAccount } from "@/redux/rtk/features/account/accountSlice";
import { loadSingleStaff } from "@/redux/rtk/features/hrm/user/userSlice";
import { Button, Form, Input, InputNumber, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addSale } from "../../redux/rtk/features/sale/saleSlice";
import { loadAllTermsAndConditions } from "../../redux/rtk/features/termsAndCondition/termsAndConditionSlice";
import Payments from "./Payments";
const userId = localStorage.getItem("id");

export default function PaymentForm({
  isModalOpen,
  setIsModalOpen,
  form,
  totalTaxAmount,
  total,
  totalPayable,
  totalDiscount,
  totalCalculator,
  due,
  storeId,
  productForm,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedTermsAndConditions, setSelectedTermsAndConditions] =
    useState();
  const { isSaleCommission, currency } = useSettings([
    "isSaleCommission",
    "currency",
  ]);
  const { list: termsAndConditions, loading } = useSelector(
    (state) => state.termsAndConditions
  );

  const { user } = useSelector((state) => state.users);
  const [commission, setCommission] = useState(0);

  const type = form.getFieldValue("commissionType");
  let commissionAmount = form.getFieldValue("saleCommission");
  if (type === "percentage") {
    commissionAmount = (total * commissionAmount) / 100;
  }

  const onFormSubmit = async (values) => {
    try {
      const products = productForm
        ?.getFieldValue("saleInvoiceProduct")
        ?.map((product) => {
          const quantity = product?.productQuantity || 0;
          const price = product?.productSalePrice || 0;
          const data = {
            productId: product.productId,
            productQuantity: product.productQuantity,
            productUnitSalePrice: product.productSalePrice,
            tax: product.productVat,
          };
          data.productDiscount = product.productDiscount;
          if (product.discountType === "percentage") {
            data.productDiscount =
              (price * quantity * product?.productDiscount) / 100;
          }
          return data;
        });

      const data = {
        ...values,
        customerId: productForm.getFieldValue("customerId"),
        date: productForm.getFieldValue("date"),
        paidAmount: values.paidAmount || [],
        saleInvoiceProduct: products,
        userId: parseInt(userId),
        storeId,
        saleCommission: commissionAmount || null,
      };
      const resp = await dispatch(addSale(data));

      if (resp.payload.message === "success") {
        form.resetFields();

        navigate(`/admin/sale/${resp.payload?.data?.id}`);
      }
    } catch (error) {}
  };

  const handleCommissionChange = (value) => {
    setCommission(value);
  };

  const handleCommissionTypeChange = (value) => {
    setCommission(value);
  };

  useEffect(() => {
    dispatch(loadAllTermsAndConditions());
    dispatch(loadAllAccount());
    dispatch(loadSingleStaff(userId));
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        saleCommission: user.commissionValue,
        commissionType: user.commissionType,
      });
    }
  }, [form, user]);

  return (
    <>
      <Modal
        title='Sale'
        open={isModalOpen}
        footer={false}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form
          form={form}
          className='m-lg-1'
          onFinish={onFormSubmit}
          name='dynamic_form_nest_item'
          initialValues={{
            discount: 0,
            paidAmount: [{ amount: due || 0, paymentType: 1 }],
            vatId: [],
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
          layout='vertical'
          size='large'
          autoComplete='off'
        >
          {isSaleCommission === "true" && (
            <>
              <Form.Item
                name='saleCommission'
                className='mb-0 max-w-full'
                label='Sale Commission'
              >
                <InputNumber
                  className='discountType'
                  addonAfter={
                    <Form.Item name={"commissionType"} noStyle>
                      <Select
                        size='small'
                        style={{
                          width: 50,
                        }}
                        defaultValue={"flat"}
                        popupClassName='bg-white'
                        onChange={handleCommissionTypeChange}
                      >
                        <Select.Option key='flat'>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: currency?.currencySymbol,
                            }}
                          />
                        </Select.Option>
                        <Select.Option key='percentage'>%</Select.Option>
                      </Select>
                    </Form.Item>
                  }
                  placeholder='0'
                  style={{
                    width: "100%",
                  }}
                  onChange={handleCommissionChange}
                  size={"small"}
                />
              </Form.Item>
              <div className='flex items-center justify-between p-1 text-gray-600 duration-200'>
                <span>
                  Total:{" "}
                  {commissionAmount ? Number(commissionAmount).toFixed(2) : 0}
                </span>
              </div>
            </>
          )}
          <Form.Item
            className='mb-0'
            label={
              <>
                Terms and conditions
                {selectedTermsAndConditions && (
                  <button
                    onClick={() => setSelectedTermsAndConditions(false)}
                    className='py-1 px-2 bg-red-200 rounded ml-1 text-gray-500'
                  >
                    Cancel
                  </button>
                )}
              </>
            }
            name='termsAndConditions'
          >
            {selectedTermsAndConditions ? (
              <Input.TextArea
                onChange={(value) => setSelectedTermsAndConditions(value)}
                value={selectedTermsAndConditions}
              />
            ) : (
              <Select
                className='w-full'
                loading={loading}
                showSearch
                placeholder='Select Terms and conditions'
                onSelect={(value) => setSelectedTermsAndConditions(value)}
              >
                {termsAndConditions &&
                  termsAndConditions?.map((info) => (
                    <Select.Option key={info.id} value={info.subject}>
                      {info.title}
                    </Select.Option>
                  ))}
              </Select>
            )}
          </Form.Item>
          <div className='flex justify-between py-2'>
            <strong>Total amount: </strong>
            <strong>{total.toFixed(2)}</strong>
          </div>
          <div className='flex justify-between py-2'>
            <span>Total discount: </span>
            <span>{Number(totalDiscount).toFixed(2)}</span>
          </div>
          <div className='flex justify-between py-2'>
            <span>Total tax amount: </span>
            <span>{totalTaxAmount.toFixed(2)}</span>
          </div>
          <div className='flex justify-between py-2'>
            <strong>Total payable: </strong>
            <strong>{totalPayable.toFixed(2)}</strong>
          </div>
          <div className='flex justify-between py-2'>
            <strong>Due: </strong>
            <strong>{due.toFixed(2)}</strong>
          </div>
          <div className='flex justify-between py-2'>
            <span>Paid Amount: </span>
            <Payments totalCalculator={totalCalculator} />
          </div>
          <div className='flex items-center gap-3'>
            <Form.Item className='w-full mb-0'>
              <Button block type='primary' htmlType='submit'>
                Sale Now
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
}
