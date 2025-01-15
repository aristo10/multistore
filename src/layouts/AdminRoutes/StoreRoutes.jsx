/* eslint-disable react-refresh/only-export-components */
import Loader from "@/components/Loader/Loader";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
const PermissionChecker = lazy(() =>
  import("@/components/PrivacyComponent/PermissionChecker")
);
const GetAllStore = lazy(() => import("@/components/Store/GetAllStore"));

const storeRoutes = [
  <Route
    path='store'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-store"}>
          <GetAllStore />
        </PermissionChecker>
      </Suspense>
    }
    key='store'
  />,
];

export default storeRoutes;
