import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { CategoryData } from "@/Constants";

interface CategoryFilterProps {
  defaultFilter?: string;
  setCategory?: (category: string | undefined) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  defaultFilter,
  setCategory,
}) => {
  const [mounted, setMounted] = useState(false);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const valueChangeHandler = (value: string) => {
    if (setCategory) setCategory(value);
  };

  useEffect(() => {
    fetch("/api/category")
      .then((res) => res.json())
      .then((jsonRes) => {
        setCategories(jsonRes.data);
        setMounted(true);
        if (setCategory) setCategory(defaultFilter);
      });
  }, []);

  if (mounted)
    return (
      <RadioGroup
        defaultValue={
          categories.map((cat) => cat.id).includes(defaultFilter as string)
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
        {categories
          .filter((key) => isNaN(Number(key)))
          .map((cat) => (
            <div key={cat.id} className="flex items-center gap-3">
              <RadioGroupItem value={cat.id} id={cat.id} />
              <Label className="text-xs font-light" htmlFor={cat.id}>
                {cat.name}
              </Label>
            </div>
          ))}
      </RadioGroup>
    );
};

export default CategoryFilter;
