// import { Select } from "@/components/shared/select";
import { Text } from "@/components/shared/text";
import { View } from "@/components/shared/view";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";
import { APP_LINKS } from "@/contants/app-links";

const AddStaff: React.FC = () => {
  return (
    <View className="flex flex-col gap-6 py-6 w-full">
      <View className="w-[500px] mx-auto flex flex-col gap-6 mt-10">
        <Text className="text-center text-2xl font-bold text-primary">
          Add Team Member
        </Text>
        <Card>
          <CardContent className="flex flex-col gap-4 py-6">
            {/* <View className="space-y-2">
              <Text className="font-bold">Customer Email Address</Text>
              <Input placeholder="Enter customer's email address" />
            </View> */}
            {/* <View className="space-y-2">
              <Text className="font-bold">Role</Text>
              <Select
                id="property-unit"
                name="property-unit"
                required
                options={[
                  { label: "Unit 1", value: "unit-1" },
                  { label: "Unit 2", value: "unit-2" },
                  { label: "Unit 3", value: "unit-3" },
                ]}
                placeholder="Select Property Unit"
              />
            </View> */}
            {/* <View className="flex justify-between w-full">
                <Text className="font-bold">Send Notification</Text>
            </View> */}
            <View className="flex mt-4 gap-6 w-full">
              <Link href={APP_LINKS.DASHBOARD_STAFFS} className="flex-1">
                <Button className="w-full bg-[#04048C]/[20%] text-black">
                  Back
                </Button>
              </Link>
              <View className="flex-1">
                <Button className="w-full" type="submit">
                  Add 
                </Button>
              </View>
            </View>
          </CardContent>
        </Card>
      </View>
    </View>
  );
};

export default AddStaff;
