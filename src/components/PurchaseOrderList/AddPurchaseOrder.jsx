import { loadAllStoreByUser } from "@/redux/rtk/features/store/storeSlice";
import { Button, Form, Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addPurchaseOrder,
  loadAllProductSortList,
} from "../../redux/rtk/features/productSortList/ProductSortListSlice";
import Products from "../ProductSortList/Products";

export default function AddPurchaseOrder({ list, storeId }) {
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 100,
    status: "true",
  });
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    list: store,
    loading: storeLoading,
    defaultStore,
  } = useSelector((state) => state.store);

  // Form Function
  const [form] = Form.useForm();

  const onFormSubmit = async (values) => {
    let reorderStocks = values.reorderStocks.map((item) => {
      return {
        stockId: item.id,
        productId: item.productId,
        productQuantity: item.productQuantity,
      };
    });

    // same product merge for reorderStocks
    reorderStocks = reorderStocks?.reduce((acc, item) => {
      const existing = acc.find(
        (accItem) => accItem.productId === item.productId
      );
      if (existing) {
        existing.productQuantity += item.productQuantity;
      } else {
        acc.push(item);
      }
      return acc;
    }, []);

    const data = {
      storeId: values.storeId || storeId,
      reorderStocks,
    };
    try {
      const resp = await dispatch(addPurchaseOrder(data));
      if (resp.payload.message === "success") {
        form.resetFields();
        setLoader(false);
        navigate(
          `/admin/purchase-order/${resp.payload.data[0]?.reorderInvoiceId}`
        );
      } else {
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
    }
  };

  const handleSelectStore = (store) => {
    dispatch(loadAllProductSortList({ ...pageConfig, storeId: store }));
    form.setFieldsValue({
      reorderStocks: [{}],
    });
  };

  useEffect(() => {
    if (list?.length > 0) {
      form.setFieldsValue({
        reorderStocks: list.map((item) => ({ ...item, productQuantity: 0 })),
      });
    }
  }, [form, list]);

  useEffect(() => {
    if (defaultStore && !storeId) {
      form.setFieldValue("storeId", defaultStore.id);
    } else if (storeId) {
      form.setFieldValue("storeId", storeId);
    }
  }, [defaultStore, form, storeId]);

  useEffect(() => {
    dispatch(loadAllStoreByUser());
  }, [dispatch, storeId]);

  useEffect(() => {
    if (!storeId) {
      dispatch(loadAllProductSortList(pageConfig));
    }
  }, [dispatch, pageConfig, storeId]);

  return (
    <div className='w-full'>
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
        initialValues={{}}
      >
        <Form.Item
          className='max-w-[200px]'
          name='storeId'
          rules={[
            {
              required: true,
              message: "Store is required",
            },
          ]}
        >
          <Select
            className='w-full'
            loading={storeLoading}
            showSearch
            onChange={handleSelectStore}
            placeholder='Select a store'
            optionFilterProp='children'
          >
            {store?.map((store) => (
              <Select.Option key={store.id} value={store.id}>
                {store.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Products
          form={form}
          setPageConfig={setPageConfig}
          pageConfig={pageConfig}
        />

        <Form.Item style={{ marginTop: "15px" }}>
          <Button
            block
            type='primary'
            htmlType='submit'
            loading={loader}
            onClick={() => setLoader(true)}
          >
            Create Purchase Order
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
