import Card from "@/UI/Card";
import { loadAllSalesCommission } from "@/redux/rtk/features/sale/saleSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TableComponent from "../CommonUi/TableComponent";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";

export default function SalesCommission() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.sales);
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
  });
  const columns = [
    {
      id: 1,
      title: "Invoice",
      dataIndex: "id",
      key: "id",
      render: (id) => <Link to={`/admin/sale/${id}`}>{id}</Link>,
      renderCsv: (id) => id,
    },
    {
      id: 2,
      title: "Sales Man",
      dataIndex: "user",
      key: "user",
      render: (user) => (
        <Link to={`/admin/hrm/staff/${user.id}`}>{user.username}</Link>
      ),
      renderCsv: (user) => user.username,
    },
    {
      id: 3,
      title: "Total Commission ",
      dataIndex: "totalPayableCommission",
      key: "totalPayableCommission",
    },
    {
      id: 4,
      title: "Return Commission",
      dataIndex: "commissionReduceForReturn",
      key: "commissionReduceForReturn",
    },
  ];
  useEffect(() => {
    dispatch(loadAllSalesCommission(pageConfig));
  }, [dispatch, pageConfig]);
  return (
    <Card
      className='max-md:border-0 max-md:bg-white'
      bodyClass='max-md:p-0 '
      headClass='border-none'
      title={"Sales Commission"}
    >
      <UserPrivateComponent permission={"readAll-saleCommission"}>
        <TableComponent
          list={list}
          columns={columns}
          loading={loading}
          // total={total?._count?.id}
          setPageConfig={setPageConfig}
          title={"Sales Commission"}
        />
      </UserPrivateComponent>
    </Card>
  );
}
