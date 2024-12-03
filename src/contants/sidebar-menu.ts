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
      // {
      //   title: "Wallet Transaction",
      //   url: APP_LINKS.COMING_SOON,
      //   icon: Home,
      // },
      // {
      //   title: "Virtual Accounts",
      //   url: APP_LINKS.COMING_SOON,
      //   icon: Home,
      // },
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
        menus: [
          {
            title: "Overview",
            url: APP_LINKS.COMING_SOON,
            icon: Home,
          },
          {
            title: "Add Community",
            url: APP_LINKS.COMING_SOON,
            icon: Home,
          },
          {
            title: "Edit Community",
            url: APP_LINKS.COMING_SOON,
            icon: Home,
          },
          {
            title: "Property Units",
            url: APP_LINKS.COMING_SOON,
            icon: Home,
          },
          {
            title: "Transfer Ownership",
            url: APP_LINKS.COMING_SOON,
            icon: Home,
          },
          {
            title: "Restrictions",
            url: APP_LINKS.COMING_SOON,
            icon: Home,
          },
          {
            title: "Announcements",
            url: APP_LINKS.COMING_SOON,
            icon: Home,
          },
        ],
      },
      {
        title: "Meter Management",
        url: APP_LINKS.COMING_SOON,
        icon: Home,
        menus: [
          {
            title: "Meter Store",
            url: APP_LINKS.COMING_SOON,
            icon: Home,
          },
          {
            title: "Add Meters",
            url: APP_LINKS.COMING_SOON,
            icon: Home,
          },
          {
            title: "Tamper",
            url: APP_LINKS.COMING_SOON,
            icon: Home,
          },
          {
            title: "Bypass Vending",
            url: APP_LINKS.COMING_SOON,
            icon: Home,
          },
          {
            title: "Sensors",
            url: APP_LINKS.COMING_SOON,
            icon: Home,
          },
          {
            title: "Postpaid Bills",
            url: APP_LINKS.COMING_SOON,
            icon: Home,
          },
          {
            title: "Bulk Upload",
            url: APP_LINKS.COMING_SOON,
            icon: Home,
          },
          {
            title: "Get Reports",
            url: APP_LINKS.COMING_SOON,
            icon: Home,
          },
        ],
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
  {
    title: "Reports",
    url: APP_LINKS.COMING_SOON,
    icon: Home,
  },
  {
    title: "Settings",
    url: APP_LINKS.COMING_SOON,
    icon: Home,
  },
  {
    title: "Developer",
    url: APP_LINKS.COMING_SOON,
    icon: Home,
  },
];
