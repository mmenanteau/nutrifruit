import { NutritionValue } from "@/types/NutritionValue";

export type Fruit = {
  id: number;
  name: string;
  family: string;
  order: string;
  genus: string;
  nutritions: NutritionValue;
};
