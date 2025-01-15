import Button from "@/UI/Button";
import { loadAllCustomer } from "@/redux/rtk/features/customer/customerSlice";
import { loadAllSaleReport } from "@/redux/rtk/features/sale/saleSlice";
import { loadAllStoreByUser } from "@/redux/rtk/features/store/storeSlice";
import { loadAllStaff } from "@/redux/rtk/features/hrm/user/userSlice";
import { DatePicker, Form, Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SaleReportFilter({
  setPageConfig,
  pageConfig,
  setShowTable,
}) {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const { list, loading } = useSelector((state) => state.customers);
  const { list: salePersonList, loading: salePersonLoading } = useSelector(
    (state) => state.users
  );
  const { list: store, loading: storeLoading } = useSelector(
    (state) => state.store
  );

  const onFinish = async (values) => {
    setLoader(true);
    const resp = await dispatch(
      loadAllSaleReport({
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
    dispatch(loadAllCustomer({ query: "all" }));
    dispatch(loadAllStaff({ query: "all" }));
    dispatch(loadAllStoreByUser());
  }, [dispatch]);
  return (
    <div className='flex flex-col items-center gap-2 p-5 m-4 rounded bg-white w-2/5'>
      <Form
        layout='vertical'
        className='w-full'
        initialValues={{
          startDate: dayjs(pageConfig.startDate, "YYYY-MM-DD"),
          endDate: dayjs(pageConfig.endDate, "YYYY-MM-DD"),
        }}
        onFinish={onFinish}
      >
        <Form.Item label='Select store' name='storeId' className='w-full'>
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
        <div className='w-full flex gap-2'>
          <Form.Item label='Sale person' name='salePersonId' className='w-1/2'>
            <Select
              placeholder='All'
              loading={salePersonLoading}
              allowClear
              showSearch={false}
              style={{ width: "100%" }}
              maxTagCount={0}
              onChange={(value) =>
                setPageConfig((prev) => {
                  return {
                    ...prev,
                    salePerson: salePersonList.find((item) => item.id === value)
                      ?.username,
                  };
                })
              }
            >
              {salePersonList?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item?.username}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label='Select Customer'
            name='customerId'
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
                setPageConfig((prev) => {
                  return {
                    ...prev,
                    customer: list.find((item) => item.id === value)?.username,
                  };
                })
              }
            >
              {list?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item?.username}
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
