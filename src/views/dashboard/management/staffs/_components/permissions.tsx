import { Text } from "@/components/shared/text";
import { View } from "@/components/shared/view";
import React from "react";

// interface PermissionsProps {
//   title: string;
//   body: string;
// }

const permisionDetails = [
  {
    title: "Add Meter Tarrif",
    body: "Enables staff to add new tariff rates for meters in the community",
  },
  {
    title: "Security Check In/ Check Out",
    body: "Enables staff to add new tariff rates for meters in the community",
  },
  {
    title: "Security Widget",
    body: "Enables staff to add new tariff rates for meters in the community",
  },
  {
    title: "Security Check In/ Check Out",
    body: "Enables staff to add new tariff rates for meters in the community",
  },
];

const Permissions = () => {
  return (
    <View className="grid grid-cols-2 w-full gap-4 text-xs">
      {permisionDetails.map((index, _i) => (
        <View key={_i} className="border p-5 flex flex-col gap-4">
          <Text className="font-bold">{index.title}</Text>
          <Text className="mt-2">{index.body}</Text>
        </View>
      ))}
    </View>
  );
};

export default Permissions;
