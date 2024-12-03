import { Text } from "@/components/shared/text";
import { View } from "@/components/shared/view";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, CircleDotDashed } from "lucide-react";

export const MetricsBreakdown: React.FC = () => {
  const lineItems = [
    {
      label: "Total Meters",
      value: 200,
      icon: "₦",
    },
    {
      label: "Allocated Meters",
      value: 1,
      icon: <CircleDotDashed />,
    },
    {
      label: "Unallocated Meters",
      value: 40,
      icon: <ArrowDown />,
    },
    {
      label: "Bypassed Meters",
      value: 20,
      icon: <ArrowUp />,
    },
  ];
  return (
    <View className="grid grid-cols-4 gap-4">
      {lineItems.map((item, _i) => (
        <View
          key={_i}
          className="shadow p-4 rounded-md flex items-center gap-4"
        >
          <Button
            size="icon"
            leftComp={item.icon}
            className="rounded-full bg-[#7A00A30A]/5 text-primary"
          />
          <View className="flex flex-col gap-1">
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
