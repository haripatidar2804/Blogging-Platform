import React from "react";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ type, ...props }, ref) => {
  return (
    <input
      type={type}
      className="focus:border-primary border-background-400 bg-background-800 caret-primary-hover w-full rounded-lg border-2 p-1.5 placeholder-gray-400 shadow focus:outline-none"
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";
