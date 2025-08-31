"use client";

import { Minus, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";

interface NumberPickerProps {
  onValueChange?: (value: number) => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
}
const NumebrPicker: React.FC<NumberPickerProps> = ({
  onValueChange,
  onIncrement,
  onDecrement,
}) => {
  const [value, setvalue] = useState(1);

  useEffect(() => {
    if (onValueChange) onValueChange(value);
  }, [value, onValueChange]);

  const handleDecrement = () => {
    if (value === 0) setvalue(0);
    else setvalue((state) => state - 1);

    if (onDecrement) onDecrement();
  };
  const handleIncrement = () => {
    setvalue((state) => state + 1);

    if (onIncrement) onIncrement();
  };

  return (
    <div className="flex gap-1 h-[2rem]">
      <button
        className="cursor-pointer hover:text-gray-400 px-1"
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
        className="cursor-pointer hover:text-gray-400 px-1"
        onClick={handleIncrement}
      >
        <Plus size={15} />
      </button>
    </div>
  );
};

export default NumebrPicker;
