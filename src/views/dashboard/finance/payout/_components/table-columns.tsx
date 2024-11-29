import { Text } from "@/components/shared/text";
import { View } from "@/components/shared/view";
import { Button } from "@/components/ui/button";
import { APP_LINKS } from "@/contants/app-links";
import { convertAmount } from "@/lib/util/convert-amount";
import { cn } from "@/lib/utils";
import { TGetPayout } from "@/types/payout";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { FileSpreadsheet } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<TGetPayout>[] = [
  {
    accessorKey: "service",
    header: () => <div className="px-4">Service</div>,
    cell: ({ row }) => {
      return (
        <Text className="font-bold text-[14px] p-4 capitalize">
          {row.original.service}
        </Text>
      );
    },
  },
  {
    accessorKey: "product",
    header: () => <div className="px-4">Product</div>,
    cell: ({ row }) => {
      return (
        <Text className="font-medium text-[14px] p-4 capitalize">
          {row.original.product}
        </Text>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="px-4">Amount</div>,
    cell: ({ row }) => {
      return (
        <Text className="font-medium text-[14px] p-4 capitalize">
          {convertAmount(row.original.totalAmount)}
        </Text>
      );
    },
  },
  {
    accessorKey: "toBeDisbursedOn",
    header: () => <div className="px-4">Disbursement Date</div>,
    cell: ({ row }) => {
      const createdAt = new Date(row.getValue("toBeDisbursedOn"));

      return (
        <Text className="font-medium text-[14px] p-4">
          {format(createdAt, "dd MMM, yyyy")}
        </Text>
      );
    },
  },
  {
    accessorKey: "isDisbursed",
    header: () => <div className="px-4">Status</div>,
    cell: ({ row }) => {
      return (
        <View
          className={cn(
            "w-fit h-5 rounded-full px-3 flex items-center justify-senter",
            row.original.status === "paid" && "bg-green-500",
            row.original.status === "pending" && "bg-orange-500",
            row.original.status === "failed" && "bg-red-500"
          )}
        >
          <Text className="font-medium text-[12px] text-gray-100 capitalize">
            {row.original.status}
          </Text>
        </View>
      );
    },
  },
  {
    accessorKey: "payoutId",
    header: () => <div className="px-4"></div>,
    cell: ({ row }) => {
      return (
        <Link href={`${APP_LINKS.DASHBOARD_PAYOUT}/${row.original.payoutId}`}>
          <Button
            variant="link"
            leftComp={<FileSpreadsheet />}
            className="text-sm font-semibold text-gray-500"
          >
            VIEW
          </Button>
        </Link>
      );
    },
  },
];
