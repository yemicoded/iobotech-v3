/* eslint-disable @typescript-eslint/no-explicit-any */
import { View } from "@/components/shared/view";
import React from "react";
import { MeterStoreTable } from "./table";
import { useCommunity } from "@/store/use-community";
import { useQuery } from "react-query";
import { QueryKeys } from "@/contants/query-keys";
import { GetTransactions } from "@/app/services/transaction";
import { IGetAPIResponse } from "@/types/api-response.interface";
import { TGetTransaction } from "@/types/transactions";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronDown, Download, Share, Share2 } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { TGetMeterStore } from "@/types/meter-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GetMeterStore } from "@/app/services/meter-store";

interface Props {
  products: Array<{
    _id: string;
    name: string;
  }>;
  initialData: IGetAPIResponse<TGetMeterStore[]>;
}

export const BypassedMetersStore: React.FC<Props> = ({
  products,
  initialData,
}) => {
  const limit = useSearchParams().get("limit") || "10";
  const page = useSearchParams().get("page") || "1";
  const search = useSearchParams().get("search") || "";
  const [productId, setProductId] = React.useState("");
  const { community } = useCommunity();
  const { data, isRefetching } = useQuery({
    queryKey: [QueryKeys(community).GET_ALL_TRANSACTIONS, page, search],
    queryFn: () =>
      GetMeterStore({
        productId,
        queryParams: {
          page,
          limit,
          search,
        },
      }),
    initialData,
    refetchOnMount: false,
  });
  return (
    <View>
      <MeterStoreTable
        data={(data || { data: [] }) as IGetAPIResponse<TGetTransaction[]>}
        isLoading={isRefetching}
        rightComp={
          <ProductsFilter
            products={products}
            onValueChange={(value) => {
              setProductId(value);
            }}
          />
        }
      />
    </View>
  );
};

const ProductsFilter: React.FC<{
  products: Array<{
    _id: string;
    name: string;
  }>;
  onValueChange: (value: string) => void;
}> = ({ products, onValueChange }) => {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="p-0 border-none shadow-none gap-4 font-medium focus:ring-0 capitalize">
        <SelectValue
          defaultValue="Prepaid Meter"
          placeholder="Select Product"
        />
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

// const ExportData: React.FC = () => {
//   return (
//     <Sheet>
//       <SheetTrigger>
//         <Button leftComp={<Share />} className="rounded-full" />
//       </SheetTrigger>
//       <SheetContent className="min-w-[500px]">
//         <SheetHeader>
//           <SheetTitle>Export Data</SheetTitle>
//         </SheetHeader>
//         <View className="flex flex-col gap-4 py-6">
//           <Card className="hover:bg-gray-100 cursor-pointer">
//             <CardContent className="py-4 flex items-center">
//               <Button
//                 leftComp={<Share2 />}
//                 variant="link"
//                 className="px-0 h-fit"
//               >
//                 <CardTitle>Share to self</CardTitle>
//               </Button>
//             </CardContent>
//           </Card>
//           <Card className="hover:bg-gray-100 cursor-pointer">
//             <CardContent className="py-4 flex items-center">
//               <Button
//                 leftComp={<Share2 />}
//                 variant="link"
//                 className="px-0 h-fit"
//               >
//                 <CardTitle>Share with others</CardTitle>
//               </Button>
//             </CardContent>
//           </Card>
//           <Card className="hover:bg-gray-100 cursor-pointer">
//             <CardContent className="py-4 flex items-center">
//               <Button
//                 leftComp={<Download />}
//                 variant="link"
//                 className="px-0 h-fit"
//               >
//                 <CardTitle>Download as CSV</CardTitle>
//               </Button>
//             </CardContent>
//           </Card>
//         </View>
//         <SheetFooter>kd</SheetFooter>
//       </SheetContent>
//     </Sheet>
//   );
// };
