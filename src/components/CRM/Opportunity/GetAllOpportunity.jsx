import Card from "@/UI/Card";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import { loadAllOpportunityPaginated } from "@/redux/rtk/features/CRM/opportunity/opportunitySlice";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddOpportunity from "./AddOpportunity";
import useOpportunityFilter from "./useOpportunityFilter";

export default function GetAllOpportunity() {
  const dispatch = useDispatch();
  const { list, loading, total, edit } = useSelector(
    (state) => state.opportunity
  );
  const filters = useOpportunityFilter();
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
  });

  const columns = [
    {
      title: "Name",
      key: "Opportunity Name",
      render: ({ opportunityName, id }) => (
        <Link to={`/admin/crm/opportunity/${id}`}>{opportunityName}</Link>
      ),
      renderCsv: ({ opportunityName }) => opportunityName,
    },
    {
      title: "Owner",
      dataIndex: "opportunityOwner",
      key: "owner",
      render: (opportunityOwner, item) => (
        <Link to={`/admin/crm/staffs/${item?.opportunityOwnerId}`}>
          {opportunityOwner.firstName} {opportunityOwner.lastName}
        </Link>
      ),
      renderCsv: (opportunityOwner) =>
        `${opportunityOwner.firstName} ${opportunityOwner.lastName}`,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      amount: "amount",
    },

    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      render: (company, item) => (
        <Link to={`/admin/crm/company/${item?.companyId}`}>
          {company?.companyName}
        </Link>
      ),
      renderCsv: (company) => company?.companyName,
    },

    {
      title: "Stage",
      key: "Stage",
      dataIndex: "opportunityStage",
      render: (field) => field?.opportunityStageName,
      renderCsv: (field) => field?.opportunityStageName,
    },

    {
      title: "Type",
      dataIndex: "opportunityType",
      key: "opportunityType",
      render: (opportunityType) => opportunityType?.opportunityTypeName,
      renderCsv: (opportunityType) => opportunityType?.opportunityTypeName,
    },
    {
      title: "Source",
      dataIndex: "opportunitySource",
      key: "opportunitySource",
      render: (opportunitySource) => opportunitySource?.opportunitySourceName,
      renderCsv: (opportunitySource) =>
        opportunitySource?.opportunitySourceName,
    },
    {
      title: "Create date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => moment(date).format("ll"),
      renderCsv: (date) => moment(date).format("ll"),
    },
  ];

  useEffect(() => {
    dispatch(loadAllOpportunityPaginated(pageConfig));
  }, [dispatch, pageConfig]);

  return (
    <>
      <Card
        className='max-md:border-0 max-md:bg-white'
        bodyClass='max-md:p-0 '
        headClass='border-none'
        title={"Opportunity"}
        extra={
          <CreateDrawer
            permission={"create-opportunity"}
            title={"Create Opportunity"}
            width={40}
          >
            <AddOpportunity />
          </CreateDrawer>
        }
      >
        <UserPrivateComponent permission={"readAll-opportunity"}>
          <TableComponent
            list={list}
            columns={columns}
            loading={loading}
            total={total}
            setPageConfig={setPageConfig}
            title={"Opportunity List"}
            isSearch
            filters={filters}
          />
        </UserPrivateComponent>
      </Card>
    </>
  );
}
