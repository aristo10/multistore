import {
  AppstoreOutlined,
  FileProtectOutlined,
  ImportOutlined,
  OrderedListOutlined,
  SettingOutlined,
  TeamOutlined,
  UngroupOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { BiSolidDiscount } from "react-icons/bi";
import { BsBuildingFillGear } from "react-icons/bs";
import { GiTicket } from "react-icons/gi";
import {
  MdAcUnit,
  MdOutlineAttachMoney,
  MdOutlineColorLens,
  MdOutlineEditAttributes,
} from "react-icons/md";
import { TbShoppingCartCog } from "react-icons/tb";
import { NavLink } from "react-router-dom";

export default function useSettingNav() {
  return [
    {
      label: (
        <NavLink to="/admin/company-settings">
          <span>Company settings</span>
        </NavLink>
      ),
      permit: {
        permissions: ["update-setting"],
        operator: "or",
      },
      key: "invoiceSetting",
      icon: <BsBuildingFillGear />,
    },
    {
      label: (
        <NavLink to="/admin/app-settings">
          <span>App settings</span>
        </NavLink>
      ),
      permit: {
        permissions: ["update-setting"],
        operator: "or",
      },
      key: "appSettings",
      icon: <MdOutlineColorLens />,
    },
    {
      label: "Inventory",
      key: "inventory",
      icon: <TbShoppingCartCog />,
      children: [
        {
          label: (
            <NavLink to="/admin/product-category">
              <span>Product Category</span>
            </NavLink>
          ),
          permit: {
            permissions: ["create-productCategory", "readAll-productCategory"],
            operator: "or",
          },
          key: "productCategory",
          icon: <AppstoreOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/product-subcategory">
              <span>Product Subcategory</span>
            </NavLink>
          ),
          permit: {
            permissions: [
              "create-productSubCategory",
              "readAll-productSubCategory",
            ],
            operator: "or",
          },
          key: "productSubcategory",
          icon: <UngroupOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/product-brand">
              <span>Product Brand</span>
            </NavLink>
          ),
          permit: {
            permissions: ["create-productBrand", "readAll-productBrand"],
            operator: "or",
          },
          key: "productBrand",
          icon: <FileProtectOutlined />,
        },

        {
          label: (
            <NavLink to="/admin/product-attribute">
              <span>Product Attribute</span>
            </NavLink>
          ),
          permit: {
            permissions: ["create-attribute", "readAll-attribute"],
            operator: "or",
          },
          key: "productAttribute",
          icon: <MdOutlineEditAttributes />,
        },
        {
          label: (
            <NavLink to="/admin/import-product">
              <span>Import Product </span>
            </NavLink>
          ),
          permit: {
            permissions: ["create-product"],
            operator: "or",
          },
          key: "import_csv",
          icon: <ImportOutlined />,
        },

        {
          label: (
            <NavLink to="/admin/uom">
              <span>UoM</span>
            </NavLink>
          ),
          permit: {
            permissions: ["create-uom", "readAll-uom"],
            operator: "or",
          },
          key: "UoM",
          icon: <MdAcUnit />,
        },
        {
          label: (
            <NavLink to="/admin/manufacturer">
              <span>Manufacturer</span>
            </NavLink>
          ),
          permit: {
            permissions: ["create-manufacturer", "readAll-manufacturer"],
            operator: "or",
          },
          key: "manufacturer",
          icon: <OrderedListOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/weight-unit">
              <span>Weight Unit</span>
            </NavLink>
          ),
          permit: {
            permissions: ["create-wightUnit", "readAll-wightUnit"],
            operator: "or",
          },
          key: "weightUnit",
          icon: <OrderedListOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/dimension-unit">
              <span>Dimension Unit</span>
            </NavLink>
          ),
          permit: {
            permissions: ["create-dimensionUnit", "readAll-dimensionUnit"],
            operator: "or",
          },
          key: "dimensionUnit",
          icon: <OrderedListOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/adjust-inventory">
              <span>Adjust Inventory</span>
            </NavLink>
          ),
          permit: {
            permissions: ["create-adjust", "readAll-adjust"],
            operator: "or",
          },
          key: "adjust-inventory",
          icon: <OrderedListOutlined />,
        },

        {
          label: (
            <NavLink to="/admin/print-page-setting">
              <span>Barcode page setting</span>
            </NavLink>
          ),
          permit: {
            permissions: ["create-pageSize", "readAll-pageSize"],
            operator: "or",
          },
          key: "Barcode page setting",
        },
      ],
    },
    {
      label: "Others",
      key: "Others",
      icon: <SettingOutlined />,
      children: [
        {
          label: (
            <NavLink to="/admin/coupon">
              <span>Coupon</span>
            </NavLink>
          ),
          permit: {
            permissions: ["create-coupon", "readAll-coupon"],
            operator: "or",
          },
          key: "coupon",
          icon: <GiTicket />,
        },
        {
          label: (
            <NavLink to="/admin/discount">
              <span>Discount</span>
            </NavLink>
          ),
          permit: {
            permissions: ["create-discount", "readAll-discount"],
            operator: "or",
          },
          key: "Discount",
          icon: <BiSolidDiscount />,
        },
        {
          label: (
            <NavLink to="/admin/currency">
              <span>Currency</span>
            </NavLink>
          ),
          permit: {
            permissions: ["create-currency", "readAll-currency"],
            operator: "or",
          },
          key: "Currency",
          icon: <MdOutlineAttachMoney />,
        },
        {
          label: (
            <NavLink to="/admin/vat-tax">
              <span>VAT/TAX</span>
            </NavLink>
          ),
          permit: {
            permissions: ["create-vat", "readAll-vat"],
            operator: "or",
          },
          key: "VAT/TAX",
          icon: <SettingOutlined />,
        },
      ],
    },
    {
      label: "Contact Setup",
      permit: {
        permissions: [
          "create-contactSource",
          "readAll-contactSource",
          "create-contactStage",
          "readAll-contactStage",
        ],
        operator: "or",
      },
      key: "contactSetup",
      icon: <TeamOutlined />,
      children: [
        {
          label: (
            <NavLink to="/admin/crm/contact-source">
              <span>Contact Source</span>
            </NavLink>
          ),
          key: "contactSource",
          icon: <UsergroupAddOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/crm/contact-stage">
              <span>Contact Stage</span>
            </NavLink>
          ),
          key: "contactStage",
          icon: <UsergroupAddOutlined />,
        },
      ],
    },
    {
      label: "Company Setup",
      permit: {
        permissions: [
          "create-companyType",
          "readAll-companyType",
          "create-companyType",
        ],
        operator: "or",
      },
      key: "companySetup",
      icon: <TeamOutlined />,
      children: [
        {
          label: (
            <NavLink to="/admin/crm/company-type">
              <span>Company Type</span>
            </NavLink>
          ),
          key: "companyType",
          icon: <UsergroupAddOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/crm/industry">
              <span>Industry</span>
            </NavLink>
          ),
          key: "Industry",
          icon: <UsergroupAddOutlined />,
        },
      ],
    },
    {
      label: "Opportunity Setup",
      permit: {
        permissions: [
          "create-opportunitySource",
          "readAll-opportunitySource",
          "create-opportunityStage",
          "readAll-opportunityStage",
          "create-opportunityType",
          "readAll-opportunityType",
        ],
        operator: "or",
      },
      key: "opportunitySetup",
      icon: <TeamOutlined />,
      children: [
        {
          label: (
            <NavLink to="/admin/crm/opportunity-source">
              <span>Opportunity Source</span>
            </NavLink>
          ),
          key: "opportunitySource",
          icon: <UsergroupAddOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/crm/opportunity-stage">
              <span>Opportunity Stage</span>
            </NavLink>
          ),
          key: "opportunityStage",
          icon: <UsergroupAddOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/crm/opportunity-type">
              <span>Opportunity Type</span>
            </NavLink>
          ),
          key: "opportunityType",
          icon: <UsergroupAddOutlined />,
        },
      ],
    },
    {
      label: "Task Setup",
      permit: {
        permissions: [
          "create-crmTaskType",
          "readAll-crmTaskType",
          "create-crmTaskStatus",
          "readAll-crmTaskStatus",
        ],
        operator: "or",
      },
      key: "taskSetup",
      icon: <TeamOutlined />,
      children: [
        {
          label: (
            <NavLink to="/admin/crm/task-status">
              <span>Task Status</span>
            </NavLink>
          ),
          key: "CemTaskStatus",
          icon: <UsergroupAddOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/crm/task-type">
              <span>Task Type</span>
            </NavLink>
          ),
          key: "CemTaskType",
          icon: <UsergroupAddOutlined />,
        },
      ],
    },
    {
      label: "Ticket Setup",
      permit: {
        permissions: [
          "create-ticketStatus",
          "readAll-ticketStatus",
          "create-ticketCategory",
          "readAll-ticketCategory",
        ],
        operator: "or",
      },
      key: "ticketSetup",
      icon: <TeamOutlined />,
      children: [
        {
          label: (
            <NavLink to="/admin/crm/ticket-status">
              <span>Ticket Status</span>
            </NavLink>
          ),
          key: "CemTicketStatus",
          icon: <UsergroupAddOutlined />,
        },

        {
          label: (
            <NavLink to="/admin/crm/Ticket-category">
              <span>Ticket Category</span>
            </NavLink>
          ),
          key: "CemTicketCategory",
          icon: <UsergroupAddOutlined />,
        },
      ],
    },
    {
      label: (
        <NavLink to="/admin/crm/quote-stage">
          <span>Quote Stage Setup</span>
        </NavLink>
      ),
      permit: {
        permissions: ["create-quoteStage", "readAll-quoteStage"],
        operator: "or",
      },
      key: "quoteStageSetup",
      icon: <TeamOutlined />,
    },
    {
      label: (
        <NavLink to="/admin/priority">
          <span>Priority</span>
        </NavLink>
      ),
      key: "Priority",
      icon: <UsergroupAddOutlined />,
    },
  ];
}
