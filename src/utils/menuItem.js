import { AiFillHome } from "react-icons/ai";
import { MdAttachMoney } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";

export const menuItems = [
    {
        id: 1,
        title: "Dashboard",
        icon: AiFillHome,
        link: '/dashboard'
    },
    {
        id: 2,
        title: "View Transactions",
        icon: MdAttachMoney,
        link: '/transactions'
    },
    {
        id: 3,
        title: "Income",
        icon: FaMoneyBillWave,
        link: '/income'
    },
    {
        id: 4,
        title: "Expense",
        icon: MdAttachMoney,
        link: '/expense'
    },
];
