import Loader from "@/components/Loader/Loader";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
const PermissionChecker = lazy(() =>
  import("@/components/PrivacyComponent/PermissionChecker")
);
const GetAllUoM = lazy(() => import("@/components/UoM/GetAllUoM"));
const DetailsProductAttribute = lazy(() =>
  import("@/components/eComErp/ProductAttribute/DetailsProductAttribute")
);
const GetAllProductAttribute = lazy(() =>
  import("@/components/eComErp/ProductAttribute/GetAllProductAttribute")
);

const UomRoutes = [
  <Route
    path='uom'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-uom"}>
          <GetAllUoM />
        </PermissionChecker>
      </Suspense>
    }
    key='uom'
  />,
  <Route
    path='product-attribute'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-productAttribute"}>
          <GetAllProductAttribute />
        </PermissionChecker>
      </Suspense>
    }
    key='product-attribute'
  />,
  <Route
    path='product-attribute/:id'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readSingle-productAttribute"}>
          <DetailsProductAttribute />
        </PermissionChecker>
      </Suspense>
    }
    key='product-attribute-details'
  />,
];

export default UomRoutes;
