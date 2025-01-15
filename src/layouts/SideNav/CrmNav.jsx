import { BiBuildingHouse } from "react-icons/bi";
import { GoTasklist } from "react-icons/go";
import { HiOutlineLightBulb } from "react-icons/hi";
import { IoTicketOutline } from "react-icons/io5";
import { LuLink } from "react-icons/lu";
import { RiBillLine, RiContactsLine } from "react-icons/ri";
import { TiContacts } from "react-icons/ti";
import { NavLink } from "react-router-dom";
export default function useCrmNav() {
  return [
    {
      label: (
        <NavLink to='/admin/crm/contact'>
          <span>CONTACT</span>
        </NavLink>
      ),
      permit: {
        permissions: ["create-contact", "readAll-contact"],
        operator: "or",
      },
      key: "CONTACT",
      icon: <RiContactsLine />,
    },
    {
      label: (
        <NavLink to='/admin/crm/company'>
          <span>COMPANY</span>
        </NavLink>
      ),
      permit: {
        permissions: ["create-company", "readAll-company"],
        operator: "or",
      },
      key: "COMPANY",
      icon: <BiBuildingHouse />,
    },

    {
      label: (
        <NavLink to='/admin/crm/opportunity'>
          <span>OPPORTUNITY</span>
        </NavLink>
      ),
      permit: {
        permissions: ["create-opportunity", "readAll-opportunity"],
        operator: "or",
      },
      key: "OPPORTUNITY",
      icon: <HiOutlineLightBulb />,
    },

    {
      label: (
        <NavLink to='/admin/crm/quote'>
          <span>QUOTE</span>
        </NavLink>
      ),
      permit: {
        permissions: ["create-quote", "readAll-quote"],
        operator: "or",
      },
      key: "QUOTE",
      icon: <RiBillLine />,
    },
    {
      label: (
        <NavLink to='/admin/crm/task'>
          <span>TASK</span>
        </NavLink>
      ),
      permit: {
        permissions: ["create-task", "readAll-task"],
        operator: "or",
      },
      key: "TASK",
      icon: <GoTasklist />,
    },

    {
      label: (
        <NavLink to='/admin/crm/note'>
          <span>NOTE</span>
        </NavLink>
      ),
      permit: {
        permissions: ["create-note", "readAll-note"],
        operator: "or",
      },
      key: "NOTE",
      icon: <TiContacts />,
    },
    {
      label: (
        <NavLink to='/admin/crm/attachment'>
          <span>ATTACHMENT</span>
        </NavLink>
      ),
      permit: {
        permissions: ["create-attachment", "readAll-attachment"],
        operator: "or",
      },
      key: "ATTACHMENT",
      icon: <LuLink />,
    },
    {
      label: (
        <NavLink to='/admin/crm/ticket'>
          <span>TICKET</span>
        </NavLink>
      ),
      permit: {
        permissions: ["create-ticket", "readAll-ticket"],
        operator: "or",
      },
      key: "TICKET",
      icon: <IoTicketOutline />,
    },
  ];
}
