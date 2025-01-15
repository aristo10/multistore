import Card from "@/UI/Card";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useAttachmentFilter from "./useAttachmentFilter";
import { loadAllAttachmentPaginated } from "@/redux/rtk/features/CRM/attachment/attachmentSlice";
import dayjs from "dayjs";
import AddAttachment from "./AddAttachment";
import ViewBtn from "@/components/Buttons/ViewBtn";

export default function GetAllAttachment() {
  const dispatch = useDispatch();
  const { list, loading, total } = useSelector((state) => state.attachment);
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
  });

  const filters = useAttachmentFilter();

  const columns = [
    {
      title: "Name",
      key: "attachmentName",
      render: ({ attachmentName, attachmentPath }) => (
        <Link
          target="_blank"
          to={window.env.VITE_APP_API + "/media/view/" + attachmentPath}
        >
          {attachmentName}
        </Link>
      ),
      renderCsv: ({ attachmentName }) => attachmentName,
    },

    {
      title: "Owner",
      dataIndex: "attachmentOwner",
      key: "owner",
      render: (attachmentOwner, item) => (
        <Link to={`/admin/hrm/staff/${item?.attachmentOwnerId}`}>
          {`${attachmentOwner?.firstName} ${attachmentOwner?.lastName}`}
        </Link>
      ),
      renderCsv: (attachmentOwner) =>
        `${attachmentOwner?.firstName} ${attachmentOwner?.lastName}`,
    },

    {
      title: "Company",
      key: "company",
      dataIndex: "company",
      render: (company) => (
        <Link to={`/admin/crm/company/${company?.id}`}>
          {company?.companyName}
        </Link>
      ),
      renderCsv: (company) => company.companyName,
    },
    {
      title: "Contact",
      key: "contact",
      dataIndex: "contact",
      render: (contact) => (
        <Link to={`/admin/crm/contact/${contact?.id}`}>
          {contact?.firstName} {contact?.lastName}
        </Link>
      ),
      renderCsv: (contact) => `${contact?.firstName} ${contact?.lastName}`,
    },
    {
      title: "Opportunity",
      key: "opportunity",
      dataIndex: "opportunity",
      render: (opportunity) => (
        <Link to={`/admin/crm/opportunity/${opportunity?.id}`}>
          {opportunity?.opportunityName}
        </Link>
      ),
      renderCsv: (opportunity) => opportunity?.opportunityName,
    },
    {
      title: "Quote",
      key: "quote",
      dataIndex: "quote",
      render: (quote) => (
        <Link to={`/admin/crm/quote/${quote?.id}`}>{quote?.quoteName}</Link>
      ),
      renderCsv: (quote) => quote.quoteName,
    },
    {
      title: "Create date",
      key: "Create date",
      dataIndex: "createdAt",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
      renderCsv: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      id: 4,
      title: "",
      key: "action",
      render: ({ attachmentPath }) => [
        {
          label: (
            <ViewBtn
              title={"View"}
              path={window.env.VITE_APP_API + "media/view/" + attachmentPath}
            />
          ),
          key: "view",
        },
      ],
      csvOff: true,
    },
  ];

  useEffect(() => {
    dispatch(loadAllAttachmentPaginated(pageConfig));
  }, [dispatch, pageConfig]);

  return (
    <Card
      className="max-md:border-0 max-md:bg-white"
      bodyClass="max-md:p-0 "
      headClass="border-none"
      title={"Attachment"}
      extra={
        <CreateDrawer
          permission={"create-attachment"}
          title={"Create Attachment"}
          width={40}
        >
          <AddAttachment />
        </CreateDrawer>
      }
    >
      <UserPrivateComponent permission={"readAll-attachment"}>
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
