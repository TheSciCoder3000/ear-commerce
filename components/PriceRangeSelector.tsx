"use client";

import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";

interface PriceRangeProps {
  min: number;
  max: number;
  onValueChange?: (minMax: [number, number]) => void;
}

const PriceRangeSelector: React.FC<PriceRangeProps> = ({
  min,
  max,
  onValueChange,
}) => {
  const [minPrice, setMinPrice] = useState(min);
  const [maxPrice, setMaxPrice] = useState(max);

  useEffect(() => {
    if (onValueChange) onValueChange([minPrice, maxPrice]);
  }, [minPrice, maxPrice, onValueChange]);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <Label className="mb-5 text-xs font-light">
          Min Price: ${minPrice}
        </Label>
        <Slider
          defaultValue={[min]}
          onValueChange={(val) => setMinPrice(val[0])}
          min={0}
          max={300}
        />
      </div>
      <div>
        <Label className="mb-5 text-xs font-light">
          Max Price: ${maxPrice}
        </Label>
        <Slider
          defaultValue={[max]}
          onValueChange={(val) => setMaxPrice(val[0])}
          min={0}
          max={300}
        />
      </div>
    </div>
  );
};

export default PriceRangeSelector;
