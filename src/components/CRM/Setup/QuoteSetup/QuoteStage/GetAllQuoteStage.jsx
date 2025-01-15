import Card from "@/UI/Card";
import CommonDelete from "@/components/CommonUi/CommonDelete";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UpdateDrawer from "@/components/CommonUi/UpdateDrawer";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import {
  clearQuoteStageEdit,
  deleteQuoteStage,
  editQuoteStage,
  loadAllQuoteStage,
} from "@/redux/rtk/features/CRM/QuoteStage/QuoteStageSlice";
import { EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddQuoteStage from "./AddQuoteStage";

export default function GetAllQuoteStage() {
  const dispatch = useDispatch();
  const { list, loading, total, edit } = useSelector(
    (state) => state.quoteStage
  );

  const columns = [
    {
      title: "NAME",
      dataIndex: "quoteStageName",
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
      render: ({ id, quoteStageName }) => [
        {
          label: (
            <div
              onClick={() =>
                dispatch(editQuoteStage({ id, values: { quoteStageName } }))
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
              permission={"delete-quoteStage"}
              deleteThunk={deleteQuoteStage}
              loadThunk={loadAllQuoteStage}
            />
          ),
          key: "delete",
        },
      ],

      csvOff: true,
    },
  ];

  useEffect(() => {
    dispatch(loadAllQuoteStage());
  }, [dispatch]);

  return (
    <Card
      className='max-md:border-0 max-md:bg-white'
      bodyClass='max-md:p-0 '
      headClass='border-none'
      title={"Quote Stage"}
      extra={
        <CreateDrawer
          permission={"create-quoteStage"}
          title={"Create Quote Stage"}
          width={35}
        >
          <AddQuoteStage />
        </CreateDrawer>
      }
    >
      <UserPrivateComponent permission={"readAll-quoteStage"}>
        <TableComponent
          list={list}
          columns={columns}
          loading={loading}
          total={total}
          title={"Quote Stage List"}
          isSearch={false}
        />
      </UserPrivateComponent>
      <UpdateDrawer
        permission={"update-quoteStage"}
        title={"Update Quote Stage"}
        width={35}
        open={edit}
        setClose={clearQuoteStageEdit}
      >
        <AddQuoteStage edit={edit} />
      </UpdateDrawer>
    </Card>
  );
}
