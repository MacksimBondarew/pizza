"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Input } from "../ui";
import { RangeSlider, CheckboxFiltersGroup, FilterCheckbox, Title} from "./index";
import { useFilterIngridients } from "@/hooks/useFilterIngridients";

interface Props {
    className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
    const { ingredients, loading, onAddId, selectedIds } = useFilterIngridients();

    const items = ingredients.map((item) => ({ 
        id: String(item.id), 
        text: item.name, 
        value: String(item.id) // Assign 'value' property
    }));    
    return (
        <div className={cn("", className)}>
            <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />
            {/* Top checkbox */}
            <div className="flex flex-col gap-4">
                <FilterCheckbox text="Можно собирать" value="1" />
                <FilterCheckbox text="Новинки" value="2" />
            </div>
            {/* Filter price */}
            <div className="mt-5 border-y border-y-neutral-100 pt-6 pb-7">
                <p className="font-bold mb-3">Цена от и до:</p>
                <div className="flex gap-3 mb-5">
                    <Input type="number" placeholder="0" min={0} max={1000} />
                    <Input
                        type="number"
                        min={100}
                        max={1000}
                        placeholder="1000"
                    />
                </div>
                <RangeSlider
                    min={0}
                    max={1000}
                    step={10}
                />
            </div>
            <CheckboxFiltersGroup title="Ингредиенты:" className="mt-5" limit={6} defaultItems={items.slice(0, 6)} items={items} loading={loading} onClickCheckbox={onAddId} selected={selectedIds} />
        </div>
    );
};
