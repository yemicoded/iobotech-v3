import { cn } from "@/lib/utils";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props<T> extends React.ComponentProps<"p"> {
  as?: T;
}

const Text = React.forwardRef<React.PureComponent, Props<React.ElementType>>(
  ({ as, ...props }, ref) => {
    const Element = as || "p";
    return (
      <Element
        ref={ref}
        {...props}
        className={cn("text-foreground", props.className)}
      />
    );
  }
);

Text.displayName = "Text";

export { Text };
