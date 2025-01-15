import Loader from "@/components/Loader/Loader";
import CustomerLogout from "@/components/User/CustomerLogout";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
const PermissionChecker = lazy(() =>
  import("@/components/PrivacyComponent/PermissionChecker")
);
const CustomerReport = lazy(() =>
  import("@/components/Customer/CustomerReport")
);
const DetailCustomer = lazy(() =>
  import("@/components/Customer/DetailCustomer")
);
const GetAllCustomer = lazy(() =>
  import("@/components/Customer/GetAllCustomer")
);
const UpdateCustomer = lazy(() =>
  import("@/components/Customer/UpdateCustomer")
);
const CustomerLogin = lazy(() => import("@/components/User/CustomerLogin"));
const CustomerRegistration = lazy(() =>
  import("@/components/User/CustomerRegister")
);

const CustomerRoutes = [
  <Route
    path='customer'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-customer"}>
          <GetAllCustomer />
        </PermissionChecker>
      </Suspense>
    }
    key='customer'
  />,
  <Route
    path='customer-report'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-customer"}>
          <CustomerReport />
        </PermissionChecker>
      </Suspense>
    }
    key='customer-report'
  />,
  <Route
    path='customer/:id'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readSingle-customer"}>
          <DetailCustomer />
        </PermissionChecker>
      </Suspense>
    }
    key='customer-details'
  />,
  <Route
    path='customer/:id/update'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"update-customer"}>
          <UpdateCustomer />
        </PermissionChecker>
      </Suspense>
    }
    key='customer-update'
  />,
  <Route
    path='customer/register'
    element={
      <Suspense fallback={<Loader />}>
        <CustomerRegistration />
      </Suspense>
    }
    key='customer-register'
  />,
  <Route
    path='customer/login'
    element={
      <Suspense fallback={<Loader />}>
        <CustomerLogin />
      </Suspense>
    }
    key='customer-login'
  />,
  <Route
    path='customer/logout'
    element={<CustomerLogout />}
    key='customer-logout'
  />,
];

export default CustomerRoutes;
