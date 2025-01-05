"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Dialog } from "@/shared/components/ui";
import { cn } from "@/shared/lib/utils";
import { DialogContent, DialogTitle } from "@/shared/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ChooseProductForm } from "../choose-product-form";
import { ProductWithRelations } from "../../../../../@types/prisma";
import { ChoosePizzaForm } from "../choose-pizza-form";

interface Props {
    product: ProductWithRelations;
    className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
    const router = useRouter();
    const isPizzaForm = Boolean(product.items[0]?.pizzaType);

    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent
                className={cn(
                    "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
                    className
                )}>
                {/* Accessible Dialog Title */}
                <DialogTitle className="hidden">
                    <VisuallyHidden>
                        {`Choose ${product.name}`}{" "}
                        {/* Announce the product name */}
                    </VisuallyHidden>
                </DialogTitle>

                {/* Conditional Forms */}
                {isPizzaForm ? (
                    <ChoosePizzaForm
                        imageUrl={product.imageUrl}
                        items={product.items}
                        name={product.name}
                        ingredients={product.ingredients}
                    />
                ) : (
                    <ChooseProductForm
                        imageUrl={product.imageUrl}
                        name={product.name}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
};
