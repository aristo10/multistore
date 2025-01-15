import Loader from "@/components/Loader/Loader";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
const PermissionChecker = lazy(() =>
  import("@/components/PrivacyComponent/PermissionChecker")
);
const DetailProductSubCategory = lazy(() =>
  import("@/components/ProductSubcategory/DetailProductSubcategory")
);
const ProductSubCategory = lazy(() =>
  import("@/components/ProductSubcategory/ProductSubcategory")
);
const UpdateProductSubCategory = lazy(() =>
  import("@/components/ProductSubcategory/UpdateProductSubcategory")
);

const SubCategoryRoutes = [
  <Route
    path='product-subcategory'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-productSubCategory"}>
          <ProductSubCategory />
        </PermissionChecker>
      </Suspense>
    }
    key='product-subcategory'
  />,
  <Route
    path='product-subcategory/:id'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readSingle-productSubCategory"}>
          <DetailProductSubCategory />
        </PermissionChecker>
      </Suspense>
    }
    key='product-subcategory-details'
  />,
  <Route
    path='product-subcategory/:id/update'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"update-productSubCategory"}>
          <UpdateProductSubCategory />
        </PermissionChecker>
      </Suspense>
    }
    key='product-subcategory-update'
  />,
];

export default SubCategoryRoutes;
