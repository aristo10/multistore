import Loader from "@/components/Loader/Loader";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
const PermissionChecker = lazy(() =>
  import("@/components/PrivacyComponent/PermissionChecker")
);
const DetailProductBrand = lazy(() =>
  import("@/components/ProductBrand/DetailProductBrand")
);
const ProductBrand = lazy(() =>
  import("@/components/ProductBrand/ProductBrand")
);
const UpdateProductBrand = lazy(() =>
  import("@/components/ProductBrand/UpdateProductBrand")
);

const BrandRoutes = [
  <Route
    path='product-brand'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-productBrand"}>
          <ProductBrand />
        </PermissionChecker>
      </Suspense>
    }
    key='product-brand'
  />,
  <Route
    path='product-brand/:id'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readSingle-productBrand"}>
          <DetailProductBrand />
        </PermissionChecker>
      </Suspense>
    }
    key='product-brand-details'
  />,
  <Route
    path='product-brand/:id/update'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"update-productBrand"}>
          <UpdateProductBrand />
        </PermissionChecker>
      </Suspense>
    }
    key='product-brand-update'
  />,
];

export default BrandRoutes;
