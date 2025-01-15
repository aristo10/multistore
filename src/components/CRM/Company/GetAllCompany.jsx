import Card from "@/UI/Card";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import { loadAllCompanyPaginated } from "@/redux/rtk/features/CRM/company/companySlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddCompany from "./AddCompany";
import useCompanyFilter from "./useCompanyFilter";

export default function GetAllCompany() {
  const dispatch = useDispatch();
  const { list, loading, total } = useSelector((state) => state.company);
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
  });

  const filters = useCompanyFilter();

  const columns = [
    {
      title: "Name",
      key: "COMPANY NAME",
      dataIndex: "companyName",
      render: (companyName, { id }) => (
        <Link to={`/admin/crm/company/${id}`}>{companyName}</Link>
      ),
      renderCsv: (companyName) => companyName,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Owner",
      dataIndex: "companyOwner",
      key: "owner",
      render: (companyOwner, item) => (
        <Link to={`/admin/hrm/staff/${item?.companyOwnerId}`}>
          {companyOwner.firstName} {companyOwner.lastName}
        </Link>
      ),
      renderCsv: (companyOwner) =>
        `${companyOwner.firstName} ${companyOwner.lastName}`,
    },

    {
      title: "Type",
      dataIndex: "companyType",
      render: (companyType) => companyType?.companyTypeName,
      renderCsv: (companyType) => companyType?.companyTypeName,
    },
    {
      title: "Size",
      dataIndex: "companySize",
      key: "companySize",
    },

    {
      title: "Annual Revenue",
      dataIndex: "annualRevenue",
      key: "annualRevenue",
    },
    {
      title: "Industry",
      dataIndex: "industry",
      render: (industry) => industry?.industryName,
      renderCsv: (industry) => industry?.industryName,
    },
  ];

  useEffect(() => {
    dispatch(loadAllCompanyPaginated(pageConfig));
  }, [dispatch, pageConfig]);

  return (
    <Card
      className='max-md:border-0 max-md:bg-white'
      bodyClass='max-md:p-0 '
      headClass='border-none'
      title={"Company"}
      extra={
        <CreateDrawer
          permission={"create-company"}
          title={"Create Company"}
          width={40}
        >
          <AddCompany />
        </CreateDrawer>
      }
    >
      <UserPrivateComponent permission={"readAll-company"}>
        <TableComponent
          list={list}
          columns={columns}
          loading={loading}
          total={total}
          setPageConfig={setPageConfig}
          title={"company List"}
          isSearch
          filters={filters}
        />
      </UserPrivateComponent>
    </Card>
  );
}
