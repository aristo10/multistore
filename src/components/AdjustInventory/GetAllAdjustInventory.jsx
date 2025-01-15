import UseStoreFilter from "@/Hooks/useStoreFilter";
import { stringShorter } from "@/utils/functions";
import { DatePicker, Tooltip } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../../UI/Card";
import { clearAdjustInventoryList, loadAllAdjustInventory } from "../../redux/rtk/features/adjustInventory/adjustInventorySlice";
import CreateButton from "../Buttons/CreateButton";
import ViewBtn from "../Buttons/ViewBtn";
import TableComponent from "../CommonUi/TableComponent";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";

const GetAllAdjustInventory = () => {
  const dispatch = useDispatch();
  const { list, total, loading } = useSelector(
    (state) => state.adjustInventory
  );
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    status: "true",
    startDate: moment().startOf("month").format("YYYY-MM-DD"),
    endDate: moment().endOf("month").format("YYYY-MM-DD"),
  });

  const { RangePicker } = DatePicker;
  const { storeFilter } = UseStoreFilter();

  const columns = [
    {
      id: 1,
      title: "ID",
      key: "id",
      render: ({ id }) => (
        <Link to={`/admin/adjust-inventory/${id}`}>{id}</Link>
      ),
      renderCsv: (id) => id,
    },
    {
      title: "Type",
      dataIndex: "adjustType",
      key: "adjustType",
    },
    {
      id: 2,
      title: <Tooltip title='Total Increment Quantity'>{"Total I.Q."}</Tooltip>,
      dataIndex: "totalIncrementQuantity",
      key: "totalIncrementQuantity",
      render: (totalIncrementQuantity) => totalIncrementQuantity?.toFixed(2),
      renderCsv: (totalIncrementQuantity) => totalIncrementQuantity?.toFixed(2),
    },
    {
      id: 3,
      title: <Tooltip title='Total Increment Price'>{"Total I.P."}</Tooltip>,
      dataIndex: "totalIncrementPrice",
      key: "totalIncrementPrice",
      render: (totalIncrementPrice) => totalIncrementPrice?.toFixed(2),
      renderCsv: (totalIncrementPrice) => totalIncrementPrice?.toFixed(2),
    },
    {
      id: 4,
      title: <Tooltip title='Total Decrement Quantity'>{"Total D.Q."}</Tooltip>,
      dataIndex: "totalDecrementQuantity",
      key: "totalDecrementQuantity",
      render: (totalDecrementQuantity) => totalDecrementQuantity?.toFixed(2),
      renderCsv: (totalDecrementQuantity) => totalDecrementQuantity?.toFixed(2),
    },
    {
      id: 5,
      title: <Tooltip title='Total Decrement Price'>{"Total D.P."}</Tooltip>,
      dataIndex: "totalDecrementPrice",
      key: "totalDecrementPrice",
      render: (totalDecrementPrice) => totalDecrementPrice?.toFixed(2),
      renderCsv: (totalDecrementPrice) => totalDecrementPrice?.toFixed(2),
    },
    {
      id: 6,
      title: <Tooltip title='Total Adjust Price'>{"Total A.P."}</Tooltip>,
      dataIndex: "totalAdjustPrice",
      key: "totalAdjustPrice",
      render: (totalAdjustPrice) => totalAdjustPrice?.toFixed(2),
      renderCsv: (totalAdjustPrice) => totalAdjustPrice?.toFixed(2),
    },
    {
      id: 7,
      title: "Note",
      dataIndex: `note`,
      key: "note",
      render: (note) => stringShorter(note, 20),
      renderCsv: (note) => note,
    },
    {
      id: 8,
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => moment(date).format("ll"),
      renderCsv: (date) => moment(date).format("ll"),
    },

    {
      id: 9,
      title: "",
      dataIndex: "",
      key: "action",
      render: ({ id }) => [
        {
          label: (
            <ViewBtn title={"View"} path={`/admin/adjust-inventory/${id}`} />
          ),
          key: "view",
        },
      ],
      csvOff: true,
    },
  ];

  useEffect(() => {
    dispatch(loadAllAdjustInventory(pageConfig));
    return () => {
      dispatch(clearAdjustInventoryList());
    };
  }, [dispatch, pageConfig]);

  const onCalendarChange = (dates) => {
    const startDate = dates[0].format("YYYY-MM-DD");
    const endDate = dates[1].format("YYYY-MM-DD");

    setPageConfig({
      ...pageConfig,
      startDate,
      endDate,
    });
  };

  return (
    <Card
      className='max-md:border-0 max-md:bg-white'
      bodyClass='max-md:p-0 '
      headClass='border-none'
      title={"Adjust Inventory"}
      extra={
        <div className='justify-between md:justify-start flex gap-3 items-center'>
          <div>
            <RangePicker
              onCalendarChange={onCalendarChange}
              defaultValue={[
                dayjs(pageConfig.startDate, "YYYY-MM-DD"),
                dayjs(pageConfig.endDate, "YYYY-MM-DD"),
              ]}
              className='range-picker'
              style={{ maxWidth: "400px" }}
            />
          </div>
          <CreateButton
            to='/admin/adjust-inventory/add'
            title='Create Adjust Inventory'
          />
        </div>
      }
    >
      <UserPrivateComponent permission={"readAll-adjust"}>
        <TableComponent
          list={list}
          total={total}
          columns={columns}
          loading={loading}
          setPageConfig={setPageConfig}
          query={{
            startDate: pageConfig.startDate,
            endDate: pageConfig.endDate,
          }}
          title={"Adjust Inventory List"}
          isSearch={true}
          filters={[storeFilter]}
        />
      </UserPrivateComponent>
    </Card>
  );
};

export default GetAllAdjustInventory;
