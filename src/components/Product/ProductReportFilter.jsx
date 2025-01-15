import Button from "@/UI/Button";
import { loadProductReport } from "@/redux/rtk/features/product/productSlice";
import { loadAllStoreByUser } from "@/redux/rtk/features/store/storeSlice";
import { Form, Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ProductReportFilter({
  pageConfig,
  setShowTable,
  setPageConfig,
}) {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.store);
  const [loader, setLoader] = useState(false);

  const onFinish = async (values) => {
    setLoader(true);
    const resp = await dispatch(
      loadProductReport({
        ...values,
        query: "report",
      })
    );

    if (resp.payload.message === "success") {
      setShowTable(true);
    }
    setLoader(false);
  };

  useEffect(() => {
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
        <Form.Item label='Select store' name='storeId'>
          <Select
            placeholder='All'
            loading={loading}
            allowClear
            maxTagPlaceholder={(item) => (
              <div className=''>{item.length} Selected</div>
            )}
            maxTagCount={0}
            mode='multiple'
            showSearch={false}
            style={{ width: "100%" }}
            // onChange={(value) =>
            //   setPageConfig((prev) => ({
            //     ...prev,
            //     store: list.find((item) => item.id === value),
            //   }))
            // }
          >
            {list?.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item?.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
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
