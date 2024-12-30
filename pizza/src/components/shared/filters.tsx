"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Input } from "../ui";
import { RangeSlider, CheckboxFiltersGroup, Title } from "./index";
import { useFilterIngridients } from "@/hooks/use-filter-ingridients";
import { useSet } from "react-use";
import qs from "qs";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
    className?: string;
}

interface PriceProps {
    priceFrom: number;
    priceTo: number;
}

export const Filters: React.FC<Props> = ({ className }) => {
    const router = useRouter();
    const searchParams = useSearchParams() as unknown as Map<
        keyof PriceProps,
        string
    >;
    const parsedQuery = qs.parse(window.location.search, {
        ignoreQueryPrefix: true,
    });
    const ingredientsArray =
        Array.isArray(parsedQuery.ingredients)
            ? parsedQuery.ingredients.filter((item): item is string => typeof item === 'string')
            : typeof parsedQuery.ingredients === 'string'
            ? [parsedQuery.ingredients]
            : [];
    const { ingredients, loading, onAddId, selectedIngridients } =
        useFilterIngridients(ingredientsArray);
    const [price, setPrice] = React.useState<PriceProps>({
        priceFrom: Number(searchParams.get("priceFrom")) || 0,
        priceTo: Number(searchParams.get("priceTo")) || 1000,
    });

    const sizesArray =
        Array.isArray(parsedQuery.sizes)
            ? parsedQuery.sizes.filter((item): item is string => typeof item === 'string')
            : typeof parsedQuery.sizes === 'string'
            ? [parsedQuery.sizes]
            : [];
    const [sizes, { toggle: toggleSizes }] = useSet(
        new Set<string>(sizesArray)
    );
    const pizzaTypesArray =
    Array.isArray(parsedQuery.pizzaTypes)
        ? parsedQuery.pizzaTypes.filter((item): item is string => typeof item === 'string')
        : typeof parsedQuery.pizzaTypes === 'string'
        ? [parsedQuery.pizzaTypes]
        : [];
    const [pizzaTypes, { toggle: toggleTypes }] = useSet(new Set<string>(pizzaTypesArray));

    const items = ingredients.map((item) => ({
        id: String(item.id),
        text: item.name,
        value: String(item.id),
    }));
    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrice({
            ...price,
            [name]: value,
        });
    };
    React.useEffect(() => {
        const filters = {
            ...price,
            pizzaTypes: Array.from(pizzaTypes),
            sizes: Array.from(sizes),
            ingredients: Array.from(selectedIngridients),
        };
        const queryString = qs.stringify(filters, {
            arrayFormat: "brackets",
        });
        router.push(`?${queryString}`, {
            scroll: false,
        });

    }, [price, pizzaTypes, sizes, selectedIngridients, router]);
    return (
        <div className={cn("", className)}>
            <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />
            {/* Top checkbox */}
            <CheckboxFiltersGroup
                title="Тип теста"
                name="pizzaTypes"
                className="mb-5"
                onClickCheckbox={toggleTypes}
                selected={pizzaTypes}
                items={[
                    { text: "Тонкое", value: "1" },
                    { text: "Традиционное", value: "2" },
                ]}
            />
            <CheckboxFiltersGroup
                title="Тип теста"
                name="pizzaTypes"
                className="mb-5"
                onClickCheckbox={toggleSizes}
                selected={sizes}
                items={[
                    { text: "20 см", value: "20" },
                    { text: "30 см", value: "30" },
                    { text: "40 см", value: "40" },
                ]}
            />
            {/* Filter price */}
            <div className="mt-5 border-y border-y-neutral-100 pt-6 pb-7">
                <p className="font-bold mb-3">Цена от и до:</p>
                <div className="flex gap-3 mb-5">
                    <Input
                        type="number"
                        placeholder="0"
                        value={String(price.priceFrom)}
                        onChange={(e) =>
                            updatePrice("priceFrom", Number(e.target.value))
                        }
                        min={0}
                        max={1000}
                    />
                    <Input
                        type="number"
                        min={100}
                        value={String(price.priceTo)}
                        max={1000}
                        placeholder="1000"
                        onChange={(e) =>
                            updatePrice("priceTo", Number(e.target.value))
                        }
                    />
                </div>
                <RangeSlider
                    min={0}
                    max={1000}
                    step={10}
                    onValueChange={([from, to]) =>
                        setPrice({ priceFrom: from, priceTo: to })
                    }
                    value={[price.priceFrom, price.priceTo]}
                />
            </div>
            <CheckboxFiltersGroup
                title="Ингредиенты:"
                className="mt-5"
                limit={6}
                defaultItems={items.slice(0, 6)}
                items={items}
                loading={loading}
                onClickCheckbox={onAddId}
                selected={selectedIngridients}
            />
        </div>
    );
};
