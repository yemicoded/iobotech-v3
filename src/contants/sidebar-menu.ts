import {
  // ArrowRightLeft,
  // BookOpenCheck,
  // BookText,
  // ChartArea,
  CircleArrowOutUpRight,
  // CircleHelp,
  History,
  Home,
  UsersRound,
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
      {
        title: "Expenses",
        url: APP_LINKS.COMING_SOON,
        icon: Home,
      },
      {
        title: "Wallet Transaction",
        url: APP_LINKS.COMING_SOON,
        icon: Home,
      },
      {
        title: "Virtual Accounts",
        url: APP_LINKS.COMING_SOON,
        icon: Home,
      },
    ],
  },
  {
    label: "Management",
    menus: [
      {
        title: "Customers",
        url: APP_LINKS.COMING_SOON,
        icon: UsersRound,
      },
      {
        title: "Community Management",
        url: APP_LINKS.COMING_SOON,
        icon: Home,
      },
      {
        title: "Meter Management",
        url: APP_LINKS.COMING_SOON,
        icon: Home,
      },
      {
        title: "Staff",
        url: APP_LINKS.COMING_SOON,
        icon: Home,
      },
    ],
  },
  {
    label: "Security",
    menus: [
      {
        title: "Gatepass",
        url: APP_LINKS.COMING_SOON,
        icon: Home,
      },
      {
        title: "Emergency Alerts",
        url: APP_LINKS.COMING_SOON,
        icon: Home,
      },
    ],
  },
  {
    label: "Activities",
    menus: [
      {
        title: "Forum",
        url: APP_LINKS.COMING_SOON,
        icon: Home,
      },
      {
        title: "Public Facilities",
        url: APP_LINKS.COMING_SOON,
        icon: Home,
      },
    ],
  },
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
