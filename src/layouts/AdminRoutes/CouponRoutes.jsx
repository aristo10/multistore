import Loader from "@/components/Loader/Loader";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
const DetailCoupon = lazy(() => import("@/components/Coupon/DetailCoupon"));
const GetAllCoupon = lazy(() => import("@/components/Coupon/GetAllCoupon"));
const PermissionChecker = lazy(() =>
  import("@/components/PrivacyComponent/PermissionChecker")
);

const CouponRoutes = [
  <Route
    path='coupon'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-coupon"}>
          <GetAllCoupon />
        </PermissionChecker>
      </Suspense>
    }
    key='coupon'
  />,
  <Route
    path='coupon/:id'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readSingle-coupon"}>
          <DetailCoupon />
        </PermissionChecker>
      </Suspense>
    }
    key='coupon-details'
  />,
];
export default CouponRoutes;
