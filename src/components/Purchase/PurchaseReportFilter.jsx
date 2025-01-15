import Button from "@/UI/Button";
import { loadAllPurchaseReport } from "@/redux/rtk/features/purchase/purchaseSlice";
import { loadAllStoreByUser } from "@/redux/rtk/features/store/storeSlice";
import { DatePicker, Form, Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadSuppliers } from "../../redux/rtk/features/supplier/supplierSlice";

export default function PurchaseReportFilter({
  pageConfig,
  setSupplier,
  setShowTable,
  setPageConfig,
}) {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.suppliers);
  const { list: store, loading: storeLoading } = useSelector(
    (state) => state.store
  );
  const [loader, setLoader] = useState(false);

  const onFinish = async (values) => {
    setLoader(true);
    const resp = await dispatch(
      loadAllPurchaseReport({
        ...values,
        startDate: values.startDate.format("YYYY-MM-DD"),
        endDate: values.endDate.format("YYYY-MM-DD"),
        query: "report",
      })
    );

    if (resp.payload.message === "success") {
      setShowTable(true);
    }
    setLoader(false);
  };

  useEffect(() => {
    dispatch(loadSuppliers({ query: "all" }));
    dispatch(loadAllStoreByUser());
  }, [dispatch]);
  return (
    <div className='flex flex-col items-center gap-2 p-5 m-4 rounded bg-white w-1/3'>
      <Form
        layout='vertical'
        className='w-full'
        initialValues={{
          startDate: dayjs(pageConfig.startDate, "YYYY-MM-DD"),
          endDate: dayjs(pageConfig.endDate, "YYYY-MM-DD"),
        }}
        onFinish={onFinish}
      >
        <div className='flex gap-3'>
          <Form.Item
            label='Select Supplier'
            name='supplierId'
            className='w-1/2'
          >
            <Select
              placeholder='All'
              loading={loading}
              allowClear
              showSearch={false}
              style={{ width: "100%" }}
              maxTagCount={0}
              onChange={(value) =>
                setSupplier(list.find((item) => item.id === value)?.name)
              }
            >
              {list?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item?.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label='Select store' name='storeId' className='w-1/2'>
            <Select
              placeholder='All'
              loading={storeLoading}
              allowClear
              maxTagPlaceholder={(item) => (
                <div className=''>{item.length} Selected</div>
              )}
              maxTagCount={0}
              mode='multiple'
              showSearch={false}
              style={{ width: "100%" }}
            >
              {store?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item?.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <div className='flex gap-3'>
          <Form.Item label='From' name='startDate' className='w-1/2'>
            <DatePicker
              onChange={(date) =>
                setPageConfig({
                  ...pageConfig,
                  startDate: date.format("YYYY-MM-DD"),
                })
              }
            />
          </Form.Item>
          <Form.Item label='To' name='endDate' className='w-1/2'>
            <DatePicker
              onChange={(date) =>
                setPageConfig({
                  ...pageConfig,
                  endDate: date.format("YYYY-MM-DD"),
                })
              }
            />
          </Form.Item>
        </div>
        <Form.Item>
          <Button
            loading={loader}
            type='submit'
            className='w-full bg-green-500 text-white rounded p-2'
          >
            Generate Report
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
