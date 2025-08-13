export enum Categories {
  Gaming,
  Wireless,
  Professional,
  Specialty,
}

export interface ProductData {
  id: number;
  name: string;
  category: Categories;
  price: number;
}

export interface CategoryData {
  id: Categories;
  name: string;
  description: string;
  link: string;
}

export const dummyData: ProductData[] = [
  {
    id: 0,
    name: "soundwave progaming headset",
    category: Categories.Gaming,
    price: 149.99,
  },
  {
    id: 1,
    name: "soundwave progaming headset",
    category: Categories.Professional,
    price: 149.99,
  },
  {
    id: 2,
    name: "soundwave progaming headset",
    category: Categories.Wireless,
    price: 149.99,
  },
  {
    id: 3,
    name: "soundwave progaming headset",
    category: Categories.Gaming,
    price: 149.99,
  },
];

export const dummyCategories: CategoryData[] = [
  {
    id: Categories.Gaming,
    name: "Gaming",
    description:
      "Designed for immersive gameplay with crystal-clear communication",
    link: "",
  },
  {
    id: Categories.Wireless,
    name: "Wireless",
    description: "DFreedom to move with premium sound quality",
    link: "",
  },
  {
    id: Categories.Professional,
    name: "Professional",
    description: "Studio-quality sound for professionals and audiophiles",
    link: "",
  },
];
