import {
  // ArrowRightLeft,
  // BookOpenCheck,
  // BookText,
  // ChartArea,
  CircleArrowOutUpRight,
  // CircleHelp,
  History,
  Home,
  // ScrollText,
  // Settings,
  // Users,
  // UsersRound,
} from "lucide-react";
import { APP_LINKS } from "./app-links";

export const SIDEBAR_MENU = [
  {
    label: "",
    menus: [
      {
        title: "Home",
        url: APP_LINKS.DASHBOARD_OVERVIEW,
        icon: Home,
      },
    ],
  },
  {
    label: "Finance",
    menus: [
      {
        title: "Transactions",
        url: APP_LINKS.DASHBOARD_TRANSACTIONS,
        icon: History,
      },
      {
        title: "Payout",
        url: APP_LINKS.DASHBOARD_PAYOUT,
        icon: CircleArrowOutUpRight,
      },
      // {
      //   title: "Expenses",
      //   url: "#",
      //   icon: Home,
      // },
      // {
      //   title: "Wallet Transaction",
      //   url: "#",
      //   icon: Home,
      // },
      // {
      //   title: "Virtual Accounts",
      //   url: "#",
      //   icon: Home,
      // },
    ],
  },
  // {
  //   label: "Management",
  //   menus: [
  //     {
  //       title: "Customers",
  //       url: APP_LINKS.DASHBOARD_CUSTOMERS,
  //       icon: UsersRound,
  //     },
  //     {
  //       title: "Community Management",
  //       url: "#",
  //       icon: Home,
  //     },
  //     {
  //       title: "Meter Management",
  //       url: "#",
  //       icon: Home,
  //     },
  //     {
  //       title: "Staff",
  //       url: "#",
  //       icon: Home,
  //     },
  //   ],
  // },
  // {
  //   label: "Security",
  //   menus: [
  //     {
  //       title: "Gatepass",
  //       url: "#",
  //       icon: Home,
  //     },
  //     {
  //       title: "Emergency Alerts",
  //       url: "#",
  //       icon: Home,
  //     },
  //   ],
  // },
  // {
  //   label: "Activities",
  //   menus: [
  //     {
  //       title: "Forum",
  //       url: "",
  //       icon: Home,
  //     },
  //     {
  //       title: "Public Facilities",
  //       url: "",
  //       icon: Home,
  //     },
  //   ],
  // },
];

export const FOOTER_MENU = [
  // {
  //   title: "Reports",
  //   url: "",
  //   icon: Home,
  // },
  // {
  //   title: "Settings",
  //   url: "",
  //   icon: Home,
  // },
  // {
  //   title: "Developer",
  //   url: "",
  //   icon: Home,
  // },
];
