import { loadAllDiscount } from "@/redux/rtk/features/eCommerce/discount/discountSlice";
import {
  loadAllInventory,
  updateInventory,
} from "@/redux/rtk/features/inventory/inventorySlice";
import { loadProduct } from "@/redux/rtk/features/product/productSlice";
import { loadAllStore } from "@/redux/rtk/features/store/storeSlice";
import { loadAllVatTax } from "@/redux/rtk/features/vatTax/vatTaxSlice";
import { EditOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BigDrawer from "../Drawer/BigDrawer";
import AddStore from "../Store/AddStore";
import AddVatTax from "../VatTax/AddVatTax";

export default function UpdateInventory({ data }) {
  const dispatch = useDispatch();
  const { id } = data;
  const [form] = Form.useForm();
  const [loader, setLoader] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { list: store, loading: storeLoading } = useSelector(
    (state) => state.store
  );
  const { list: vatTaxList, loading: vatTaxLoading } = useSelector(
    (state) => state.vatTax
  );
  const { list: productList, loading: productLoading } = useSelector(
    (state) => state.products
  );
  const { list: discount, loading: discountLoading } = useSelector(
    (state) => state.discount
  );

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onFinish = async (values) => {
    setLoader(true);
    const resp = await dispatch(updateInventory({ id: id, values }));
    if (resp.payload.message == "success") {
      setIsModalOpen(false);
      setLoader(false);
      dispatch(loadAllInventory());
    }
  };

  const onFinishFailed = () => {
    setLoader(false);
  };

  useEffect(() => {
    dispatch(loadAllStore());
    dispatch(loadAllVatTax());
    dispatch(loadProduct({ page: 1, count: 100 }));
    dispatch(loadAllDiscount());
  }, [dispatch]);

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
          initialValues={{
            ...data,
            expDate: data.expDate ? dayjs(data.expDate) : null,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
          labelAlign='left'
        >
          <Form.Item
            label={
              <>
                Select store{" "}
                <BigDrawer title={"Store"}>
                  <AddStore />
                </BigDrawer>
              </>
            }
            className='w-full'
            name='storeId'
            rules={[
              {
                required: true,
                message: "Please select store!",
              },
            ]}
          >
            <Select
              allowClear
              placeholder='Select Store'
              loading={storeLoading}
            >
              {store?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label='Select product'
            className='w-full'
            name='productId'
            rules={[
              {
                required: true,
                message: "Please select product!",
              },
            ]}
          >
            <Select
              allowClear
              placeholder='Select Product'
              loading={productLoading}
            >
              {productList?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <div className='flex flex-col sm:flex-row gap-3'>
            <Form.Item
              label='Sale Price'
              name={"productSalePrice"}
              className='w-full sm:w-1/2'
            >
              <Input
                className='w-full'
                type='number'
                size='small'
                placeholder='Sale Price'
              />
            </Form.Item>
            <Form.Item
              label='Purchase Price'
              name={"productPurchasePrice"}
              className='w-full sm:w-1/2'
            >
              <Input
                className='w-full'
                type='number'
                size='small'
                placeholder='Purchase Price'
              />
            </Form.Item>
          </div>
          <div className='flex flex-col sm:flex-row gap-3'>
            <Form.Item
              name={"productQuantity"}
              label='Quantity'
              className='w-full sm:w-1/2'
            >
              <InputNumber
                className='w-full'
                size='small'
                placeholder='Quantity'
              />
            </Form.Item>
            <Form.Item
              label='Reorder Quantity'
              name={"reorderQuantity"}
              className='w-full sm:w-1/2'
            >
              <InputNumber
                className='w-full'
                size='small'
                placeholder='Reorder Quantity'
              />
            </Form.Item>
          </div>
          <div className='flex flex-col sm:flex-row gap-3'>
            <Form.Item
              style={{ marginBottom: "15px" }}
              label={
                <>
                  Purchase VAT{" "}
                  <BigDrawer title={"Vat/Tax"}>
                    <AddVatTax />
                  </BigDrawer>
                </>
              }
              className='w-full sm:w-1/2'
              name='productPurchaseTaxId'
            >
              <Select
                allowClear
                placeholder='Select Vat/Tax type'
                loading={vatTaxLoading}
              >
                {vatTaxList?.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.title}
                    <span className='italic'>@{item.percentage}%</span>
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "15px" }}
              label={
                <>
                  Sales VAT{" "}
                  <BigDrawer title={"VAT/TAX"}>
                    <AddVatTax />
                  </BigDrawer>
                </>
              }
              className='w-full sm:w-1/2'
              name='productSalesTaxId'
            >
              <Select
                allowClear
                placeholder='Select Vat/Tax type'
                loading={vatTaxLoading}
              >
                {vatTaxList?.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.title}
                    <span className='italic'>@{item.percentage}%</span>
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className='flex gap-2'>
            <Form.Item
              name={"isNegativeSale"}
              label='Is Negative Sale'
              className='mb-1 w-full'
            >
              <Select className='w-full' placeholder='Select negative sale'>
                <Select.Option value='true'>Yes</Select.Option>
                <Select.Option value='false'>No</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name={"expDate"}
              label='Expiry Date'
              className='mb-1 w-full'
            >
              <DatePicker size='small' placeholder='Enter expiry date' />
            </Form.Item>
          </div>
          <Form.Item label='Discount' name={"discountId"} className='w-full'>
            <Select
              showSearch
              placeholder='Select discount'
              optionFilterProp='children'
              allowClear
              loading={discountLoading}
            >
              {discount?.map((discountSingle) => (
                <Select.Option
                  key={discountSingle.id}
                  value={discountSingle.id}
                >
                  {`${
                    discountSingle.type == "percentage"
                      ? `${discountSingle.value}%`
                      : `Flat ${discountSingle.value}`
                  }`}
                </Select.Option>
              ))}
            </Select>
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
