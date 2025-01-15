import Loader from "@/components/Loader/Loader";
import SalesCommission from "@/components/Sale/SalesCommission";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";

export default function useSaleRoutes() {
  const PermissionChecker = lazy(() =>
    import("@/components/PrivacyComponent/PermissionChecker")
  );
  const SaleReturnList = lazy(() =>
    import("@/components/SaleReturnList/SaleReturnList")
  );
  const SingleSaleInvoice = lazy(() =>
    import("@/components/SaleReturnList/SingleSaleInvoice")
  );

  const AddSale = lazy(() => import("@/components/Sale/AddSale"));
  const SaleReport = lazy(() => import("@/components/Sale/SaleReport"));
  const AddReturnSale = lazy(() => import("@/components/Sale/AddReturnSale"));
  const DetailSale = lazy(() => import("@/components/Sale/DetailSale"));
  const GetAllSale = lazy(() => import("@/components/Sale/GetAllSale"));

  const routes = [
    <Route
      path='sale'
      element={
        <Suspense fallback={<Loader />}>
          <PermissionChecker permission={"readAll-saleInvoice"}>
            <GetAllSale />
          </PermissionChecker>
        </Suspense>
      }
      key='sale'
    />,
    <Route
      path='sale/add'
      element={
        <Suspense fallback={<Loader />}>
          <PermissionChecker permission={"create-saleInvoice"}>
            <AddSale />
          </PermissionChecker>
        </Suspense>
      }
      key='sale-add'
    />,
    <Route
      path='sale/:id'
      element={
        <Suspense fallback={<Loader />}>
          <PermissionChecker permission={"readSingle-saleInvoice"}>
            <DetailSale />
          </PermissionChecker>
        </Suspense>
      }
      key='sale-details'
    />,
    <Route
      path='sale-report'
      element={
        <Suspense fallback={<Loader />}>
          <PermissionChecker permission={"readAll-saleInvoice"}>
            <SaleReport />
          </PermissionChecker>
        </Suspense>
      }
      key='sale-report'
    />,
    <Route
      path='sales-commission'
      element={
        <Suspense fallback={<Loader />}>
          <PermissionChecker permission={"readAll-saleCommission"}>
            <SalesCommission />
          </PermissionChecker>
        </Suspense>
      }
      key='sale-report'
    />,
    <Route
      path='sale/return/:id'
      element={
        <Suspense fallback={<Loader />}>
          <PermissionChecker permission={"create-returnSaleInvoice"}>
            <AddReturnSale />
          </PermissionChecker>
        </Suspense>
      }
      key='sale-return'
    />,
    <Route
      path='sale-return-list'
      element={
        <Suspense fallback={<Loader />}>
          <PermissionChecker permission={"readAll-returnSaleInvoice"}>
            <SaleReturnList />
          </PermissionChecker>
        </Suspense>
      }
      key='sale-return-list'
    />,
    <Route
      path='sale-return-list/:id'
      element={
        <Suspense fallback={<Loader />}>
          <PermissionChecker permission={"readSingle-returnSaleInvoice"}>
            <SingleSaleInvoice />
          </PermissionChecker>
        </Suspense>
      }
      key='sale-return-details'
    />,
  ];

  return routes;
}
