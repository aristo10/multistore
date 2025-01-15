import Card from "@/UI/Card";
import CommonDelete from "@/components/CommonUi/CommonDelete";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UpdateDrawer from "@/components/CommonUi/UpdateDrawer";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import {
  clearOpportunityTypeEdit,
  deleteOpportunityType,
  editOpportunityType,
  loadAllOpportunityType,
} from "@/redux/rtk/features/CRM/opportunityType/opportunityTypeSlice";
import { EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddOpportunityType from "./AddOpportunityType";

export default function GetAllOpportunityType() {
  const dispatch = useDispatch();
  const { list, loading, total, edit } = useSelector(
    (state) => state.opportunityType
  );

  const columns = [
    {
      title: "NAME",
      dataIndex: "opportunityTypeName",
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
      render: ({ id, opportunityTypeName }) => [
        {
          label: (
            <div
              onClick={() =>
                dispatch(
                  editOpportunityType({ id, values: { opportunityTypeName } })
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
              permission={"delete-opportunityType"}
              deleteThunk={deleteOpportunityType}
              loadThunk={loadAllOpportunityType}
            />
          ),
          key: "delete",
        },
      ],

      csvOff: true,
    },
  ];

  useEffect(() => {
    dispatch(loadAllOpportunityType());
  }, [dispatch]);

  return (
    <Card
      className='max-md:border-0 max-md:bg-white'
      bodyClass='max-md:p-0 '
      headClass='border-none'
      title={"Opportunity Type"}
      extra={
        <CreateDrawer
          permission={"create-opportunityType"}
          title={"Create Opportunity Type"}
          width={35}
        >
          <AddOpportunityType />
        </CreateDrawer>
      }
    >
      <UserPrivateComponent permission={"readAll-opportunityType"}>
        <TableComponent
          list={list}
          columns={columns}
          loading={loading}
          total={total}
          title={"Opportunity Type List"}
          isSearch={false}
        />
      </UserPrivateComponent>
      <UpdateDrawer
        permission={"update-opportunityType"}
        title={"Update Opportunity Type"}
        width={35}
        open={edit}
        setClose={clearOpportunityTypeEdit}
      >
        <AddOpportunityType edit={edit} />
      </UpdateDrawer>
    </Card>
  );
}
