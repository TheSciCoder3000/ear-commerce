import React, { ReactNode } from "react";

interface ErrorWrapperProps {
  message: string | undefined;
  children: ReactNode | ReactNode[];
}

const ErrorWrapper: React.FC<ErrorWrapperProps> = ({ children, message }) => {
  return (
    <div>
      {children}
      <p className="text-red-500 text-xs">{message}</p>
    </div>
  );
};

export default ErrorWrapper;
