import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const ButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[#04984D] text-primary-foreground hover:bg-[#038743] relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/10 before:via-transparent before:to-[#04984D] before:pointer-events-none after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)] after:pointer-events-none shadow-[inset_0px_2px_0px_0px_rgba(255,255,255,0.4),inset_0px_-2px_0px_0px_rgba(0,0,0,0.3),inset_2px_0px_0px_0px_rgba(255,255,255,0.2),inset_-2px_0px_0px_0px_rgba(0,0,0,0.2),inset_0px_4px_8px_-2px_rgba(0,0,0,0.15),inset_0px_-4px_8px_-2px_rgba(255,255,255,0.1),0px_8px_16px_-4px_rgba(0,0,0,0.3),0px_4px_8px_-2px_rgba(0,0,0,0.2),0px_2px_4px_-1px_rgba(0,0,0,0.1)] hover:shadow-[inset_0px_2px_0px_0px_rgba(255,255,255,0.45),inset_0px_-2px_0px_0px_rgba(0,0,0,0.35),inset_2px_0px_0px_0px_rgba(255,255,255,0.22),inset_-2px_0px_0px_0px_rgba(0,0,0,0.22),inset_0px_4px_8px_-2px_rgba(0,0,0,0.18),inset_0px_-4px_8px_-2px_rgba(255,255,255,0.12),0px_10px_20px_-4px_rgba(0,0,0,0.35),0px_5px_10px_-2px_rgba(0,0,0,0.22),0px_2px_4px_-1px_rgba(0,0,0,0.12)] active:shadow-[inset_0px_4px_8px_0px_rgba(0,0,0,0.3),inset_0px_2px_4px_0px_rgba(0,0,0,0.2),inset_2px_2px_4px_0px_rgba(0,0,0,0.15),inset_-2px_2px_4px_0px_rgba(0,0,0,0.15)] rounded-lg",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        custom:
          "bg-transparent text-white shadow-none before:hidden after:hidden",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButtonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(ButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, ButtonVariants };
