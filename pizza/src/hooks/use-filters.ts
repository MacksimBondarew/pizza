import qs from "qs";
import { useSet } from "react-use";
import React from "react";
import { useSearchParams } from "next/navigation";

interface PriceProps {
    priceFrom: number;
    priceTo: number;
}
export const useFilters = () => {
    const searchParams = useSearchParams() as unknown as Map<
        keyof PriceProps,
        string
    >;
    const [price, setPrice] = React.useState<PriceProps>({
        priceFrom: Number(searchParams.get("priceFrom")) || 0,
        priceTo: Number(searchParams.get("priceTo")) || 1000,
    });
    const parsedQuery = qs.parse(window.location.search, {
        ignoreQueryPrefix: true,
    });
    const ingredientsArray = Array.isArray(parsedQuery.ingredients)
        ? parsedQuery.ingredients.filter(
              (item): item is string => typeof item === "string"
          )
        : typeof parsedQuery.ingredients === "string"
        ? [parsedQuery.ingredients]
        : [];
    const [selectedIngridients, { toggleIngredients }] = useSet(
        new Set<string>(ingredientsArray)
    );
    const sizesArray = Array.isArray(parsedQuery.sizes)
        ? parsedQuery.sizes.filter(
              (item): item is string => typeof item === "string"
          )
        : typeof parsedQuery.sizes === "string"
        ? [parsedQuery.sizes]
        : [];
    const [sizes, { toggle: toggleSizes }] = useSet(
        new Set<string>(sizesArray)
    );
    const pizzaTypesArray = Array.isArray(parsedQuery.pizzaTypes)
        ? parsedQuery.pizzaTypes.filter(
              (item): item is string => typeof item === "string"
          )
        : typeof parsedQuery.pizzaTypes === "string"
        ? [parsedQuery.pizzaTypes]
        : [];
    const [pizzaTypes, { toggle: toggleTypes }] = useSet(
        new Set<string>(pizzaTypesArray)
    );
    return (sizes, pizzaTypes, selectedIngridients, price, setPrice, toggleTypes, toggleSizes, toggleIngredients)
};
