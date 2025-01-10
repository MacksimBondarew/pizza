import { useSet } from "react-use";
import React from "react";
import { useSearchParams } from "next/navigation";

interface PriceProps {
    priceFrom: number;
    priceTo: number;
}
export interface QueryFilters extends PriceProps {
    pizzaTypes: string;
    sizes: string;
    ingredients: string;
}

export interface Filters {
    sizes: Set<string>;
    pizzaTypes: Set<string>;
    selectedIngredients: Set<string>;
    prices: PriceProps;
}

interface ReturnProps extends Filters {
    setPrices: (name: keyof PriceProps, value: number) => void;
    setPizzaTypes: (value: string) => void;
    setSizes: (value: string) => void;
    setSelectedIngredients: (value: string) => void;
}
export const useFilters = (): ReturnProps => {
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;
    const [prices, setPrices] = React.useState<PriceProps>({
        priceFrom: Number(searchParams.get("priceFrom")) || 0,
        priceTo: Number(searchParams.get("priceTo")) || 1000,
    });
    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrices((prev) => ({ ...prev, [name]: value }));
    };
    const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
        new Set<string>(searchParams.get('ingredients')?.split(','))
    );
    const [sizes, { toggle: toggleSizes }] = useSet(
        new Set<string>(searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : [])
    );
    const [pizzaTypes, { toggle: toggleTypes }] = useSet(
        new Set<string>( searchParams.has('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') : [],)
    );
    return React.useMemo(
        () => ({
            sizes,
            pizzaTypes,
            selectedIngredients,
            prices,
            setPrices: updatePrice,
            setPizzaTypes: toggleTypes,
            setSizes: toggleSizes,
            setSelectedIngredients: toggleIngredients,
            updatePrice,
        }),
        [
            sizes,
            pizzaTypes,
            selectedIngredients,
            prices,
            updatePrice,
            toggleTypes,
            toggleSizes,
            toggleIngredients,
        ]
    );
};
