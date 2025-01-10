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
import { useCartStore } from "@/shared/store/cart";
import toast from "react-hot-toast";

interface Props {
    product: ProductWithRelations;
    className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
    const router = useRouter();
    const isPizzaForm = Boolean(product.items[0]?.pizzaType);
    const state = useCartStore((state) => state);

    const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
        try {
            const itemid = productItemId ?? product.items[0].id;
            await state.addCartItem({
                productItemId: itemid,
                ingredients,
            });
            toast.success(product.name + " added successfully");
            router.back();
        } catch (error) {
            toast.error("Something went wrong");
            console.error(error);
        }
    };
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
                        loading={state.loading}
                        ingredients={product.ingredients}
                        onSubmit={onSubmit}
                    />
                ) : (
                    <ChooseProductForm
                        imageUrl={product.imageUrl}
                        name={product.name}
                        loading={state.loading}
                        onSubmit={onSubmit}
                        price={product.items[0].price}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
};
