import Card from "@/UI/Card";
import Menu from "@/UI/Menu";
import {
  deleteStore,
  loadAllStorePaginated,
  updateDefaultStore,
} from "@/redux/rtk/features/store/storeSlice";
import { Popover } from "antd";
import { useEffect, useState } from "react";
import { IoMdSwitch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import CommonDelete from "../CommonUi/CommonDelete";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TableComponent from "../CommonUi/TableComponent";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import AddStore from "./AddStore";
import UpdateStore from "./UpdateStore";
const userId = localStorage.getItem("id");

export default function GetAllStore() {
  const dispatch = useDispatch();
  const { list, total, loading, defaultStore } = useSelector(
    (state) => state.store
  );
  const [open, setOpen] = useState(false);
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
      title: "name",
      dataIndex: "name",
      key: "name",
    },

    {
      id: 3,
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      id: 4,
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      id: 5,
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      id: 6,
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      id: 7,
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      id: 4,
      title: "",
      key: "action",
      render: (item) => [
        {
          label: (
            <UserPrivateComponent permission={"update-store"}>
              <UpdateStore data={item} />
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
              deleteThunk={deleteStore}
              loadThunk={loadAllStorePaginated}
              permission={"delete-store"}
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
    dispatch(loadAllStorePaginated(pageConfig));
  }, [dispatch, pageConfig]);


  return (
    <Card
      className='max-md:border-0 max-md:bg-white'
      bodyClass='max-md:p-0 '
      headClass='border-none'
      title={"Store"}
      extra={
        <>
          <CreateDrawer
            permission={"create-store"}
            title={"Create Store"}
            width={35}
          >
            <AddStore />
          </CreateDrawer>
         
        </>
      }
    >
      {" "}
      <UserPrivateComponent permission={"readAll-store"}>
        <TableComponent
          total={total}
          columns={columns}
          list={list}
          loading={loading}
          setPageConfig={setPageConfig}
          title={"Store"}
          filters={filters}
        />
      </UserPrivateComponent>
    </Card>
  );
}
