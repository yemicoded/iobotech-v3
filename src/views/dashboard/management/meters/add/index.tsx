import { Select } from "@/components/shared/select";
import { Text } from "@/components/shared/text";
import { View } from "@/components/shared/view";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function AddMeterView() {
  return (
    <View className="flex flex-col gap-6 py-6 w-full">
      <View className="w-[700px] mx-auto flex flex-col gap-6 mt-10">
        <Text className="text-center text-2xl font-bold text-primary">
          Add Meters
        </Text>
        <Card>
          <CardContent className="grid grid-cols-2 gap-4 py-6">
            <Select label="Manufacturer" options={[]} />
            <Select label="Product" options={[]} />
            <View className="col-span-2">
              <Input label="Meter Number" />
            </View>
            <Select label="Group" options={[]} />
            <Select label="Remote" options={[]} />
            <Select label="Phase" options={[]} />
            <Select label="Output" options={[]} />
            <View className="col-span-2 flex mt-4">
              <Button className="w-[200px] ml-auto">Submit</Button>
            </View>
          </CardContent>
        </Card>
      </View>
    </View>
  );
}
