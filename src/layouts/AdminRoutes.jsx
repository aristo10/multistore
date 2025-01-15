import AccountRoutes from "./AdminRoutes/AccountRoutes";
import AdjustInventoryRoutes from "./AdminRoutes/AdjustInventoryRoutes";
import BrandRoutes from "./AdminRoutes/BrandRoutes";
import CategoryRoutes from "./AdminRoutes/CategoryRoutes";
import CommonRoutes from "./AdminRoutes/CommonRoutes";
import CouponRoutes from "./AdminRoutes/CouponRoutes";
import CourierMediumRoutes from "./AdminRoutes/CourierMediumRoutes";
import CustomerRoutes from "./AdminRoutes/CustomerRoutes";
import EmailRoutes from "./AdminRoutes/EmailRoutes";
import manufacturerRoutes from "./AdminRoutes/ManufacturerRoutes";
import OrderRoutes from "./AdminRoutes/OrderRoutes";
import PaymentRoutes from "./AdminRoutes/PaymentRoutes";
import ProductRoutes from "./AdminRoutes/ProductRoutes";
import PurchaseRoutes from "./AdminRoutes/PurchaseRoutes";
import QuotationRoutes from "./AdminRoutes/QuotationRoutes";
import useSaleRoutes from "./AdminRoutes/SaleRoutes";
import storeRoutes from "./AdminRoutes/StoreRoutes";
import SubCategoryRoutes from "./AdminRoutes/SubCategoryRoutes";
import SupplierRoutes from "./AdminRoutes/SupplierRoutes";
import TermsAndConditionRoutes from "./AdminRoutes/TermsAndConditionRoutes";
import TransactionRoutes from "./AdminRoutes/TransactionRoutes";
import UomRoutes from "./AdminRoutes/UomRoutes";
import VatTaxRoutes from "./AdminRoutes/VatTaxRoutes";
import useSettingRoutes from "./AdminRoutes/useSettingRoutes";
import useCrmRoutes from "./CrmRoutes/CrmRoutes";
import useHrmRoutes from "./HrmRoutes/HrmRoutes";
import {Route} from "react-router-dom";

export default function useAdminRoutes() {
  const SaleRoutes = useSaleRoutes();
  const SettingsRoutes = useSettingRoutes();
  const HrmRoutes = useHrmRoutes();
  const CrmRoutes = useCrmRoutes();
  const routes = [
    ...ProductRoutes,
    ...AdjustInventoryRoutes,
    ...SupplierRoutes,
    ...CategoryRoutes,
    ...SubCategoryRoutes,
    ...BrandRoutes,
    ...VatTaxRoutes,
    ...PurchaseRoutes,
    ...CustomerRoutes,
    ...SaleRoutes,
    ...TransactionRoutes,
    ...AccountRoutes,
    ...QuotationRoutes,
    ...TermsAndConditionRoutes,
    ...CouponRoutes,
    ...OrderRoutes,
    ...CourierMediumRoutes,
    ...PaymentRoutes,
    ...UomRoutes,
    ...CommonRoutes,
    ...manufacturerRoutes,
    ...storeRoutes,
    ...SettingsRoutes,
    ...EmailRoutes,
    <Route path="hrm" key="hrm">
      {HrmRoutes}
    </Route>,
    // <Route path="crm" key="crm">
    //   {CrmRoutes}
    // </Route>,
  ];

  return routes;
}
