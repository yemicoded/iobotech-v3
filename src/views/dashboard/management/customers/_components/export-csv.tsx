import { View } from "@/components/shared/view";
import { Button } from "@/components/ui/button";
import { FileUp } from "lucide-react";
import React from "react";

const ExportCSV = () => {
  return (
    <View>
      <Button leftComp={<FileUp/>} variant="link" className="font-bold p-0">
        Export CSV
      </Button>
    </View>
  );
};

export default ExportCSV;
