import { EditOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../UI/Card";
import {
  clearUoMList,
  deleteUom,
  editUoM,
  loadAllUomPaginated,
} from "../../redux/rtk/features/uom/uomSlice";
import CommonDelete from "../CommonUi/CommonDelete";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TableComponent from "../CommonUi/TableComponent";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import AddUoM from "./AddUoM";
import UpdateUoM from "./UpdateUoM";

export default function GetAllUoM() {
  const dispatch = useDispatch();
  const { list, total, loading } = useSelector((state) => state.uom);
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    status: "true",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
      id: 3,
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("YYYY-MM-DD"),
      renderCsv: (createdAt) => moment(createdAt).format("YYYY-MM-DD"),
    },
    {
      id: 4,
      title: "",
      key: "action",
      render: (item) => [
        {
          label: (
            <UserPrivateComponent permission={"update-uom"}>
              <div
                onClick={() => {
                  dispatch(editUoM(item));
                  showModal();
                }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <EditOutlined className="gray-600 rounded-md" />
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
              permission={"delete-uom"}
              deleteThunk={deleteUom}
              loadThunk={loadAllUomPaginated}
              query={pageConfig}
              className="bg-white text-black"
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
    dispatch(loadAllUomPaginated(pageConfig));
    return () => {
      dispatch(clearUoMList());
    };
  }, [dispatch, pageConfig]);
  return (
    <>
      <Card
        className="max-md:border-0 max-md:bg-white"
        bodyClass="max-md:p-0 "
        headClass="border-none"
        title={"UoM List"}
        extra={
          <CreateDrawer
            permission={"create-uom"}
            title={"Create UoM"}
            width={35}
          >
            <AddUoM />
          </CreateDrawer>
        }
      >
        <UserPrivateComponent permission={"readAll-uom"}>
          <TableComponent
            total={total}
            columns={columns}
            list={list}
            filters={filters}
            loading={loading}
            setPageConfig={setPageConfig}
            title={"UoM List"}
          />
        </UserPrivateComponent>
      </Card>
      <Modal
        title="Update UoM"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <UpdateUoM handleCancel={handleCancel} />
      </Modal>
    </>
  );
}
