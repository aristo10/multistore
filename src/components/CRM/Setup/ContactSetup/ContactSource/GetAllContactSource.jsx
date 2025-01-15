import Card from "@/UI/Card";
import CommonDelete from "@/components/CommonUi/CommonDelete";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UpdateDrawer from "@/components/CommonUi/UpdateDrawer";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import {
  contactSourceEditClear,
  deleteContactSource,
  editContactSource,
  loadAllContactSource,
} from "@/redux/rtk/features/CRM/contactSource/contactSourceSlice";
import { EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddContactSource from "./AddContactSource";

export default function GetAllContactSource() {
  const dispatch = useDispatch();
  const { list, loading, total, edit } = useSelector(
    (state) => state.contactSource
  );

  const columns = [
    {
      title: "NAME",
      dataIndex: "contactSourceName",
    },
    {
      title: "CREATE DATE",
      dataIndex: "createdAt",
      render: (date) => moment(date).format("ll"),
    },
    {
      title: "UPDATE DATE",
      dataIndex: "updatedAt",
      render: (date) => moment(date).format("ll"),
    },
    {
      id: 3,
      title: "",
      key: "action",
      render: ({ id, contactSourceName }) => [
        {
          label: (
            <div
              onClick={() =>
                dispatch(
                  editContactSource({ id, values: { contactSourceName } })
                )
              }
              className='flex items-center gap-2 cursor-pointer'
            >
              <EditOutlined className=' rounded-md' />
              Edit
            </div>
          ),
          key: "edit",
        },
        {
          label: (
            <CommonDelete
              id={id}
              title={"delete"}
              permission={"delete-contactSource"}
              deleteThunk={deleteContactSource}
              loadThunk={loadAllContactSource}
            />
          ),
          key: "delete",
        },
      ],

      csvOff: true,
    },
  ];

  useEffect(() => {
    dispatch(loadAllContactSource());
  }, [dispatch]);

  return (
    <Card
      className='max-md:border-0 max-md:bg-white'
      bodyClass='max-md:p-0 '
      headClass='border-none'
      title={"Contact Source"}
      extra={
        <CreateDrawer
          permission={"create-contactSource"}
          title={"Create Contact Source"}
          width={35}
        >
          <AddContactSource />
        </CreateDrawer>
      }
    >
      <UserPrivateComponent permission={"readAll-contactSource"}>
        <TableComponent
          list={list}
          columns={columns}
          loading={loading}
          total={total}
          title={"Contact Source List"}
          isSearch={false}
        />
      </UserPrivateComponent>
      <UpdateDrawer
        permission={"update-contactSource"}
        title={"Update Contact Source"}
        width={35}
        open={edit}
        setClose={contactSourceEditClear}
      >
        <AddContactSource edit={edit} />
      </UpdateDrawer>
    </Card>
  );
}
