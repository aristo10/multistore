import Loader from "@/components/Loader/Loader";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
const PermissionChecker = lazy(() =>
  import("@/components/PrivacyComponent/PermissionChecker")
);
const DetailProductCategory = lazy(() =>
  import("@/components/ProductCategory/DetailProductCategory")
);
const ProductCategory = lazy(() =>
  import("@/components/ProductCategory/ProductCategory")
);
const UpdateProductCategory = lazy(() =>
  import("@/components/ProductCategory/UpdateProductCategory")
);

const CategoryRoutes = [
  <Route
    path='product-category'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-productCategory"}>
          <ProductCategory />
        </PermissionChecker>
      </Suspense>
    }
    key='product-category'
  />,
  <Route
    path='product-category/:id'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readSingle-productCategory"}>
          <DetailProductCategory />
        </PermissionChecker>
      </Suspense>
    }
    key='product-category-details'
  />,
  <Route
    path='product-category/:id/update'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"update-productCategory"}>
          <UpdateProductCategory />
        </PermissionChecker>
      </Suspense>
    }
    key='product-category-update'
  />,
];
export default CategoryRoutes;
