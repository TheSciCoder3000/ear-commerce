import React, { ReactNode } from "react";

interface InputFieldProps {
  children: ReactNode | ReactNode[];
}

const InputField: React.FC<InputFieldProps> = ({ children }) => {
  return <div className="flex flex-col gap-1 mb-5">{children}</div>;
};

export default InputField;
