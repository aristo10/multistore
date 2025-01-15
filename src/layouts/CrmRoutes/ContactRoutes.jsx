import Loader from "@/components/Loader/Loader";
import PermissionChecker from "@/components/PrivacyComponent/PermissionChecker";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
const GetAllContact = lazy(() =>
  import("@/components/CRM/Contact/GetAllContact")
);
const GetAllContactSource = lazy(() =>
  import(
    "@/components/CRM/Setup/ContactSetup/ContactSource/GetAllContactSource"
  )
);
const GetAllContactStage = lazy(() =>
  import("@/components/CRM/Setup/ContactSetup/ContactStage/GetAllContactStage")
);

const ContactRoutes = [
  <Route
    path='contact'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-contact"}>
          <GetAllContact />
        </PermissionChecker>
      </Suspense>
    }
    key='contact'
  />,
 
  <Route
    path='contact-source'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-contactSource"}>
          <GetAllContactSource />
        </PermissionChecker>
      </Suspense>
    }
    key='contact-source'
  />,
  <Route
    path='contact-stage'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-contactStage"}>
          <GetAllContactStage />
        </PermissionChecker>
      </Suspense>
    }
    key='contact-stage'
  />,
];

export default ContactRoutes;
