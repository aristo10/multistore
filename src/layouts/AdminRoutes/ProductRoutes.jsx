import Loader from "@/components/Loader/Loader";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
const GetAllDimensionUnit = lazy(() =>
  import("@/components/DimensionUnit/GetAllDimensionUnit")
);
const GetAllWeightUnit = lazy(() =>
  import("@/components/WeightUnit/GetAllWeightUnit")
);
const PrintBarCode = lazy(() =>
  import("@/components/PrintBarCode/PrintBarCode")
);
const PermissionChecker = lazy(() =>
  import("@/components/PrivacyComponent/PermissionChecker")
);
const GetAllPrintPage = lazy(() =>
  import("@/components/PrintPageSettings/GetAllPrintPage")
);
const AddProduct = lazy(() => import("@/components/Product/AddProduct"));
const DetailsProduct = lazy(() =>
  import("@/components/Product/DetailsProduct")
);
const GetAllProduct = lazy(() => import("@/components/Product/GetAllProduct"));
const ProductReport = lazy(() => import("@/components/Product/ProductReport"));
const ImportFromCSV = lazy(() => import("@/components/Product/UploadMany"));
const UpdateProduct = lazy(() => import("@/components/Product/UpdateProduct"));
const ProductSortList = lazy(() =>
  import("@/components/ProductSortList/ProductSortList")
);
const StockTransfer = lazy(() =>
  import("@/components/StockTransfer/StockTransfer")
);
const AddStockTransfer = lazy(() =>
  import("@/components/StockTransfer/AddStockTransfer")
);
const DetailsStockTransfer = lazy(() =>
  import("@/components/StockTransfer/DetailsStockTransfer")
);
const GetAllDamageProduct = lazy(() =>
  import("@/components/DamageProduct/GetAllDamageProduct")
);

const ProductRoutes = [
  <Route
    path='product'
    exact
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-product"}>
          <GetAllProduct />
        </PermissionChecker>
      </Suspense>
    }
    key='product'
  />,
  <Route
    path='product/add'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"create-product"}>
          <AddProduct />
        </PermissionChecker>
      </Suspense>
    }
    key='product'
  />,
  <Route
    path='product-report'
    exact
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-product"}>
          <ProductReport />
        </PermissionChecker>
      </Suspense>
    }
    key='product-report'
  />,

  <Route
    path='product/:id'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readSingle-product"}>
          <DetailsProduct />
        </PermissionChecker>
      </Suspense>
    }
    key='product-details'
  />,

  <Route
    path='import-product'
    exact
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"create-product"}>
          <ImportFromCSV urlPath={"product"} title='Product' />
        </PermissionChecker>
      </Suspense>
    }
    key='import-product'
  />,

  <Route
    path='product/:id/update'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"update-product"}>
          <UpdateProduct />
        </PermissionChecker>
      </Suspense>
    }
    key='update-product'
  />,
  <Route
    path='product-sort-list'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-product"}>
          <ProductSortList />
        </PermissionChecker>
      </Suspense>
    }
    key='product-sort-list'
  />,
  <Route
    path='print-barcode/:id'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readSingle-product"}>
          <PrintBarCode />
        </PermissionChecker>
      </Suspense>
    }
    key='print-barcode'
  />,
  <Route
    path='print-page-setting'
    exact
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-pageSize"}>
          <GetAllPrintPage />
        </PermissionChecker>
      </Suspense>
    }
    key='print-page-setting'
  />,
  <Route
    path='weight-unit'
    exact
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-wightUnit"}>
          <GetAllWeightUnit />
        </PermissionChecker>
      </Suspense>
    }
    key='weightUnit'
  />,
  <Route
    path='dimension-unit'
    exact
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-dimensionUnit"}>
          <GetAllDimensionUnit />
        </PermissionChecker>
      </Suspense>
    }
    key='dimensionUnit'
  />,
  <Route
    path='stock-transfer'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-stockTransfer"}>
          <StockTransfer />
        </PermissionChecker>
      </Suspense>
    }
    key='stockTransfer'
  />,
  <Route
    path='stock-transfer/add'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"create-stockTransfer"}>
          <AddStockTransfer />
        </PermissionChecker>
      </Suspense>
    }
    key='stockTransfer'
  />,
  <Route
    path='stock-transfer/:id'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readSingle-stockTransfer"}>
          <DetailsStockTransfer />
        </PermissionChecker>
      </Suspense>
    }
    key='stockTransfer'
  />,
  <Route
    path='damage-product'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readSingle-stock"}>
          <GetAllDamageProduct />
        </PermissionChecker>
      </Suspense>
    }
    key='stockTransfer'
  />,
];
export default ProductRoutes;
