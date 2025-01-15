// import GetAllCompanyType from "@/components/CRM/Setup/CompanySetup/CompanyType/GetAllCompanyType";
import Loader from "@/components/Loader/Loader";
import PermissionChecker from "@/components/PrivacyComponent/PermissionChecker";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
const GetAllCompany = lazy(() =>
  import("@/components/CRM/Company/GetAllCompany")
);
const GetAllCompanyType = lazy(() =>
  import("@/components/CRM/Setup/CompanySetup/CompanyType/GetAllCompanyType")
);
const GetAllIndustry = lazy(() =>
  import("@/components/CRM/Setup/CompanySetup/Industry/GetAllIndustry")
);

const CompanyRoutes = [
  <Route
    path='company'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-company"}>
          <GetAllCompany />
        </PermissionChecker>
      </Suspense>
    }
    key='company'
  />,
  <Route
    path='company-type'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-companyType"}>
          <GetAllCompanyType />
        </PermissionChecker>
      </Suspense>
    }
    key='company'
  />,
  <Route
    path='industry'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-industry"}>
          <GetAllIndustry />
        </PermissionChecker>
      </Suspense>
    }
    key='industry'
  />,
];

export default CompanyRoutes;
