/* eslint-disable react-refresh/only-export-components */
import Loader from "@/components/Loader/Loader";
import PermissionChecker from "@/components/PrivacyComponent/PermissionChecker";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
const GetAllManufacturer = lazy(() =>
  import("@/components/Manufacturer/GetAllManufacturer")
);

const manufacturerRoutes = [
  <Route
    path='manufacturer'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-manufacturer"}>
          <GetAllManufacturer />
        </PermissionChecker>
      </Suspense>
    }
    key='employment-status'
  />,
];

export default manufacturerRoutes;
