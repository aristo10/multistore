import AttachmentRoutes from "./AttachmentRoutes";
import CompanyRoutes from "./CompanyRoutes";
import ContactRoutes from "./ContactRoutes";
import NoteRoutes from "./NoteRoutes";
import OpportunityRoutes from "./OpportunityRoutes";
import QuoteRoutes from "./QuoteRoutes";
import TaskRoutes from "./TaskRoutes";
import TicketRoutes from "./TicketRoutes";
import { Route } from "react-router-dom";
import Dashboard from "@/components/CRM/Dashboard/Dashboard";

export default function useCrmRoutes() {
  return [
    ...ContactRoutes,
    ...CompanyRoutes,
    ...OpportunityRoutes,
    ...TaskRoutes,
    ...TicketRoutes,
    ...QuoteRoutes,
    ...NoteRoutes,
    ...AttachmentRoutes,
    <Route index key="crmDashboard" element={<Dashboard />} />,
  ];
}
