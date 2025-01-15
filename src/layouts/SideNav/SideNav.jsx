import useSettings from "@/Hooks/useSettings";
import Menu from "@/UI/Menu";
import {
  CodeSandboxOutlined,
  FileDoneOutlined,
  FileOutlined,
  FileSyncOutlined,
  HomeOutlined,
  MinusSquareOutlined,
  OrderedListOutlined,
  PlusSquareOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  UnorderedListOutlined,
  UserOutlined,
  WalletOutlined
} from "@ant-design/icons";
import { useState } from "react";
import { FaStore } from "react-icons/fa";
import { GoTasklist } from "react-icons/go";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdEmail, MdInventory, MdOutlinePermMedia } from "react-icons/md";
import { useSelector } from "react-redux";
import {Link, NavLink} from "react-router-dom";
import { cn } from "@/utils/functions";
import usePermissions from "../../utils/usePermissions";
import useSettingNav from "./SettingNav";
import SideNavLoader from "./SideNavLoader";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {RiUserSettingsLine} from "react-icons/ri";
import useHrmNav from "@/layouts/SideNav/HrmNav";


const SideNav = ({ collapsed, setCollapsed }) => {
  const { permissions } = usePermissions();
  const [active, setActive] = useState({
    isSetting: false,
    // isCrm: false,
    // isHrm: false,
  });
  const { loading } = useSelector((state) => state.auth);
  const { isSaleCommission, isPos } = useSettings([
    "isSaleCommission",
    "isPos",
  ]);

  const menu = [
    Array.isArray(permissions) &&
      permissions.length > 0 && {
        label: (
          <NavLink to="/admin/dashboard">
            <span>DASHBOARD</span>
          </NavLink>
        ),
        key: "dashboard",
        icon: <HomeOutlined />,
      },
    {
      label: "INVENTORY",
      key: "inventory",
      permit: {
        permissions: ["create-product", "readAll-product"],
        operator: "or",
      },
      icon: <CodeSandboxOutlined />,
      children: [
        {
          label: (
            <NavLink to="/admin/inventory">
              <span>Inventory</span>
            </NavLink>
          ),
          permit: {
            permissions: ["create-Inventory", "readAll-Inventory"],
            operator: "or",
          },
          key: "Inventory",
          icon: <MdInventory />,
        },
        {
          label: (
            <NavLink to="/admin/product">
              <span>Product</span>
            </NavLink>
          ),
          key: "products",
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/product-sort-list">
              <span>Shortage Products</span>
            </NavLink>
          ),
          key: "productSortList",
          icon: <OrderedListOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/damage-product">
              <span>Damage Products</span>
            </NavLink>
          ),
          key: "damage-product",
          icon: <OrderedListOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/stock-transfer">
              <span>Stock Transfer</span>
            </NavLink>
          ),
          key: "stock-transfer",
          icon: <OrderedListOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/manufacturer">
              <span>Manufacturer</span>
            </NavLink>
          ),
          key: "manufacturer",
          icon: <OrderedListOutlined />,
        },
      ],
    },

    {
      label: "PURCHASE",
      permit: {
        permissions: ["create-purchaseInvoice", "readAll-purchaseInvoice"],
        operator: "or",
      },
      key: "PURCHASE",
      icon: <PlusSquareOutlined />,
      children: [
        {
          label: (
            <NavLink to="/admin/purchase">
              <span>Purchase Invoice</span>
            </NavLink>
          ),
          key: "purchases",
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/supplier">
              <span>Suppliers</span>
            </NavLink>
          ),
          key: "suppliers",
          icon: <UserOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/purchase-return-list">
              <span>Purchase Return </span>
            </NavLink>
          ),
          key: "purchaseReturn",
          icon: <OrderedListOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/purchase-order">
              <span>Purchase Order </span>
            </NavLink>
          ),
          key: "purchaseOrder",
          icon: <OrderedListOutlined />,
        },
      ],
    },
    {
      label: "SALE",
      permit: {
        permissions: ["create-saleInvoice", "readAll-saleInvoice"],
        operator: "or",
      },
      key: "SALE",
      icon: <MinusSquareOutlined />,
      children: [
        {
          label: (
            <NavLink to="/admin/sale">
              <span>Sale Invoice</span>
            </NavLink>
          ),
          key: "sells",
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/customer">
              <span>Customers</span>
            </NavLink>
          ),
          key: "customers",
          icon: <UserOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/sale-return-list">
              <span>Sale Return </span>
            </NavLink>
          ),
          key: "saleReturn",
          icon: <OrderedListOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/sales-commission">
              <span>Sales Commission </span>
            </NavLink>
          ),
          key: "SalesCommission",
          icon: <OrderedListOutlined />,
          hidden: isSaleCommission === "false",
        },

        // {
        //   label: (
        //     <NavLink to="/admin/quotation">
        //       <span>Quotation</span>
        //     </NavLink>
        //   ),
        //   permit: {
        //     permissions: ["create-quote", "readAll-quote"],
        //     operator: "or",
        //   },
        //   key: "QUOTATION",
        //   icon: <MdRequestQuote />,
        // },
      ],
    },

    {
      label: "ACCOUNTS",
      permit: {
        permissions: ["create-account", "readAll-account"],
        operator: "or",
      },
      key: "accounts",
      icon: <WalletOutlined />,
      children: [
        {
          label: (
            <NavLink to="/admin/account/">
              <span>Account</span>
            </NavLink>
          ),
          key: "accountList",
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/transaction/">
              <span>Transaction</span>
            </NavLink>
          ),
          key: "transactionList",
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/account/trial-balance">
              <span>Trial Balance</span>
            </NavLink>
          ),
          key: "trialBalance",
          icon: <FileDoneOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/account/balance-sheet">
              <span>Balance Sheet</span>
            </NavLink>
          ),
          key: "balanceSheet",
          icon: <FileOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/account/income">
              <span>Income Statement</span>
            </NavLink>
          ),
          key: "incomeStatement",
          icon: <FileSyncOutlined />,
        },
      ],
    },
    {
      label: "REPORT",
      key: "report",
      icon: <IoDocumentTextOutline size={16} />,
      children: [
        {
          label: (
            <NavLink to="/admin/product-report">
              <span>Inventory Report</span>
            </NavLink>
          ),
          permit: {
            permissions: ["create-product", "readAll-product"],
            operator: "or",
          },
          key: "productReport",
          icon: <FileSyncOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/purchase-report">
              <span>Purchase Report</span>
            </NavLink>
          ),
          permit: {
            permissions: ["create-purchaseInvoice", "readAll-purchaseInvoice"],
            operator: "or",
          },
          key: "purchaseReport",
          icon: <FileSyncOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/sale-report">
              <span>Sale Report</span>
            </NavLink>
          ),
          permit: {
            permissions: ["create-saleInvoice", "readAll-saleInvoice"],
            operator: "or",
          },
          key: "saleReport",
          icon: <FileSyncOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/supplier-report">
              <span>Supplier Report</span>
            </NavLink>
          ),
          permit: {
            permissions: ["create-supplier", "readAll-supplier"],
            operator: "or",
          },
          key: "supplierReport",
          icon: <FileSyncOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/customer-report">
              <span>Customer Report</span>
            </NavLink>
          ),
          permit: {
            permissions: ["create-customer", "readAll-customer"],
            operator: "or",
          },
          key: "customerReport",
          icon: <FileSyncOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/adjust-report">
              <span>Adjust Report</span>
            </NavLink>
          ),
          permit: {
            permissions: ["create-adjust", "readAll-adjust"],
            operator: "or",
          },
          key: "paymentReport",
          icon: <FileSyncOutlined />,
        },
      ],
    },

    {
      label: (
        <NavLink to="/admin/pos?collapsed=true">
          <span>POS</span>
        </NavLink>
      ),
      permit: {
        permissions: ["create-saleInvoice", "readAll-saleInvoice"],
        operator: "or",
      },
      key: "pos",
      icon: <ShoppingCartOutlined />,
      hidden: isPos === "false",
    },
    {
      label: (
        <NavLink to="/admin/task">
          <span>Task</span>
        </NavLink>
      ),
      permit: {
        permissions: ["create-task", "readAll-task"],
        operator: "or",
      },
      key: "task global",
      icon: <GoTasklist />,
    },
    {
      label: (
        <NavLink to="/admin/media">
          <span>MEDIA</span>
        </NavLink>
      ),
      permit: {
        permissions: ["create-media", "readAll-media"],
        operator: "or",
      },
      key: "media",
      icon: <MdOutlinePermMedia />,
    },
    {
      label: (
        <NavLink to="/admin/email">
          <span>EMAIL</span>
        </NavLink>
      ),
      permit: {
        permissions: ["create-email", "readAll-email"],
        operator: "or",
      },
      key: "EMAIL",
      icon: <MdEmail />,
    },
    {
      label: (
        <NavLink to="/admin/store">
          <span>STORE</span>
        </NavLink>
      ),
      permit: {
        permissions: ["create-store", "readAll-store"],
        operator: "or",
      },
      key: "store",
      icon: <FaStore />,
    },
  ];

  const SettingMenu = useSettingNav();
  // const CrmMenu = useCrmNav();
   const HrmMenu = useHrmNav();
  return (
    <div className="overflow-y-auto no-scrollbar h-[calc(100vh-100px)] pb-4">
      {loading ? (
        <SideNavLoader />
      ) :

        (
        <div className="relative">
          <div
            className={cn(
              `absolute w-full  transition-all duration-300 ${
              // active.isCrm || 
                 active.isHrm || active.isSetting
                  ? "left-[280px]"
                  : "left-0"
              }`,
            )}
          >
            <Menu
              items={menu}
              setCollapsed={setCollapsed}
              permissions={permissions}
              collapsed={collapsed}
            />
            {Array.isArray(permissions) && permissions.length > 0 && (
              <>
                <Link
                  className={cn(
                    "px-4 flex items-center justify-between font-Popins  hover:bg-[rgb(71,74,120)] py-3 cursor-pointer",
                    {
                      "flex items-center justify-center px-0 text-lg":
                        collapsed,
                    },
                  )}
                  to={"/admin/hrm"}
                  onClick={() =>
                    setActive({isSetting: false, isHrm: true })
                  }
                >
                  <span className="flex items-center gap-1">
                    <RiUserSettingsLine /> {!collapsed && "HRM"}
                  </span>
                  {!collapsed && <IoIosArrowForward />}
                </Link>
                {/*<Link*/}
                {/*  className={cn(*/}
                {/*    "px-4 flex items-center justify-between font-Popins  hover:bg-[rgb(71,74,120)] py-3 cursor-pointer",*/}
                {/*    {*/}
                {/*      "flex items-center justify-center px-0 text-lg":*/}
                {/*        collapsed,*/}
                {/*    },*/}
                {/*  )}*/}
                {/*  onClick={() =>*/}
                {/*    setActive({ isCrm: true, isSetting: false, isHrm: false })*/}
                {/*  }*/}
                {/*  to={"/admin/crm"}*/}
                {/*>*/}
                {/*  <span className="flex items-center gap-1">*/}
                {/*    <FaUsersCog /> {!collapsed && "CRM"}*/}
                {/*  </span>*/}
                {/*  {!collapsed && <IoIosArrowForward />}*/}
                {/*</Link> */}
                <div
                  className={cn(
                    "px-4 flex items-center justify-between font-Popins  hover:bg-[rgb(71,74,120)] py-3 cursor-pointer",
                    {
                      "flex items-center justify-center px-0 text-lg":
                        collapsed,
                    },
                  )}
                  onClick={() =>
                    setActive({isSetting: true, isHrm: false })
                    // setActive({ isCrm: false, isSetting: true, isHrm: false })
                  }
                >
                  <span className="flex items-center gap-1">
                    <SettingOutlined /> {!collapsed && "Settings"}
                  </span>
                  {!collapsed && <IoIosArrowForward />}
                </div>
              </>
            )}
          </div>

          {/* crm menu */}
          {/* <div
            className={cn(
              `absolute w-full  transition-all duration-300 ${
                active.isCrm ? "left-0" : "-left-[280px]"
              }`,
            )}
          >
            <div
              className={cn(
                "px-4 flex items-center font-medium gap-1 font-Popins bg-[rgb(71,74,95)] hover:bg-[rgb(71,74,120)] py-3 cursor-pointer",
                {
                  "flex items-center justify-center text-lg": collapsed,
                },
              )}
              onClick={() =>
                setActive({ isCrm: false, isSetting: false, isHrm: false })
              }
            >
              <IoIosArrowBack /> {!collapsed && "Back to menu"}
            </div>
            <hr className=" border-gray-500" />
            <Menu
              items={CrmMenu}
              setCollapsed={setCollapsed}
              permissions={permissions}
              collapsed={collapsed}
            />
          </div> */}
          {/* HRM menu */}
          <div
            className={cn(
              `absolute w-full  transition-all duration-300 ${
                active.isHrm ? "left-0" : "-left-[280px]"
              }`,
            )}
          >
            <div
              className={cn(
                "px-4 flex items-center font-medium gap-1 font-Popins bg-[rgb(71,74,95)] hover:bg-[rgb(71,74,120)] py-3 cursor-pointer",
                {
                  "flex items-center justify-center text-lg": collapsed,
                },true
              )}
              onClick={() =>
                setActive({isSetting: false, isHrm: false })
              }
            >
              <IoIosArrowBack /> {!collapsed && "Back to menu"}
            </div>
            <hr className=" border-gray-500" />
            <Menu
              items={HrmMenu}
              setCollapsed={setCollapsed}
              permissions={permissions}
              collapsed={collapsed}
            />
          </div>
          {/* setting menu */}
           <div
            className={cn(
              `absolute w-full  transition-all duration-300 ${
                active.isSetting ? "left-0" : "-left-[280px]"
              }`,
            )}
          >
            <div
              className={cn(
                "px-4 flex items-center font-medium gap-1 font-Popins bg-[rgb(71,74,95)] hover:bg-[rgb(71,74,120)] py-3 cursor-pointer",
                {
                  "flex items-center justify-center text-lg": collapsed,
                },
              )}
              onClick={() =>
                setActive({isSetting: false, isHrm: false })
                // setActive({ isCrm: false, isSetting: false, isHrm: false })
              }
            >
              <IoIosArrowBack /> {!collapsed && "Back to menu"}
            </div>
            <hr className=" border-gray-500" />
            <Menu
              items={SettingMenu}
              setCollapsed={setCollapsed}
              permissions={permissions}
              collapsed={collapsed}
            />
           </div>
        </div>
        )
      }
    </div>
  );
};

export default SideNav;
