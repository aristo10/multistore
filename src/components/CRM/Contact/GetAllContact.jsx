import Card from "@/UI/Card";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import { loadAllContactPaginated } from "@/redux/rtk/features/CRM/contact/contactSlice";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddContact from "./AddContact";
import useContactFilter from "./useContactFilter";

export default function GetAllContact() {
  const dispatch = useDispatch();
  const { list, loading, total } = useSelector((state) => state.contact);
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
  });

  const filters = useContactFilter();

  const columns = [
    {
      title: "Name",
      key: "name",
      render: ({ firstName, lastName, id }) => (
        <Link to={`${id}`}>
          {firstName} {lastName}
        </Link>
      ),
      renderCsv: ({ firstName, lastName }) => `${firstName} ${lastName}`,
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Phone number",
      key: "phone",
      dataIndex: "phone",
    },
    {
      title: "Owner",
      dataIndex: "contactOwner",
      key: "owner",
      render: (contactOwner, item) => (
        <Link to={`/admin/hrm/staff/${item?.contactOwnerId}`}>
          {contactOwner?.firstName} {contactOwner?.lastName}
        </Link>
      ),
      renderCsv: (contactOwner) =>
        `${contactOwner?.firstName} ${contactOwner?.lastName}`,
    },
    {
      title: "Company",
      key: "Company",
      dataIndex: "company",
      render: (company, item) => (
        <Link to={`/admin/crm/company/${item?.companyId}`}>
          {company?.companyName}
        </Link>
      ),
      renderCsv: (company) => company?.companyName,
    },

    {
      title: "Source",
      key: "contactSource",
      dataIndex: "contactSource",
      render: (contactSource) => contactSource?.contactSourceName,
      renderCsv: (contactSource) => contactSource?.contactSourceName,
    },
    {
      title: "Stage",
      key: "contactStage",
      dataIndex: "contactStage",
      render: (contactStage) => contactStage?.contactStageName,
      renderCsv: (contactStage) => contactStage?.contactStageName,
    },
    {
      title: "Industry",
      key: "Industry",
      dataIndex: "industry",
      render: (industry) => industry?.industryName,
      renderCsv: (industry) => industry?.industryName,
    },
    {
      title: "Create date",
      key: "Create date",
      dataIndex: "createdAt",
      render: (date) => moment(date).format("ll"),
      renderCsv: (date) => moment(date).format("ll"),
    },
  ];

  useEffect(() => {
    dispatch(loadAllContactPaginated(pageConfig));
  }, [dispatch, pageConfig]);

  return (
    <Card
      className="max-md:border-0 max-md:bg-white"
      bodyClass="max-md:p-0 "
      headClass="border-none"
      title={"Contact"}
      extra={
        <CreateDrawer
          permission={"create-contact"}
          title={"Create Contact"}
          width={50}
        >
          <AddContact />
        </CreateDrawer>
      }
    >
      <UserPrivateComponent permission={"readAll-contact"}>
        <TableComponent
          list={list}
          columns={columns}
          loading={loading}
          total={total}
          setPageConfig={setPageConfig}
          title={"Contact List"}
          isSearch
          filters={filters}
        />
      </UserPrivateComponent>
    </Card>
  );
}
