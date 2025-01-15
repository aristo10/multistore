import Card from "@/UI/Card";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadAllQuotePaginated } from "@/redux/rtk/features/quote/quoteSlice";
import AddQuote from "./AddQuote";
import useQuoteFilter from "./useQuoteFilter";

export default function GetAllContact() {
  const dispatch = useDispatch();
  const { list, loading, total } = useSelector((state) => state.quote);
  const filters = useQuoteFilter();
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
  });

  const columns = [
    {
      title: "Name",
      key: "quoteName",
      render: ({ quoteName, id }) => (
        <Link to={`/admin/crm/quote/${id}`}>{quoteName}</Link>
      ),
    },
    {
      title: "Owner",
      dataIndex: "quoteOwner",
      render: (quoteOwner) => (
        <Link to={`/admin/hr/staffs/${quoteOwner.id}`}>
          {quoteOwner.username}
        </Link>
      ),
      renderCsv: (quoteOwner) => quoteOwner.username,
    },
    {
      title: "Quotation Date",
      dataIndex: "quoteDate",
      render: (quoteDate) => moment(quoteDate).format("ll"),
      renderCsv: (quoteDate) => moment(quoteDate).format("ll"),
    },
    {
      title: "Expiration Date",
      dataIndex: "expirationDate",
      render: (date) => moment(date).format("ll"),
      renderCsv: (date) => moment(date).format("ll"),
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      title: "Company",
      dataIndex: "company",
      render: (company, item) => (
        <Link to={`/admin/crm/company/${item?.companyId}`}>
          {company?.companyName}
        </Link>
      ),
      renderCsv: (company) => company?.companyName,
    },
    {
      title: "Contact",
      dataIndex: "contact",
      render: (contact) => (
        <Link to={`/admin/crm/contact/${contact.id}`}>
          {`${contact?.firstName} ${contact?.lastName}`}
        </Link>
      ),
      renderCsv: (company) => company?.companyName,
    },
    {
      title: "Opportunity",
      dataIndex: "opportunity",
      render: (opportunity) => (
        <Link to={`/admin/crm/opportunity/${opportunity?.id}`}>
          {opportunity?.opportunityName}
        </Link>
      ),
      renderCsv: (opportunity) => opportunity?.opportunityName,
    },

    {
      title: "Create Date",
      dataIndex: "createdAt",
      render: (date) => moment(date).format("ll"),
      renderCsv: (date) => moment(date).format("ll"),
    },
  ];
  useEffect(() => {
    dispatch(loadAllQuotePaginated(pageConfig));
  }, [dispatch, pageConfig]);

  return (
    <Card
      className="max-md:border-0 max-md:bg-white"
      bodyClass="max-md:p-0 "
      headClass="border-none"
      title={"Quote"}
      extra={
        <CreateDrawer
          permission={"create-quote"}
          title={"Create Quote"}
          width={70}
        >
          <AddQuote />
        </CreateDrawer>
      }
    >
      <UserPrivateComponent permission={"readAll-quote"}>
        <TableComponent
          list={list}
          columns={columns}
          loading={loading}
          total={total}
          setPageConfig={setPageConfig}
          title={"Quote List"}
          isSearch
          filters={filters}
        />
      </UserPrivateComponent>
    </Card>
  );
}
