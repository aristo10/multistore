import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllCustomer } from "../../redux/rtk/features/customer/customerSlice";
import { loadProduct } from "../../redux/rtk/features/product/productSlice";
import { addSale } from "../../redux/rtk/features/sale/saleSlice";
import Products from "./Products";

import useSettings from "@/Hooks/useSettings";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { loadAllCouponValid } from "../../redux/rtk/features/Coupon/couponSlice";
import { loadAllTermsAndConditions } from "../../redux/rtk/features/termsAndCondition/termsAndConditionSlice";
import { loadAllStaff } from "../../redux/rtk/features/hrm/user/userSlice";
import { loadAllVatTax } from "../../redux/rtk/features/vatTax/vatTaxSlice";
import AddCustomer from "../Customer/AddCustomer";
import BigDrawer from "../Drawer/BigDrawer";
import AddTermsAndConditions from "../TermsAndConditions/AddTermsAndConditions";
import Payments from "./Payments";
const staffId = Number(localStorage.getItem("id"));

const AddSale = () => {
  const { Option } = Select;
  const { isSaleCommission, currency } = useSettings([
    "isSaleCommission",
    "currency",
  ]);
  const [loader, setLoader] = useState(false);
  const [subTotal, setSubTotal] = useState([]);
  const [commissionAmount, setCommissionAmount] = useState(0);
  const [due, setDue] = useState(0);
  const [selectedCustomer, setSelectedCustomer] = useState();
  const [selectedTermsAndConditions, setSelectedTermsAndConditions] =
    useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const allCustomer = useSelector((state) => state.customers.list);
  const { list: productList, loading: productLoading } = useSelector(
    (state) => state.products
  );
  const allStaff = useSelector((state) => state.users.list);
  const { list: termsAndConditions, loading } = useSelector(
    (state) => state.termsAndConditions
  );

  const onFormSubmit = async (values) => {
    try {
      const mergedObject = values.saleInvoiceProduct.reduce(
        (accumulator, currentObject) => {
          const productId = currentObject.productId;
          if (!accumulator[productId]) {
            accumulator[productId] = { ...currentObject };
          } else {
            accumulator[productId].productQuantity +=
              currentObject.productQuantity;
          }
          return accumulator;
        },
        {}
      );

      const mergedArray = Object.values(mergedObject);
      const productArray = mergedArray.map((item) => {
        const quantity = item?.productQuantity || 0;
        const price = item?.productSalePrice || 0;
        const data = {
          productId: item.productId,
          productQuantity: item.productQuantity,
          productUnitSalePrice: item.productSalePrice,
          tax: item.productVat,
        };

        data.productDiscount = item.productDiscount;
        if (item.discountType === "percentage") {
          data.productDiscount =
            (price * quantity * item?.productDiscount) / 100;
        }

        return data;
      });

      const data = {
        ...values,
        saleInvoiceProduct: productArray,
        paidAmount: values.paidAmount || [],
        saleCommission: commissionAmount || null,
      };
      const resp = await dispatch(addSale(data));
      if (resp.payload.message === "success") {
        form.resetFields();
        setLoader(false);

        navigate(`/admin/sale/${resp.payload.data.id}`);
      } else {
        setLoader(false);
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  };

  // =============================== total calculate===================================
  const totalCalculator = () => {
    const productArray = form.getFieldValue("saleInvoiceProduct");
    const subTotal =
      productArray?.reduce((subTotal, current) => {
        const quantity = current?.productQuantity || 0;
        const price = current?.productSalePrice || 0;
        let discount = current?.productDiscount || 0;
        if (current?.discountType === "percentage") {
          discount = (price * quantity * discount) / 100;
        }

        const vat = current?.productVat || 0;
        const subPrice = price * quantity - discount;
        const totalVat = (vat / 100) * subPrice;

        return [
          ...subTotal,
          { subDiscount: discount, subVatAmount: totalVat, subPrice },
        ];
      }, []) || [];

    setSubTotal(subTotal);

    const total = subTotal.reduce((acc, item) => {
      return acc + item.subPrice;
    }, 0);
    const totalTaxAmount = subTotal.reduce((acc, item) => {
      return acc + item.subVatAmount;
    }, 0);
    const totalPayable = total + totalTaxAmount;
    const paidAmountArray = form.getFieldValue("paidAmount") || [];
    const paidAmount = paidAmountArray?.reduce((acc, item) => {
      return acc + (item.amount ? Number(item.amount) : 0);
    }, 0);
    const due = totalPayable - paidAmount;
    setDue(due);

    const type = form.getFieldValue("commissionType");
    const value = form.getFieldValue("saleCommission");

    if (type === "percentage") {
      const totalCommission = (total * parseInt(value)) / 100;
      setCommissionAmount(totalCommission);
    } else {
      setCommissionAmount(value);
    }
  };

  const customer = allCustomer?.find((item) => item.id === selectedCustomer);
  const total = subTotal.reduce((acc, item) => {
    return acc + item.subPrice;
  }, 0);
  const totalTaxAmount = subTotal.reduce((acc, item) => {
    return acc + item.subVatAmount;
  }, 0);
  const totalDiscount = subTotal.reduce((acc, item) => {
    return acc + item.subDiscount;
  }, 0);

  const totalPayable = total + totalTaxAmount;

  const handleUserChange = (value) => {
    const selectedSalesman = allStaff.find((staff) => staff.id === value);
    form.setFieldsValue({
      commissionType: selectedSalesman?.commissionType || "flat",
      saleCommission: selectedSalesman?.commissionValue,
    });

    if (selectedSalesman.commissionType === "percentage") {
      const totalCommission =
        (total * Number(selectedSalesman.commissionValue)) / 100;
      setCommissionAmount(totalCommission);
    } else {
      setCommissionAmount(selectedSalesman.commissionValue);
    }
  };

  const handleCommissionChange = (value) => {
    const type = form.getFieldValue("commissionType");
    if (type === "percentage") {
      const totalCommission = (total * value) / 100;
      setCommissionAmount(totalCommission);
    } else {
      setCommissionAmount(value);
    }
  };

  const handleCommissionTypeChange = (value) => {
    if (value === "percentage") {
      const totalCommission =
        (total * form.getFieldValue("saleCommission")) / 100;
      setCommissionAmount(totalCommission);
    } else {
      setCommissionAmount(form.getFieldValue("saleCommission"));
    }
  };

  useEffect(() => {
    dispatch(loadAllStaff({ status: "true", page: 1, count: 1000 }));
    dispatch(loadAllCustomer({ page: 1, count: 100 }));
    dispatch(loadProduct({ page: 1, count: 100, status: "true" }));
    dispatch(loadAllVatTax());
    dispatch(loadAllCouponValid());
    dispatch(loadAllTermsAndConditions());
  }, [dispatch]);

  useEffect(() => {
    const selectedSalesman = allStaff?.find((staff) => staff.id === staffId);
    form.setFieldsValue({
      commissionType: selectedSalesman?.commissionType || "flat",
      saleCommission: selectedSalesman?.commissionValue,
    });
  }, [allStaff, form]);

  return (
    <Form
      form={form}
      name='dynamic_form_nest_item'
      onFinish={onFormSubmit}
      onFinishFailed={() => {
        setLoader(false);
      }}
      layout='vertical'
      size='large'
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
      autoComplete='off'
      initialValues={{
        discount: 0,
        date: dayjs(),
        vatId: [],
        saleInvoiceProduct: [{}],
        paymentType: 1,
      }}
    >
      <div className='flex gap-2 2xl:h-[calc(100vh-100px)] min-h-[500px]'>
        <div className='w-[70%] 2xl:w-[75%]'>
          <Products
            form={form}
            totalCalculator={totalCalculator}
            subTotal={subTotal}
            productList={productList}
            productLoading={productLoading}
          />
        </div>
        <div className='flex flex-col w-[30%] 2xl:w-[25%] 2xl:h-[calc(100vh-80px)]'>
          <div className='flex-grow 2xl:overflow-y-auto 2xl:overflow-x-hidden  pl-2'>
            <Form.Item
              label={
                <>
                  Customer
                  <BigDrawer title={"new Customer"}>
                    <AddCustomer drawer={true} />
                  </BigDrawer>
                </>
              }
              className='w-full mb-0'
              name='customerId'
              rules={[
                {
                  required: true,
                  message: "Please Select a Customer!",
                },
              ]}
              initialValue={1}
            >
              <Select
                className='w-full'
                loading={!allCustomer}
                showSearch
                onChange={(id) => setSelectedCustomer(id)}
                placeholder='Select a customer '
                optionFilterProp='children'
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                {allCustomer &&
                  allCustomer?.map((sup) => (
                    <Option key={sup.id} value={sup.id}>
                      {sup.username}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            {(customer?.address || customer?.phone) && (
              <div className='flex justify-between py-1 px-4'>
                <span>
                  <span>Address: </span>
                  <span>{customer?.address}</span>{" "}
                </span>
                <span>
                  <span>Phone: </span>
                  <span>{customer?.phone}</span>{" "}
                </span>
              </div>
            )}

            <Form.Item
              label='Date'
              required
              className='w-full mb-0'
              name='date'
              rules={[
                {
                  required: true,
                  message: "Please input Date!",
                },
              ]}
            >
              <DatePicker label='date' size='small' format={"YYYY-MM-DD"} />
            </Form.Item>
            <Form.Item label='Due date' className='w-full mb-0' name='dueDate'>
              <DatePicker label='date' size='small' format={"YYYY-MM-DD"} />
            </Form.Item>

            <Form.Item
              className='w-full mb-0'
              label='Sales Person'
              name='userId'
              initialValue={staffId}
              required
            >
              <Select
                className='w-full'
                loading={!allStaff}
                showSearch
                placeholder='Select sales person '
                optionFilterProp='children'
                onChange={handleUserChange}
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                {allStaff &&
                  allStaff?.map((info) => (
                    <Option key={info.id} value={info.id}>
                      {info.username}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
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
                    size={"small"}
                    onChange={handleCommissionChange}
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

            <Form.Item className='mb-0' label='Shipping Address' name='address'>
              <Input
                className=''
                placeholder='Enter shipping address'
                size={"small"}
              />
            </Form.Item>

            <Form.Item className='mb-0' label='Note' name='note'>
              <Input
                className=''
                size={"small"}
                placeholder='Write sale Note'
                label='note'
              />
            </Form.Item>

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
                  <BigDrawer title={"New Terms and conditions"}>
                    <AddTermsAndConditions drawer={true} />
                  </BigDrawer>
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
                  value={selectedTermsAndConditions}
                  placeholder='Select Terms and conditions'
                  onSelect={(value) => setSelectedTermsAndConditions(value)}
                >
                  {termsAndConditions &&
                    termsAndConditions?.map((info) => (
                      <Option key={info.id} value={info.subject}>
                        {info.title}
                      </Option>
                    ))}
                </Select>
              )}
            </Form.Item>
          </div>

          <div className='bg-gray-100 px-2'>
            <div className='py-2'>
              <div className=' flex justify-between'>
                <strong>Total amount: </strong>
                <strong>{Number(total).toFixed(2)} </strong>
              </div>
              <div className=' flex justify-between'>
                <span>Total discount: </span>
                <span>{Number(totalDiscount).toFixed(2)} </span>
              </div>

              <div className='py-1 flex justify-between items-center mb-1'>
                <span>Total tax amount: </span>
                <span>{Number(totalTaxAmount).toFixed(2)}</span>
              </div>
              <div className='py-1 flex justify-between items-center mb-1'>
                <strong>Total Payable: </strong>

                <strong>{Number(totalPayable).toFixed(2)}</strong>
              </div>
              <div className='py-1 mb-1 flex justify-between'>
                <strong>Due Amount:</strong>
                <strong>{due.toFixed(2)}</strong>
              </div>
              <div className='flex justify-between mb-2'>
                <span className=''>Paid Amount: </span>
                <div className='w-[65%] flex items-center justify-between gap-2'>
                  <Payments totalCalculator={totalCalculator} />
                </div>
              </div>
            </div>
            <div className='flex gap-2'>
              <Form.Item className='w-full pb-0'>
                <Button
                  block
                  type='primary'
                  htmlType='submit'
                  loading={loader}
                  onClick={() => setLoader(true)}
                >
                  Create Sale
                </Button>
              </Form.Item>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default AddSale;
