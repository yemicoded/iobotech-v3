/* eslint-disable @typescript-eslint/no-explicit-any */
import { View } from "@/components/shared/view";
import React from "react";
import { TransactionsTable } from "./table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useCommunity } from "@/store/use-community";
import { useQuery } from "react-query";
import { QueryKeys } from "@/contants/query-keys";
import { GetTransactions } from "@/app/services/transaction";
import { IGetAPIResponse } from "@/types/api-response.interface";
import { TGetTransaction } from "@/types/transactions";

interface Props {
  serviceId: string;
  products: Array<{
    _id: string;
    name: string;
  }>;
  initialData: IGetAPIResponse<TGetTransaction[]>;
}

export const Active: React.FC<Props> = ({
  serviceId,
  products,
  initialData,
}) => {
  const limit = useSearchParams().get("limit") || "10";
  const page = useSearchParams().get("page") || "1";
  const search = useSearchParams().get("search") || "";
  const [productId, setProductId] = React.useState("");
  const { community } = useCommunity();
  const { data, isRefetching } = useQuery({
    queryKey: [
      QueryKeys(community).GET_METERING_TRANSACTIONS,
      serviceId,
      productId,
      page,
      search,
    ],
    queryFn: () =>
      GetTransactions({
        serviceId,
        productId,
        queryParams: {
          limit,
          page,
          search,
        },
      }),
    initialData,
    refetchOnMount: false,
  });
  return (
    <View>
      <TransactionsTable
        data={(data || { data: [] }) as IGetAPIResponse<TGetTransaction[]>}
        rightComp={
          <MeteringProducts
            products={products}
            onValueChange={(value) => {
              setProductId(value);
            }}
          />
        }
        isLoading={isRefetching}
      />
    </View>
  );
};

const MeteringProducts: React.FC<{
  products: Array<{
    _id: string;
    name: string;
  }>;
  onValueChange: (value: string) => void;
}> = ({ products, onValueChange }) => {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="p-0 border-none shadow-none gap-4 font-medium focus:ring-0 capitalize">
        <SelectValue defaultValue="recurring" placeholder="Select Product" />
        <ChevronDown size={18} className="mr-2" />
      </SelectTrigger>
      <SelectContent>
        {products.map((prod, _i) => (
          <SelectItem key={_i} value={prod._id} className="capitalize">
            {prod.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
