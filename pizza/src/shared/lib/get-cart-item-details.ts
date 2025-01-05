import { Ingredient } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constants/pizza";

export const getCartItemDetails = (
    pizzaType: PizzaType,
    pizzaSize: PizzaSize,
    ingridients: Ingredient[]
) => {};
