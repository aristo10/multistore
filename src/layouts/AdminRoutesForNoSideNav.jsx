import useSettings from "@/Hooks/useSettings";
import Loader from "@/components/Loader/Loader";
import PermissionChecker from "@/components/PrivacyComponent/PermissionChecker";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";

export default function useAdminRoutesForNoSideNav() {
  const DetailsCompany = lazy(() =>
    import("@/components/CRM/Company/DetailsCompany")
  );
  const DetailsContact = lazy(() =>
    import("@/components/CRM/Contact/DetailsContact")
  );
  const DetailsOpportunity = lazy(() =>
    import("@/components/CRM/Opportunity/DetailsOpportunity")
  );
  const Pos = lazy(() => import("@/components/Pos/Pos"));
  const isPos = useSettings("isPos");
  const routes = [
    <Route
      path='crm/company/:id'
      element={
        <Suspense fallback={<Loader />}>
          <PermissionChecker permission={"readSingle-company"}>
            <DetailsCompany />
          </PermissionChecker>
        </Suspense>
      }
      key='companyDetails'
    />,
    <Route
      path='crm/contact/:id'
      element={
        <Suspense fallback={<Loader />}>
          <PermissionChecker permission={"readSingle-contact"}>
            <DetailsContact />
          </PermissionChecker>
        </Suspense>
      }
      key='contactDetails'
    />,
    <Route
      path='crm/opportunity/:id'
      element={
        <Suspense fallback={<Loader />}>
          <PermissionChecker permission={"readSingle-opportunity"}>
            <DetailsOpportunity />
          </PermissionChecker>
        </Suspense>
      }
      key='opportunity-Details'
    />,
    isPos === "true" ? (
      <Route
        path='pos'
        element={
          <Suspense fallback={<Loader />}>
            <PermissionChecker permission={"readAll-saleInvoice"}>
              <Pos />
            </PermissionChecker>
          </Suspense>
        }
        key='pos'
      />
    ) : null,
  ];

  return routes;
}
