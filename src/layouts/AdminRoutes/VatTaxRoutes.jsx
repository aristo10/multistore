import Loader from "@/components/Loader/Loader";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
const PermissionChecker = lazy(() =>
  import("@/components/PrivacyComponent/PermissionChecker")
);
const VatTax = lazy(() => import("@/components/VatTax/VatTax"));

const VatTaxRoutes = [
  <Route
    path='vat-tax'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-vat"}>
          <VatTax />
        </PermissionChecker>
      </Suspense>
    }
    key='vat-tax'
  />,
];

export default VatTaxRoutes;
