"use client";
import { GetRevenueChart } from "@/app/services/revenue";
import { Text } from "@/components/shared/text";
import { View } from "@/components/shared/view";
import { Button } from "@/components/ui/button";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QueryKeys } from "@/contants/query-keys";
import { useCommunity } from "@/store/use-community";
import { IGetAPIResponse } from "@/types/api-response.interface";
import { TGetRevenueChartResponseDTO } from "@/types/revenue";
import { ChevronDown } from "lucide-react";
import React from "react";
import { useQuery } from "react-query";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { startOfDay } from "date-fns";
import { convertAmount } from "@/lib/util/convert-amount";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#8EB19D",
  },
  mobile: {
    label: "Mobile",
    color: "#7a9ff4",
  },
} satisfies ChartConfig;

interface Props {
  initialData: IGetAPIResponse<TGetRevenueChartResponseDTO>;
}
export const Chart: React.FC<Props> = ({ initialData }) => {
  const { community } = useCommunity();
  console.log("INITIAL", initialData);
  const { data, isFetching } = useQuery({
    queryKey: [QueryKeys(community).GET_REVENUE_CHART],
    queryFn: () =>
      GetRevenueChart({
        startDate: startOfDay(new Date()),
        endDate: new Date(),
        groupBy: "hour",
      }),
    initialData,
  });

  const chartData = data?.data?.chart;

  console.log("Data", chartData);
  // const chartData = [
  //   { month: "January", desktop: 186, mobile: 80 },
  //   { month: "February", desktop: 305, mobile: 200 },
  //   { month: "March", desktop: 237, mobile: 120 },
  //   { month: "April", desktop: 73, mobile: 190 },
  //   { month: "May", desktop: 209, mobile: 130 },
  //   { month: "June", desktop: 214, mobile: 140 },
  //   { month: "January", desktop: 186, mobile: 80 },
  //   { month: "February", desktop: 305, mobile: 200 },
  //   { month: "March", desktop: 237, mobile: 120 },
  //   { month: "April", desktop: 73, mobile: 190 },
  //   { month: "May", desktop: 209, mobile: 130 },
  //   { month: "June", desktop: 214, mobile: 140 },
  // ];
  return (
    <View className="flex flex-col gap-6">
      <View className="flex gap-4 justify-between items-center">
        <View className="flex gap-4">
          <Button leftComp={"IC"} className="" />
          <View className="flex flex-col">
            <ChartFilter />
            <View>
              <Text className="text-[22px] font-bold">
                {isFetching ? "..." : convertAmount(data?.data?.totalRevenue)}
              </Text>
            </View>
          </View>
        </View>
        {/* <View className="flex items-center justify-between"> */}
        <View className="flex gap-6">
          <View className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full block bg-[#8EB19D]" />
            <Text className="text-sm font-bold">Metering</Text>
          </View>
          <View className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full block bg-[#7a9ff4]" />
            <Text className="text-sm font-bold">Billing</Text>
          </View>
        </View>
        {/* </View> */}
      </View>
      <ChartContainer config={chartConfig} className="h-[400px] w-full">
        <BarChart
          accessibilityLayer
          data={chartData}
          defaultShowTooltip
          className="-ml-10"
        >
          <Bar dataKey="metering" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="billing" fill="var(--color-mobile)" radius={4} />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="label" className="font-bold text-primary" />
          <YAxis className="font-bold text-primary" />
          <Tooltip
            content={({ label }) => <View>{label}</View>}
            wrapperClassName="bg-transparent"
            isAnimationActive={false}
          />
        </BarChart>
      </ChartContainer>
    </View>
  );
};

const filters = [
  {
    label: "Today's Revenue",
    value: "today",
  },
  {
    label: "This Week's Revenue",
    value: "weekly",
  },
];
const ChartFilter: React.FC = () => {
  return (
    <Select>
      <SelectTrigger className="focus:ring-0 border-0 h-fit p-0 shadow-none flex font-medium items-center gap-3 w-fit">
        <SelectValue
          placeholder="Today's Revenue"
          className="p-0 font-medium"
        />
        <ChevronDown className="" size={16} />
      </SelectTrigger>
      <SelectContent>
        {filters.map((filter, _i) => (
          <SelectItem key={_i} value={filter.value}>
            {filter.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
