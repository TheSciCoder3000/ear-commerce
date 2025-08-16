import React, { ReactNode } from "react";

interface LabelProps {
  required?: boolean;
  htmlFor?: string;
  children?: ReactNode | ReactNode[];
}
const InputLabel: React.FC<LabelProps> = ({
  required = false,
  htmlFor,
  children,
}) => {
  return (
    <label htmlFor={htmlFor} className="w-[6.5rem] md:text-right">
      {children}
      {required && <span className="text-red-500">*</span>}
    </label>
  );
};

export default InputLabel;
