import { FaUserPlus } from "react-icons/fa";
import { MdEventAvailable, MdOutlineFactCheck, MdOutlineDashboard } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { RiMoneyDollarBoxLine, RiTeamFill } from "react-icons/ri";


const menuItems = [
  {
    icon: FaUserPlus,
    alt: "Register New Employee",
    title: "Register New Employee",
    route: "/dashboard/Employee-Registration",
    children: [],
  },
  {
    icon: RiTeamFill,
    alt: "View All Employees",
    title: "View All Employees",
    route: "/dashboard/employees",
    children: [],
  },
  {
    icon: MdEventAvailable,
    alt: "Take a Leave",
    title: "Take a Leave",
    route: "/dashboard/leave",
    children: [],
  },
  {
    icon: MdOutlineFactCheck,
    alt: "View Employee Leaves",
    title: "View Employee Leaves",
    route: "/dashboard/employeesLeaves",
    children: [],
  },
  {
    icon: IoMdTime,
    alt: "Attendance",
    title: "Attendance",
    route: "/dashboard/attendance",
    children: [],
  },
  {
    icon: RiMoneyDollarBoxLine,
    alt: "Employee Payroll",
    title: "Employee Payroll",
    route: "/dashboard/employee-payroll",
    children: [],
  },
  {
    icon: MdOutlineDashboard,
    alt: "Payroll Dashboard",
    title: "Payroll Dashboard",
    route: "/dashboard/payroll",
    children: [],
  },
];

export default menuItems;
