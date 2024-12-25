"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ProductCard, Title } from "./index";
import { useIntersection } from "react-use";
import { useCategoryStore } from "@/store/category";

interface Props {
    title: string;
    items: any[];
    categoryId: number;
    className?: string;
    listClassName?: string;
}

export const ProductGroupList: React.FC<Props> = ({
    title,
    items,
    listClassName,
    categoryId,
    className,
}) => {
    const setActiveCategoryId = useCategoryStore((state) => state.setActiveId)
    const intersectionRef = React.useRef(null);
    const intersection = useIntersection(intersectionRef, {
        threshold: 0.4,
    });
    React.useEffect(() => {
        if (intersection?.isIntersecting) {
            setActiveCategoryId(categoryId);
        }
      }, [categoryId, intersection?.isIntersecting, title]);
    return (
        <div className={cn("", className)} id={title}  ref={intersectionRef}>
            <Title text={title} size="lg" className="font-extrabold mb-5" />
            <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
                {items.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        imageUrl={product.imageUrl}
                        price={product.price}
                        ingredients={product.ingredients}
                    />
                ))}
            </div>
        </div>
    );
};
