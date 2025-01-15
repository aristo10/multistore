import { Button, DatePicker, Form, Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Products from "./Products";

import { loadAllAccount } from "@/redux/rtk/features/account/accountSlice";
import { addAdjustInventory } from "@/redux/rtk/features/adjustInventory/adjustInventorySlice";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { loadProduct } from "../../redux/rtk/features/product/productSlice";
const id = Number(localStorage.getItem("id"));

const AddAdjustInventory = () => {
  const { list, loading } = useSelector((state) => state.accounts) || {};
  const { list: productList, loading: productLoading } = useSelector(
    (state) => state.products
  );
  const [loader, setLoader] = useState(false);
  const [subTotal, setSubTotal] = useState([]);
  const [adjustType, setAdjustType] = useState("Increment");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Form Function
  const [form] = Form.useForm();

  const onFormSubmit = async (values) => {
    const newAdjustProduct = values.adjustInvoiceProduct.map((product) => {
      return {
        productId: product.productId,
        adjustQuantity: product.adjustQuantity,
      };
    });
    try {
      let data;

      if (values.adjustType === "Increment") {
        data = {
          userId: id,
          adjustType: values.adjustType.toLowerCase(),
          creditId: values.accountId,
          note: values.note,
          adjustInvoiceProduct: newAdjustProduct,
          storeId: values.storeId,
        };
      } else if (values.adjustType === "Decrement") {
        data = {
          userId: id,
          adjustType: values.adjustType.toLowerCase(),
          debitId: values.accountId,
          note: values.note,
          adjustInvoiceProduct: newAdjustProduct,
          storeId: values.storeId,
        };
      }

      const resp = await dispatch(addAdjustInventory(data));
      if (resp.payload.message === "success") {
        form.resetFields();
        setLoader(false);
        navigate(`/admin/adjust-inventory/${resp.payload.data.id}`);
      } else {
        setLoader(false);
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  };

  // total calculate
  const totalCalculator = () => {
    const productArray = form.getFieldValue("adjustInvoiceProduct");

    const subTotal =
      productArray?.reduce((subTotal, current) => {
        const price = current.productPurchasePrice || 0;
        const adjustType = current.adjustType;
        const adjustQuantity = current.adjustQuantity || 0;
        const multiple = price * adjustQuantity;
        let total = 0;
        if (adjustType === "increment") {
          total = price * adjustQuantity;
        } else if (adjustType === "decrement") {
          total = price * adjustQuantity;
        } else {
          total = multiple;
        }

        return [...subTotal, { total, adjustQuantity }];
      }, []) || [];

    setSubTotal(subTotal);
  };

  const handleAdjustTypeChange = (value) => {
    setAdjustType(value);
  };

  const Total = subTotal.reduce((acc, item) => {
    return acc + item.total;
  }, 0);
  const TotalAdjustQuantity = subTotal.reduce((acc, item) => {
    return acc + item.adjustQuantity;
  }, 0);

  useEffect(() => {
    dispatch(loadProduct({ page: 1, count: 1000 }));
    dispatch(loadAllAccount());
  }, [dispatch]);
  return (
    <Form
      form={form}
      className='w-full '
      name='dynamic_form_nest_item'
      onFinish={onFormSubmit}
      onFinishFailed={() => {
        setLoader(false);
      }}
      layout='vertical'
      size='large'
      autoComplete='off'
      initialValues={{
        date: dayjs(),
      }}
    >
      <div className='flex gap-2 2xl:h-[calc(100vh-100px)] min-h-[500px]'>
        <div className='w-[70%] 2xl:w-[75%]'>
          <Products
            totalCalculator={totalCalculator}
            subTotal={subTotal}
            form={form}
            type={adjustType}
            productList={productList}
            productLoading={productLoading}
          />
        </div>
        <div className='flex flex-col w-[30%] 2xl:w-[25%] 2xl:h-[calc(100vh-80px)]'>
          <div className='flex-grow 2xl:overflow-y-auto 2xl:overflow-x-hidden  pl-2'>
            <Form.Item
              name='adjustType'
              label='Select Adjust Type'
              className='mb-0'
              rules={[
                {
                  required: true,
                  message: "Please select Adjust Type!",
                },
              ]}
            >
              <Select
                onChange={handleAdjustTypeChange}
                placeholder='Select Adjust Type'
              >
                <Select.Option key='increment' value='Increment'>
                  Increment
                </Select.Option>
                <Select.Option key='decrement' value='Decrement'>
                  Decrement
                </Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              className='-mb-2'
              name='date'
              label='Date'
              required
              rules={[
                {
                  required: true,
                  message: "Please input Date!",
                },
              ]}
            >
              <DatePicker
                size='small'
                format={"YYYY-MM-DD"}
                className='date-picker'
              />
            </Form.Item>
            <Form.Item
              className='-mb-2'
              label='Select Account'
              name='accountId'
              required
              rules={[
                {
                  required: true,
                  message: "Please select account!",
                },
              ]}
            >
              <Select
                loading={loading}
                popupClassName='min-w-[200px]'
                placeholder={`Select Account`}
                optionFilterProp='children'
                filterOption={(input, option) =>
                  option.children.includes(input)
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                {list?.map((account) => (
                  <Select.Option key={account.id} value={account.id}>
                    {account.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name='note' label='Note' className='-mb-2'>
              <textarea
                className='w-full border-2 rounded p-2 outline-none'
                rows={3}
                placeholder='Write about adjustment...'
              />
            </Form.Item>

            <div className='bg-gray-100 px-2 my-5'>
              <div className='py-2'>
                <div className=' flex justify-between'>
                  <span>
                    Total{" "}
                    {`${
                      adjustType === "Increment" ? "Increment" : "Decrement"
                    }`}{" "}
                    Quantity:{" "}
                  </span>
                  <strong>
                    {" "}
                    {`${adjustType === "Increment" ? "+" : "-"}`}
                    {Number(TotalAdjustQuantity)}{" "}
                  </strong>
                </div>
                <div className=' flex justify-between'>
                  <span>Total Amount: </span>
                  <strong>{Number(Total).toFixed(2)} </strong>
                </div>
              </div>
            </div>
            <Form.Item className='-mt-0'>
              <Button
                block
                type='primary'
                htmlType='submit'
                loading={loader}
                onClick={() => setLoader(true)}
              >
                Create Adjust Inventory
              </Button>
            </Form.Item>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default AddAdjustInventory;
