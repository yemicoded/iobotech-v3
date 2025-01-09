import { Text } from "@/components/shared/text";
import { View } from "@/components/shared/view";
// import { ViewTransaction } from "@/components/shared/view-transaction";
import { cn } from "@/lib/utils";
import { TGetTransaction } from "@/types/transactions";
import { ColumnDef } from "@tanstack/react-table";
import { PreviewCustomer } from "../add-customer/_components/preview-customer";

export const columns: ColumnDef<TGetTransaction>[] = [
  {
    accessorKey: "name",
    header: () => <View className="px-4">Name</View>,
    cell: ({ row }) => {
      return (
        <Text className="font-bold text-[14px] p-4 capitalize">
          {row.original.name}
        </Text>
      );
    },
  },
  {
    accessorKey: "propertyUnit",
    header: () => <View className="px-4 font-bold">Property Unit</View>,
    cell: ({ row }) => {
      return (
        <Text className="font-medium text-[14px] p-4 capitalize">
          {row.original.unit}
        </Text>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <View className="px-4 font-bold">Email</View>,
    cell: ({ row }) => {
      // const createdAt = new Date(row.getValue("createdAt"));
      return (
        <Text className="font-medium text-[14px] p-4">uwah23@gmail.com</Text>
      );
    },
  },
  {
    accessorKey: "product",
    header: () => <View className="px-4 font-bold">Invitation Code</View>,
    cell: ({ row }) => {
      return (
        <Text className="font-medium text-[14px] p-4 capitalize">
          {/* {row.original.product.name} */}
          $210-2024
        </Text>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <View className="px-4 font-bold">Status</View>,
    cell: ({ row }) => {
      return (
        <View
        className={cn(
          "max-w-max ml-4 px-3 py-1 rounded font-bold text-[12px]",
          row.original.status === "active" && "bg-[#34CE37]",
          row.original.status === "pending" && "bg-orange-500",
          row.original.status === "failed" && "bg-red-500"
        )}
      >
        <Text className="font-medium text-white text-[12px] capitalize">
          {row.original.status = 'active'}
        </Text>
      </View>
      );
    },
  },
  {
    accessorKey: "id",
    header: () => <View className="px-4"></View>,
    cell: ({ row }) => {
      return <PreviewCustomer transaction={row.original} />;
    },
  },
];




