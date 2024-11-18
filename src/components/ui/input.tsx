/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { Eye, EyeOff } from "lucide-react";

const inputVariants = cva(
  "relative cursor-text flex items-center gap-2 w-full border border-input rounded-md bg-transparent px-3 py-1 shadow-sm transition-colors whitespace-nowrap rounded-md text-base disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
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
        default: "h-12 px-4",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
      },
    },
    defaultVariants: {
      // variant: "default",
      size: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  leftComp?: React.ReactNode;
  rightComp?: React.ReactNode;
  containerClassName?: string;
  size?: "default" | "sm" | "lg";
  label?: React.ReactNode;
  labelClassName?: string;
  required?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      variant,
      size,
      leftComp,
      rightComp,
      containerClassName,
      label,
      labelClassName,
      required,
      ...props
    },
    ref
  ) => {
    const [isPasswordVisible, setPasswordVisible] =
      React.useState<boolean>(false);
    return (
      <div className={cn("flex flex-col gap-3")}>
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
        <div
          className={cn(
            inputVariants({ variant, size, className: containerClassName })
          )}
        >
          {leftComp}
          <input
            type={
              type === "password"
                ? isPasswordVisible
                  ? "text"
                  : "password"
                : type
            }
            className={cn(
              "font-medium flex flex-1 h-full text-base file:border-0 file:bg-transparent file:text-lg file:font-medium file:text-foreground placeholder:font-normal disabled:cursor-not-allowed disabled:opacity-50 outline-none bg-transparent",
              className
            )}
            ref={ref}
            {...props}
            autoFocus={true}
          />
          {type === "password" ? (
            isPasswordVisible ? (
              <span onClick={() => setPasswordVisible((state) => !state)}>
                <EyeOff />
              </span>
            ) : (
              <span onClick={() => setPasswordVisible((state) => !state)}>
                <Eye />
              </span>
            )
          ) : (
            rightComp
          )}
        </div>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
