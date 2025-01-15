import CommonDelete from "@/components/CommonUi/CommonDelete";
import { Modal } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../../../UI/Card";
import {
  deleteProductAttribute,
  loadAllProductAttributePaginated,
} from "../../../redux/rtk/features/eCommerce/productAttribute/productAttribute";
import ViewBtn from "../../Buttons/ViewBtn";
import CreateDrawer from "../../CommonUi/CreateDrawer";
import TableComponent from "../../CommonUi/TableComponent";
import UserPrivateComponent from "../../PrivacyComponent/UserPrivateComponent";
import AddProductAttribute from "./AddProductAttribute";
import UpdateAttribute from "./UpdateAttribute";

export default function GetAllProductAttribute() {
  const dispatch = useDispatch();
  const { list, total, loading } = useSelector(
    (state) => state.productAttribute
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    status: "true",
  });
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => <Link to={`/admin/product-attribute/${id}`}>{id}</Link>,
      renderCsv: (id) => id,
    },
    {
      id: 2,
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name, { id }) => (
        <Link to={`/admin/product-attribute/${id}`}>{name}</Link>
      ),
      renderCsv: (name) => name,
    },
    {
      id: 3,
      title: "Create Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD/MM/YYYY"),
      renderCsv: (createdAt) => moment(createdAt).format("DD/MM/YYYY"),
    },
    {
      id: 4,
      title: "",
      key: "action",

      render: ({ id, status }) => [
        {
          label: (
            <ViewBtn title={"View"} path={`/admin/product-attribute/${id}`} />
          ),
          key: "view",
        },
        {
          label: (
            <CommonDelete
              values={{
                id,
                status,
              }}
              title={status === "true" ? "Hide" : "Show"}
              permission={"delete-productAttributeValue"}
              deleteThunk={deleteProductAttribute}
              loadThunk={loadAllProductAttributePaginated}
              query={pageConfig}
              className="bg-white text-black"
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
    dispatch(loadAllProductAttributePaginated(pageConfig));
  }, [dispatch, pageConfig]);

  return (
    <>
      <Card
        className="max-md:border-0 max-md:bg-white"
        bodyClass="max-md:p-0 "
        headClass="border-none"
        title={"Product Attribute "}
        extra={
          <CreateDrawer
            permission={"create-productAttribute"}
            title={"Create Attribute"}
            width={35}
          >
            <AddProductAttribute />
          </CreateDrawer>
        }
      >
        <UserPrivateComponent permission={"readAll-productAttribute"}>
          <TableComponent
            total={total}
            columns={columns}
            list={list}
            loading={loading}
            filters={filters}
            setPageConfig={setPageConfig}
            title={"Product Attribute List"}
          />
        </UserPrivateComponent>
      </Card>
      <Modal
        title="Update Product Attribute"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <UpdateAttribute handleCancel={handleCancel} />
      </Modal>
    </>
  );
}
