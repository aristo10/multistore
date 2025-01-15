import Loader from "@/components/Loader/Loader";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
const PermissionChecker = lazy(() =>
  import("@/components/PrivacyComponent/PermissionChecker")
);
const DetailsQuote = lazy(() => import("@/components/Quote/DetailsQuote"));
const GetAllQuote = lazy(() => import("@/components/Quote/GetAllQuote"));

const QuotationRoutes = [
  <Route
    path='quotation'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-quote"}>
          <GetAllQuote />
        </PermissionChecker>
      </Suspense>
    }
    key='quotation'
  />,
  <Route
    path='quotation/:id'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readSingle-quote"}>
          <DetailsQuote />
        </PermissionChecker>
      </Suspense>
    }
    key='quotation-details'
  />,
];

export default QuotationRoutes;
