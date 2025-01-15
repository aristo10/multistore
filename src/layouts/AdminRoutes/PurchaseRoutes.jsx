import Loader from "@/components/Loader/Loader";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
const PermissionChecker = lazy(() =>
  import("@/components/PrivacyComponent/PermissionChecker")
);
const GetAllPurchaseOrderList = lazy(() =>
  import("@/components/PurchaseOrderList/GetAllPurchaseOrderList")
);
const SinglePurchase = lazy(() =>
  import("@/components/PurchaseOrderList/SinglePurchase")
);
const PurchaseReturnList = lazy(() =>
  import("@/components/PurchaseReturnList/PurchaseReturnList")
);
const SinglePurchaseInvoice = lazy(() =>
  import("@/components/PurchaseReturnList/SinglePurchaseInvoice")
);
const PurchaseReport = lazy(() =>
  import("@/components/Purchase/PurchaseReport")
);
const AddPurchase = lazy(() => import("@/components/Purchase/AddPurchase"));
const AddReturnPurchase = lazy(() =>
  import("@/components/Purchase/AddReturnPurchase")
);
const DetailsPurchase = lazy(() =>
  import("@/components/Purchase/DetailsPurchase")
);
const GetAllPurchase = lazy(() =>
  import("@/components/Purchase/GetAllPurchase")
);

const PurchaseRoutes = [
  <Route
    path='purchase'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-purchaseInvoice"}>
          <GetAllPurchase />
        </PermissionChecker>
      </Suspense>
    }
    key='purchase'
  />,
  <Route
    path='purchase/add'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"create-purchaseInvoice"}>
          <AddPurchase />
        </PermissionChecker>
      </Suspense>
    }
    key='purchase-add'
  />,
  <Route
    path='purchase/:id'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readSingle-purchaseInvoice"}>
          <DetailsPurchase />
        </PermissionChecker>
      </Suspense>
    }
    key='purchase-details'
  />,
  <Route
    path='purchase-report'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-purchaseInvoice"}>
          <PurchaseReport />
        </PermissionChecker>
      </Suspense>
    }
    key='purchase-report'
  />,
  <Route
    path='purchase/return/:id'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"create-returnPurchaseInvoice"}>
          <AddReturnPurchase />
        </PermissionChecker>
      </Suspense>
    }
    key='purchase-return'
  />,
  <Route
    path='purchase-return-list'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-returnPurchaseInvoice"}>
          <PurchaseReturnList />
        </PermissionChecker>
      </Suspense>
    }
    key='purchase-return-list'
  />,
  <Route
    path='purchase-return-list/:id'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readSingle-returnPurchaseInvoice"}>
          <SinglePurchaseInvoice />
        </PermissionChecker>
      </Suspense>
    }
    key='purchase-return-list-details'
  />,
  <Route
    path='purchase-order'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-purchaseReorderInvoice"}>
          <GetAllPurchaseOrderList />
        </PermissionChecker>
      </Suspense>
    }
    key='purchase-order'
  />,
  <Route
    path='purchase-order/:id'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readSingle-purchaseReorderInvoice"}>
          <SinglePurchase />
        </PermissionChecker>
      </Suspense>
    }
    key='purchase-reorder-invoice-details'
  />,
];

export default PurchaseRoutes;
