/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client";

import React from "react";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select as ShadSelect,
} from "../ui/select";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { View } from "./view";

export type TOption = {
  label: string;
  value: string;
};

const selectVariants = cva(
  "relative cursor-pointer flex items-center justify-start gap-2 w-full border border-input rounded-md bg-transparent px-3 py-1 shadow-sm transition-colors whitespace-nowrap rounded-md text-base disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "text-destructive-foreground shadow-sm hover:bg-destructive/90",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-4",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-4",
      },
    },
    defaultVariants: {
      // variant: "default",
      size: "default",
    },
  }
);

export interface SelectProps
  extends Omit<React.InputHTMLAttributes<HTMLSelectElement>, "size">,
    VariantProps<typeof selectVariants> {
  leftComp?: React.ReactNode;
  rightComp?: React.ReactNode;
  containerClassName?: string;
  size?: "default" | "sm" | "lg";
  options?: TOption[];
  labelClassName?: string;
  label?: React.ReactNode;
  contentPosition?: "top" | "bottom" | "left" | "right";
  onValueChange?: (value: string) => void;
}

const Select = React.forwardRef<unknown, SelectProps>(
  (
    {
      variant,
      size,
      className,
      leftComp,
      value,
      rightComp,
      label,
      contentPosition = "bottom",
      onSelect,
      onChange,
      labelClassName,
      containerClassName,
      placeholder,
      options,
      required,
      onValueChange = () => {},
      ...props
    },
  ) => {
    // const [localValue, setLocalValue] = React.useState<
    //   string | number | readonly string[] | undefined
    // >(value);
    // const [selectedOption, setSelectedOption] = React.useState<TOption>();

    // React.useEffect(() => {
    //   const selectedOption = options?.find((opt) => opt.value === value);
    //   setSelectedOption(selectedOption);
    // }, [options, value]);
    return (
      <ShadSelect
        value={value as string}
        onValueChange={(value) => {
          // setLocalValue(value);
          onValueChange(value);
        }}
      >
        <View className={cn("flex flex-col gap-3", containerClassName)}>
          {label && (
            <div className="flex items-center gap-1">
              {typeof label === "string" ? (
                <label
                  htmlFor={props.name}
                  className={cn(
                    "duration-300 text-foreground font-medium",
                    labelClassName
                  )}
                >
                  {label}
                </label>
              ) : (
                label
              )}

              {required ? <span className="text-red-500">*</span> : null}
            </div>
          )}
          <SelectTrigger
            //   className="w-[180px]"
            className={cn(
              selectVariants({ variant, size, className }),
              label && value && "pt-6 font-medium",
              "w-full focus:ring-0",
              placeholder && !value ? "text-gray-400" : "font-medium"
            )}
          >
            <View className="flex-1 flex items-center gap-2">
              {leftComp}
              <SelectValue placeholder={placeholder} />
            </View>

            {rightComp ?? (
              <SelectPrimitive.Icon asChild>
                <ChevronDownIcon className="h-4 w-4 opacity-50" />
              </SelectPrimitive.Icon>
            )}
          </SelectTrigger>
          <SelectContent className="" side={contentPosition}>
            <SelectGroup>
              {/* <SelectLabel>Fruits</SelectLabel> */}
              {options?.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </View>
      </ShadSelect>
    );
  }
);

Select.displayName = "Select";
export { Select };
