import Loader from "@/components/Loader/Loader";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
const PermissionChecker = lazy(() =>
  import("@/components/PrivacyComponent/PermissionChecker")
);
const GetAllAdjustInventory = lazy(() =>
  import("@/components/AdjustInventory/GetAllAdjustInventory")
);
const GetDetailsAdjustInventory = lazy(() =>
  import("@/components/AdjustInventory/GetDetailsAdjustInventory")
);
const AddAdjustInventory = lazy(() =>
  import("@/components/AdjustInventory/AddAdjustInventory")
);
const AdJustReport = lazy(() =>
  import("@/components/AdjustInventory/AdJustReport")
);

const AdjustInventoryRoutes = [
  <Route
    path='adjust-inventory'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-adjust"}>
          <GetAllAdjustInventory />
        </PermissionChecker>
      </Suspense>
    }
    key='adjust-inventory'
  />,
  <Route
    path='adjust-inventory/add'
    exact
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"create-adjust"}>
          <AddAdjustInventory />
        </PermissionChecker>
      </Suspense>
    }
    key='add-adjust-inventory'
  />,
  <Route
    path='adjust-inventory/:id'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readSingle-adjust"}>
          <GetDetailsAdjustInventory />
        </PermissionChecker>{" "}
      </Suspense>
    }
    key={"single-adjustInventory"}
  />,
  <Route
    path='adjust-report'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-adjust"}>
          <AdJustReport />
        </PermissionChecker>{" "}
      </Suspense>
    }
    key={"single-adjustInventory"}
  />,
];

export default AdjustInventoryRoutes;
