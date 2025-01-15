import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
import Loader from "@/components/Loader/Loader";
import PermissionChecker from "@/components/PrivacyComponent/PermissionChecker";
const GetAllAnnouncement = lazy(() => import("@/components/HRM/Announcement/GetAllAnnouncement"));


const AnnouncementRoutes = [
  <Route
    path='announcement'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-announcement"}>
          <GetAllAnnouncement/>
        </PermissionChecker>
      </Suspense>
    }
    key='announcement'
  />,
];

export default AnnouncementRoutes;
