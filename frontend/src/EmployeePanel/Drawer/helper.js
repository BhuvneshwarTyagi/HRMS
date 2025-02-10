import { FaUserPlus, FaUsers, FaUserGraduate, FaMoneyBillWave, FaWallet } from "react-icons/fa";
import { MdAssignmentLate, MdTrendingUp, MdPayments, MdHistory } from "react-icons/md";
import { IoIosListBox } from "react-icons/io";
import { IoSchool } from "react-icons/io5";
import { RiMoneyDollarCircleLine, RiMoneyDollarCircleFill } from "react-icons/ri";
import { GiReceiveMoney, GiTakeMyMoney } from "react-icons/gi";

const menuItems = [
  {
    icon: FaUserPlus,
    alt: "Student registration icon",
    title: "Register New Employee",
    route: "/dashboard/Employee-Registration",
    children: [],
  },
  {
    icon: FaUserGraduate,
    alt: "Agent registration icon",
    title: "Take a leave",
    route: "/dashboard/leave",
    children: [],
  },
  {
    icon: FaUsers,
    alt: "Agent list icon",
    title: "View All Employees",
    route: "/dashboard/employees",
    children: [],
  },
  {
    icon: FaUsers,
    alt: "Agent list icon",
    title: "View Employees Leaves",
    route: "/dashboard/employeesLeaves",
    children: [],
  },

];

export default menuItems;