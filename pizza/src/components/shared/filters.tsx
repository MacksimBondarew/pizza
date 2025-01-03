"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Input } from "../ui";
import { RangeSlider, CheckboxFiltersGroup, Title } from "./index";
import { useFilters, useIngridients, useQueryFilters } from "@/hooks";

interface Props {
    className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
    const { ingredients, loading } = useIngridients();
    const filters = useFilters();
    useQueryFilters(filters);
    const items = ingredients.map((item) => ({
        id: String(item.id),
        text: item.name,
        value: String(item.id),
    }));
    const updatePrices = (prices: number[]) => {
        filters.setPrices("priceFrom", prices[0]);
        filters.setPrices("priceTo", prices[1]);
    };
    return (
        <div className={cn("", className)}>
            <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />
            {/* Top checkbox */}
            <CheckboxFiltersGroup
                title="Тип теста"
                name="pizzaTypes"
                className="mb-5"
                onClickCheckbox={filters.setPizzaTypes}
                selected={filters.pizzaTypes}
                items={[
                    { text: "Тонкое", value: "1" },
                    { text: "Традиционное", value: "2" },
                ]}
            />
            <CheckboxFiltersGroup
                title="Тип теста"
                name="pizzaTypes"
                className="mb-5"
                onClickCheckbox={filters.setSizes}
                selected={filters.sizes}
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
                        value={String(filters.prices.priceFrom)}
                        onChange={(e) =>
                            filters.setPrices(
                                "priceFrom",
                                Number(e.target.value)
                            )
                        }
                        min={0}
                        max={1000}
                    />
                    <Input
                        type="number"
                        min={100}
                        value={String(filters.prices.priceTo)}
                        max={1000}
                        placeholder="1000"
                        onChange={(e) =>
                            filters.setPrices("priceTo", Number(e.target.value))
                        }
                    />
                </div>
                <RangeSlider
                    min={0}
                    max={1000}
                    step={10}
                    onValueChange={updatePrices}
                    value={[filters.prices.priceFrom, filters.prices.priceTo]}
                />
            </div>
            <CheckboxFiltersGroup
                title="Ингредиенты:"
                className="mt-5"
                limit={6}
                defaultItems={items.slice(0, 6)}
                items={items}
                loading={loading}
                onClickCheckbox={filters.setSelectedIngredients}
                selected={filters.selectedIngredients}
            />
        </div>
    );
};
