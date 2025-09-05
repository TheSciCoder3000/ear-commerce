"use client";

import { Minus, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";

interface NumberPickerProps {
  onValueChange?: (value: number) => void;
  onIncrement?: (value: number) => void;
  onDecrement?: (value: number) => void;
  defaultValue?: number;
  status: "idle" | "pending" | "success" | "failed";
}
const NumebrPicker: React.FC<NumberPickerProps> = ({
  onValueChange,
  onIncrement,
  onDecrement,
  defaultValue,
  status,
}) => {
  const [value, setvalue] = useState(defaultValue || 0);

  useEffect(() => {
    if (onValueChange) onValueChange(value);
  }, [value, onValueChange]);

  const handleDecrement = () => {
    if (onDecrement) onDecrement(value - 1);

    if (value === 0) setvalue(0);
    else setvalue((state) => state - 1);
  };

  const handleIncrement = () => {
    if (onIncrement) onIncrement(value + 1);

    setvalue((state) => state + 1);
  };

  return (
    <div className="flex gap-1 h-[2rem]">
      <button
        disabled={status === "pending"}
        className="cursor-pointer hover:text-gray-400 px-1 disabled:cursor-not-allowed disabled:text-gray-400"
        onClick={handleDecrement}
      >
        <Minus size={15} />
      </button>
      <input
        type="number"
        value={value}
        onChange={(e) => setvalue(Number(e.target.value) ?? 0)}
        className="text-center w-[3rem] border-1 border-gray-300 rounded-md"
      />
      <button
        disabled={status === "pending"}
        className="cursor-pointer hover:text-gray-400 px-1 disabled:cursor-not-allowed disabled:text-gray-400"
        onClick={handleIncrement}
      >
        <Plus size={15} />
      </button>
    </div>
  );
};

export default NumebrPicker;
