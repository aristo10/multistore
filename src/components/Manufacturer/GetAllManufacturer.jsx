import Card from "@/UI/Card";
import {
  clearManufacturerList,
  deleteManufacturer,
  editManufacturer,
  loadALLManufacturerByPaginated,
} from "@/redux/rtk/features/manufacturer/manufacturerSlice";
import { EditOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonDelete from "../CommonUi/CommonDelete";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TableComponent from "../CommonUi/TableComponent";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import AddManufacturer from "./AddManufacturer";
import UpdateManufacturer from "./UpdateManufacturer";

export default function GetAllManufacturer() {
  const dispatch = useDispatch();
  const { list, total, loading } = useSelector((state) => state.manufacturer);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    status: "true",
  });

  const columns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      id: 2,
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      id: 2,
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD/MM/YYYY"),
    },

    {
      id: 4,
      title: "",
      key: "action",
      render: (item) => [
        {
          label: (
            <UserPrivateComponent permission={"update-manufacturer"}>
              <div
                onClick={() => {
                  dispatch(editManufacturer(item));
                  showModal();
                }}
                className='flex items-center gap-2 cursor-pointer'
              >
                <EditOutlined className='gray-600 rounded-md' />
                Edit
              </div>
            </UserPrivateComponent>
          ),
          key: "edit",
        },

        {
          label: (
            <CommonDelete
              values={{
                id: item.id,
                status: item.status,
              }}
              title={item.status === "true" ? "Hide" : "Show"}
              permission={"delete-manufacturer"}
              deleteThunk={deleteManufacturer}
              loadThunk={loadALLManufacturerByPaginated}
              query={pageConfig}
              className='bg-white text-black'
            />
          ),
          key: "delete",
        },
      ],

      csvOff: true,
    },
  ];
  const filters = [
    {
      key: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Show", value: "true" },
        { label: "Hide", value: "false" },
      ],
      className: "min-w-[85px] max-w-[150px]",
      popupClassName: "w-[100px]",
    },
  ];
  useEffect(() => {
    dispatch(loadALLManufacturerByPaginated(pageConfig));
    return () => {
      dispatch(clearManufacturerList());
    };
  }, [dispatch, pageConfig]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Card
      className='max-md:border-0 max-md:bg-white'
      bodyClass='max-md:p-0 '
      headClass='border-none'
      title={"Manufacturer"}
      extra={
        <CreateDrawer
          permission={"create-manufacturer"}
          title={"Create Manufacturer"}
          width={35}
        >
          <AddManufacturer />
        </CreateDrawer>
      }
    >
      <UserPrivateComponent permission={"readAll-manufacturer"}>
        <TableComponent
          total={total}
          columns={columns}
          list={list}
          loading={loading}
          setPageConfig={setPageConfig}
          title={"Manufacturer"}
          filters={filters}
        />
      </UserPrivateComponent>
      <Modal
        title={<div className='border-b pb-5'>Update Manufacturer</div>}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <UpdateManufacturer handleCancel={handleCancel} />
      </Modal>
    </Card>
  );
}
