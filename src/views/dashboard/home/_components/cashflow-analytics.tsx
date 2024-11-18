import { GetCashflowAnalytics } from "@/app/services/cashflow";
import { Text } from "@/components/shared/text";
import { View } from "@/components/shared/view";
import { Button } from "@/components/ui/button";
import { QueryKeys } from "@/contants/query-keys";
import { convertAmount } from "@/lib/util/convert-amount";
import { useCommunity } from "@/store/use-community";
import { IGetAPIResponse } from "@/types/api-response.interface";
import { TGetCashflowAnalytics } from "@/types/revenue";
import { startOfDay } from "date-fns";
import React from "react";
import { useQuery } from "react-query";

interface Props {
  initialData: IGetAPIResponse<TGetCashflowAnalytics>;
}
export const CashflowANalytics: React.FC<Props> = ({ initialData }) => {
  const { community } = useCommunity();
  const { data } = useQuery({
    queryKey: [QueryKeys(community).GET_CASHFLOW_ANALYTICS],
    queryFn: () =>
      GetCashflowAnalytics({
        startDate: startOfDay(new Date()).toString(),
        endDate: new Date().toString(),
      }),
    initialData,
  });

  const lineItems = [
    {
      label: "Total Payout",
      value: convertAmount(data?.data?.disbursedPayout),
    },
    {
      label: "Pending Amount",
      value: convertAmount(data?.data?.pendingPayout),
    },
    {
      label: "Income",
      value: convertAmount(data?.data?.incomeCashFlow),
    },
    {
      label: "Expenses",
      value: convertAmount(data?.data?.expensesCashFlow),
    },
  ];

  return (
    <View className="w-[300px] flex flex-col gap-6">
      {lineItems.map((item, _i) => (
        <View
          key={_i}
          className="shadow p-4 rounded-md flex items-center gap-4"
        >
          <Button size="icon" leftComp={"IC"} className="rounded-full" />
          <View>
            <Text className="text-gray-500 text-sm font-medium">
              {item.label}
            </Text>
            <Text className="text-[20px] font-bold">{item.value}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};
