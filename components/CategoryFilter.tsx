import React from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Categories } from "@/Constants";

interface CategoryFilterProps {
  defaultFilter?: string;
  setCategory?: (category: Categories | undefined) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  defaultFilter,
  setCategory,
}) => {
  const valueChangeHandler = (value: string) => {
    const cat: Categories | undefined =
      Categories[value as keyof typeof Categories];
    if (setCategory) setCategory(cat);
  };

  return (
    <RadioGroup
      defaultValue={
        Object.values(Categories).includes(defaultFilter as string)
          ? defaultFilter
          : "All"
      }
      onValueChange={valueChangeHandler}
    >
      <div className="flex items-center gap-3">
        <RadioGroupItem value={"All"} id={"All"} />
        <Label className="text-xs font-light" htmlFor={"All"}>
          All
        </Label>
      </div>
      {Object.keys(Categories)
        .filter((key) => isNaN(Number(key)))
        .map((cat) => (
          <div key={cat} className="flex items-center gap-3">
            <RadioGroupItem value={cat} id={cat} />
            <Label className="text-xs font-light" htmlFor={cat}>
              {cat}
            </Label>
          </div>
        ))}
    </RadioGroup>
  );
};

export default CategoryFilter;
